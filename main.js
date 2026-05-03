import { Actor } from 'apify';
import axios from 'axios';
import crypto from 'crypto';

await Actor.init();

const input = await Actor.getInput();
const {
  csvFile,
  feedbacks,
  defaultTone = 'honest and constructive',
  maxConcurrency = 5,
  timeout = 60,
} = input;

const SCDFT_PROXY_SECRET = process.env.SCDFT_PROXY_SECRET;
if (!SCDFT_PROXY_SECRET) {
  throw new Error('SCDFT_PROXY_SECRET environment variable is missing');
}

const SECRET = SCDFT_PROXY_SECRET;
const API_URL = 'https://stech-api.sheradogilang.workers.dev/scdft';

// Simple CSV parser
function parseCSV(content) {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = [];
  let inQuote = false;
  let current = '';
  const firstLine = lines[0];
  for (let ch of firstLine) {
    if (ch === '"') inQuote = !inQuote;
    else if (ch === ',' && !inQuote) {
      headers.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += ch;
    }
  }
  headers.push(current.trim().replace(/^"|"$/g, ''));
  
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const values = [];
    inQuote = false;
    current = '';
    for (let ch of line) {
      if (ch === '"') inQuote = !inQuote;
      else if (ch === ',' && !inQuote) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += ch;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    result.push(row);
  }
  return result;
}

let feedbackList = [];

// 1. Read from CSV file
if (csvFile && typeof csvFile === 'string') {
  let fileContent = null;
  if (csvFile.startsWith('FILE-UPLOAD:')) {
    const fileKey = csvFile.replace('FILE-UPLOAD:', '');
    const fileBuffer = await Actor.getFile(fileKey);
    fileContent = fileBuffer.toString();
  } else if (csvFile.startsWith('http://') || csvFile.startsWith('https://')) {
    const response = await axios.get(csvFile, { responseType: 'text' });
    fileContent = response.data;
  } else {
    throw new Error('Invalid csvFile format. Must be a FILE-UPLOAD: key or a public URL.');
  }
  const rows = parseCSV(fileContent);
  if (rows.length === 0) {
    throw new Error('CSV file is empty or could not be parsed.');
  }
  
  feedbackList = rows.filter(row => row.originalFeedback).map(row => ({
    originalFeedback: row.originalFeedback,
    targetTone: row.targetTone || defaultTone,
    additionalInstructions: row.additionalInstructions || '',
    context: row.context || '',
    recipientName: row.recipientName || row.recipient_name || row.name || '',
  }));
} 
// 2. Read from JSON array
else if (Array.isArray(feedbacks) && feedbacks.length > 0) {
  feedbackList = feedbacks;
} 
else {
  throw new Error('No input provided. Please either upload a CSV file or provide an array of feedbacks.');
}

if (feedbackList.length === 0) {
  throw new Error('No valid feedback entries found. Check your input data.');
}

async function processFeedback(item, index) {
  const originalFeedback = item.originalFeedback;
  if (!originalFeedback) {
    return {
      index,
      originalFeedback: null,
      improvedFeedback: "",
      status: 'error',
      error: 'Missing originalFeedback field',
      timestamp: new Date().toISOString(),
    };
  }

  const targetTone = item.targetTone || defaultTone;
  const additional = item.additionalInstructions || '';
  const context = item.context || '';
  const recipientName = item.recipientName || '';

  let personalization = '';
  if (recipientName) {
    personalization += ` Address the recipient as ${recipientName} respectfully.`;
  }

  let prompt = `Refine the following feedback to be ${targetTone}. Preserve ALL criticism and negative points. Do NOT sugarcoat, falsify, or soften the truth. Do NOT use emojis. Convert harsh language into professional, actionable text.${personalization}`;
  if (additional) prompt += ` Additional instructions: ${additional}`;
  if (context) prompt += `\nThis feedback is a: ${context}.`;
  
  prompt += `\n\nOriginal feedback:\n${originalFeedback}`;

  try {
    const response = await axios.post(API_URL, { message: prompt }, {
      headers: { 'X-Stech-Actor-Secret': SECRET },
      timeout: timeout * 1000,
    });
    const improvedFeedback = response.data.response?.trim() || '';
    const auditHash = crypto.createHash('sha256').update(improvedFeedback).digest('hex').substring(0, 16);

    return {
      index,
      originalFeedback,
      improvedFeedback,
      toneUsed: targetTone,
      status: 'success',
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(recipientName && { recipientName }),
      auditHash,
    };
  } catch (err) {
    return {
      index,
      originalFeedback,
      improvedFeedback: "",
      status: 'error',
      error: err.message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(recipientName && { recipientName }),
      auditHash: '',
    };
  }
}

const results = [];
const running = new Set();
const queue = [...feedbackList];
let nextIndex = 0;

while (queue.length > 0 || running.size > 0) {
  while (running.size < maxConcurrency && queue.length > 0) {
    const item = queue.shift();
    const index = nextIndex++;
    const promise = processFeedback(item, index).then(res => {
      running.delete(promise);
      results.push(res);
    });
    running.add(promise);
  }
  if (running.size > 0) {
    await Promise.race(running);
  }
}

results.sort((a, b) => a.index - b.index);
const finalOutput = results.map(({ index, ...rest }) => rest);

await Actor.pushData(finalOutput);
console.log(`Processed ${finalOutput.length} feedbacks. Success: ${finalOutput.filter(r => r.status === 'success').length}, Errors: ${finalOutput.filter(r => r.status === 'error').length}`);

await Actor.exit();

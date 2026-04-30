
<img width="1254" height="1254" alt="1000243052" src="https://github.com/user-attachments/assets/4b06dd41-866c-4c6b-898d-ba44bb53de1e" />

# Stech Evaluation & Review Tone Improver (SERTI) – Bulk Feedback Rewriter

Transform harsh, emotional, or unprofessional feedback into honest, constructive, and professional language — in bulk, in seconds.

SERTI is a single‑purpose AI (SPAI) Actor on the Apify Store that focuses on one task: ensuring every feedback, complaint, or evaluation is delivered with integrity. It processes batches of 1 to 1,000+ feedback items per run, accepts CSV or JSON input, lets you pick a different tone for each entry, and exports polished results immediately. No data is stored; no fake praise; just honest, professional, reliable output.

> **Market context:** The AI performance review and talent management market is projected to grow at 16.5% CAGR through 2030, reaching $2.1 billion. Organisations increasingly adopt AI for performance feedback, but face a critical gap: AI that only "warms" language often sacrifices honesty, creating feedback that is comfortable but useless. SERTI fills this gap by embedding Micro Honesty directly into its architecture.

---

## 🎯 Who SERTI Is For

SERTI helps anyone who needs to deliver feedback that is honest yet constructive, without spending hours polishing the language.

- **HR & Performance Management** – turn rough manager notes into clear, actionable performance reviews that are fair, documented, and free from personal bias.
- **Customer Support** – transform emotional complaints into structured, professional feedback that product teams can act on immediately.
- **Product & Engineering Teams** – convert chaotic user bug reports and negative reviews into clear, actionable product insights.
- **Public Services & Government** – process citizen complaints into formal, verifiable reports that can be tracked and resolved.
- **Anyone** who values feedback that is honest without being hurtful, and professional without being evasive.

**No coding skills are required.** If you can use a spreadsheet, you can use SERTI.

---

## ⚙️ Two Ways to Use SERTI

SERTI is a published Apify Actor, which means it can work either as a simple tool or as part of a larger automated workflow.

| **As a SPAI (Tool)** | **As a Component of an AI Agent** |
| :--- | :--- |
| **How it works:** You provide the raw feedback (CSV/JSON/Apify Input) and SERTI transforms it. It's a straightforward, one‑click batch process. | **How it works:** An AI Agent (built with n8n, Make, Zapier, LangChain, or CrewAI) detects that a review or complaint needs professional refinement and calls SERTI as one of its tools. |
| **Best for:** Quick, manual batch processing of performance reviews, customer complaints, or product feedback. No setup needed—upload a file and get results in seconds. | **Best for:** Fully automated workflows. For example, an AI Agent that monitors an HR system, identifies rough performance notes from managers, and automatically refines them with SERTI before the review cycle closes. |
| **Goal:** Maximum simplicity for non‑technical users. | **Goal:** Maximum flexibility for developers and advanced users. |
| **How to get started:** Upload a CSV or JSON on the Apify Actor page. | **How to get started:** Connect SERTI to **n8n, Make, or Zapier**, link your HR platform or feedback system, and build your automated workflow in minutes. |

---

## 🚀 Key Features

- **Batch processing** – refine 1 to 1,000+ feedback items in a single run
- **Flexible input** – upload a CSV file or paste a JSON array
- **Per‑item tone** – choose from `honest and constructive`, `empathetic`, `professional and actionable`, `firm but fair` for each item
- **Context awareness** – optionally include `context` (e.g., "performance review", "customer complaint") for more precise refinement
- **High concurrency** – process up to 20 items simultaneously to save time
- **Error tolerance** – if one item fails, the rest continue uninterrupted; all errors are logged
- **Structured output** – get JSON or CSV with all fields for every entry
- **Stateless & private** – no feedback content is ever stored on any server; your data passes through and is immediately discarded

---

## 📥 Input Methods

### 1. CSV Upload (easiest for batch workloads)

Create a CSV file with at least an `originalFeedback` column.

| Column | Required | Description |
|--------|:--------:|-------------|
| `originalFeedback` | ✅ | The raw feedback, complaint, or evaluation text. |
| `targetTone` | ❌ | Tone for this feedback (`honest and constructive`, `empathetic`, `professional and actionable`, `firm but fair`). Default = `honest and constructive`. |
| `additionalInstructions` | ❌ | Extra guidance (e.g. "focus on actionable steps", "keep it under 100 words"). |
| `context` | ❌ | Type of feedback (`performance review`, `customer complaint`, `product review`, `public report`). Helps SERTI refine more precisely. |
| `recipientName` | ❌ | Name of the person receiving the feedback. If provided, SERTI will address them respectfully. |

Example CSV content

```csv
originalFeedback,targetTone,additionalInstructions,context,recipientName
"His work is a mess. Deadlines keep slipping. I'm tired of saying the same things over and over.",honest and constructive,"Focus on actionable steps",performance review,Budi
"This app is garbage! It crashes constantly and the features are unclear.","professional and actionable","Convert into a formal bug report",product review,
"The road in our village is severely damaged! It hasn't been repaired for 2 years!",professional and actionable,"Convert into a formal citizen complaint",public report,
```

Upload this file using the CSV File field in the Actor input form.

2. JSON Array (for API & advanced users)

```json
[
  {
    "originalFeedback": "His work is a mess. Deadlines keep slipping. I'm tired of saying the same things over and over.",
    "targetTone": "honest and constructive",
    "additionalInstructions": "Focus on actionable steps",
    "context": "performance review",
    "recipientName": "Budi"
  },
  {
    "originalFeedback": "This app is garbage! It crashes constantly and the features are unclear.",
    "targetTone": "professional and actionable",
    "context": "product review"
  }
]
```

---

## 📤 Output

After the run, you get a structured dataset (JSON/CSV). Each row contains:

Field Description
originalFeedback The raw feedback you provided.
improvedFeedback The refined, professional version. Every criticism is preserved; every harsh word is replaced with actionable language.
toneUsed The tone that was applied.
status success or error.
error Error message (if any).
timestamp Processing timestamp (ISO 8601).
context The context you provided (if any).
recipientName The recipient name you provided (if any).
auditHash A unique SHA‑256 hash of the output (for audit trail and accountability).

Example output (JSON):

```json
[
  {
    "originalFeedback": "His work is a mess. Deadlines keep slipping. I'm tired of saying the same things over and over.",
    "improvedFeedback": "Budi is facing serious challenges in consistently meeting deadlines. This has been a recurring issue that is affecting the team. We cannot rely on his output until there is measurable and sustained improvement.",
    "toneUsed": "honest and constructive",
    "status": "success",
    "timestamp": "2026-05-01T10:30:00.000Z",
    "context": "performance review",
    "recipientName": "Budi",
    "auditHash": "a1b2c3d4e5f6..."
  }
]
```

---

You can download the dataset as CSV directly from the Apify Console, or access it programmatically via the Apify API.

---

🧪 Sample Workflow (HR Manager)

1. Collect raw performance notes from managers across the organisation.
2. Save them into a CSV file with columns originalFeedback and recipientName.
3. Visit the SERTI Actor page on Apify Store, upload the CSV, click Run.
4. Wait a few seconds, then download the output CSV.
5. Review each improvedFeedback item and deliver it to the employee.

Time saved: hours → minutes. Integrity: preserved.

---

## ❗ Notes & Risks

- SERTI is NOT an HR decision tool. It is a writing assistant only. All final decisions on performance, discipline, or employment must remain with human managers. SERTI does not evaluate, score, or recommend personnel actions.
- SERTI will NOT falsify feedback. Micro Honesty (BSR #35) is embedded in its architecture. It will never turn a serious criticism into an empty compliment, nor sugarcoat the truth.
- Always review the refined feedback before delivering. AI can make mistakes, and the final responsibility for the message rests with the sender.
- No legal, medical, or financial advice – Stech is not a professional advisor; the output is for language improvement only.
- No data storage – feedback items are processed in memory and never persisted; once a run is complete, the data is available only in your dataset until you delete it.
- Regulatory transparency – every output includes an auditHash (SHA‑256) for traceability without storing your data, supporting accountability under frameworks such as the EU AI Act.
- Failed rows are flagged with status: error in the output; you can retry them after addressing the cause (e.g., network timeout, malformed input).
- Apify charges – as a Pay Per Event Actor, each processed result incurs a small fee, which is displayed transparently to the user before the run starts. The first 5 seconds of each run are free.

---

## 🔌 Integrations (Built‑in by Apify)

Because SERTI is a published Apify Actor, it automatically appears in the integration catalogs of:

- n8n – connect SERTI to hundreds of apps without code.
- Make – drag‑and‑drop SERTI into automated workflows.
- Zapier – trigger SERTI from thousands of events.
- Slack – get notified when a run finishes.
- GitHub – create issues automatically when a run fails.
- LangChain and LlamaIndex – use SERTI as a tool inside your custom AI agents.

---

🔗 Links

- Stech API on RapidAPI – for production API access with higher rate limits
- Interactive API Documentation (Postman) – explore and test the API endpoints directly
- GitHub Repository – core values, license, and legal information

---

## 📄 License & Disclaimer

This Actor is provided for informational and communication improvement purposes only.
Stech does not give financial, legal, or medical advice. Always review the output before delivering.
By using this Actor, you agree that the creator is not liable for any consequences arising from its use.
---
The source code of SERTI is publicly available for transparency and trust. All rights are reserved under the Stech Commercial License (SCL) v2.1. For full terms, see the LICENSE file in the Stech repository.

---

Stech – honest, warm, and never pretends to be human. 😊🌿

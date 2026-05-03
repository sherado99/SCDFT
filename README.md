<div align="center"><img width="300" height="300" alt="586216170-4b06dd41-866c-4c6b-898d-ba44bb53de1e" src="https://github.com/user-attachments/assets/3957c8ef-b80e-4388-9316-891e1ff2ddf3" /></div>

# Stech Clarity-Driven Feedback Transformer (SCDFT) – Structured Reports from Raw Feedback

Transform harsh, emotional, or unprofessional feedback into **clear, structured, and actionable reports** — each one refined individually through genuine, ethical connection. Capable of processing many feedback items while maintaining impact and integrity.

SCDFT is a single‑purpose AI (SPAI) Actor on the Apify Store that focuses on one task: ensuring every feedback, complaint, or evaluation is delivered with **total clarity**. It processes batches of 1 to 1,000+ feedback items per run—**each item refined individually, one by one**—accepts CSV or JSON input, lets you pick a different tone for each entry, and exports polished results immediately. No data is stored; no fake praise; just honest, professional, reliable output.

> **Market context:** The AI performance review and talent management market is projected to grow at 16.5% CAGR through 2030, reaching $2.1 billion. Organisations increasingly adopt AI for performance feedback, but face a critical gap: AI that only "warms" language often sacrifices honesty, creating feedback that is comfortable but useless. SCDFT fills this gap by embedding Micro Honesty directly into its architecture and focusing on **clarity** over cosmetic tone‑softening.

---

## 🎯 Who SCDFT Is For

SCDFT helps anyone who needs to deliver feedback that is honest yet constructive, without spending hours polishing the language.

- **HR & Performance Management** – turn rough manager notes into clear, actionable performance reviews that are fair, documented, and free from personal bias.
- **Customer Support** – transform emotional complaints into structured, professional feedback that product teams can act on immediately.
- **Product & Engineering Teams** – convert chaotic user bug reports and negative reviews into clear, actionable product insights.
- **Public Services & Government** – process citizen complaints into formal, verifiable reports that can be tracked and resolved.
- **Anyone** who values feedback that is honest without being hurtful, and professional without being evasive.

**No coding skills are required.** If you can use a spreadsheet, you can use SCDFT.

---

## 📣 From Chaos to Clarity: Who Really Uses SCDFT?

In many organisations, valuable feedback gets lost because it sounds too emotional or unprofessional to be taken seriously. SCDFT fixes this by acting as a bridge between the messy reality of human complaints and the structured needs of decision-makers.

**Here is how feedback travels without SCDFT:**
1. A frustrated customer yells at a support agent.
2. The agent, already stressed, passes the raw complaint to their manager.
3. The manager reads an emotional rant, struggles to extract the core issue, and hesitates to forward it to the director.
4. **Result:** The director never hears the real problem. No action is taken. The customer leaves.

**Here is how feedback travels with SCDFT (the ideal workflow):**
1. A frustrated customer yells at a support agent.
2. The agent (or their manager) pastes the raw text into SCDFT.
3. SCDFT transforms *"This app is garbage!"* into *"The application crashes frequently when generating reports, disrupting the team's workflow. This needs immediate attention."*
4. **Result:** The manager can now confidently forward a clear, professional report to the Product Director, who can finally take action based on real, unfiltered data.

**Why this matters:**
- **For Managers:** You don't have to be a professional editor to create a professional report.
- **For Directors:** You finally receive feedback that is clear, traceable (thanks to the `auditHash`), and ready to be turned into an action plan.
- **For Everyone:** The truth is never lost in translation. SCDFT preserves every criticism, but it delivers it in a way that can actually be heard.

---

## ⚙️ Two Ways to Use SCDFT

SCDFT is a published Apify Actor, which means it can work either as a simple tool or as part of a larger automated workflow.

| **As a SPAI (Tool)** | **As a Component of an AI Agent** |
| :--- | :--- |
| **How it works:** You provide the raw feedback (CSV/JSON/Apify Input) and SCDFT transforms it. It's a straightforward, one‑click batch process. | **How it works:** An AI Agent (built with n8n, Make, Zapier, LangChain, or CrewAI) detects that a review or complaint needs professional refinement and calls SCDFT as one of its tools. |
| **Best for:** Quick, manual batch processing of performance reviews, customer complaints, or product feedback. No setup needed—upload a file and get results in seconds. | **Best for:** Fully automated workflows. For example, an AI Agent that monitors an HR system, identifies rough performance notes from managers, and automatically refines them with SCDFT before the review cycle closes. |
| **Goal:** Maximum simplicity for non‑technical users. | **Goal:** Maximum flexibility for developers and advanced users. |
| **How to get started:** Upload a CSV or JSON on the Apify Actor page. | **How to get started:** Connect SCDFT to **n8n, Make, or Zapier**, link your HR platform or feedback system, and build your automated workflow in minutes. |

---

## 🔗 How to Turn SCDFT into an AI Agent (for non‑technical users)

You can turn SCDFT into a **fully autonomous AI Agent** that monitors your HR system, rewrites incoming feedback from managers, and produces structured, manager‑ready reports—all without manual work.

**What you need:**
- An Apify account (free tier available)
- An n8n, Make, or Zapier account (free trials available for all)
- Access to your feedback or HR platform (Google Sheets, Slack, email, etc.)

**How it works:**
1. **Connect your feedback source** – grant access to the platform (n8n, Make, or Zapier) so it can read incoming feedback from your system (e.g., a Google Sheet where managers submit rough performance notes, or a Slack channel where customer complaints are posted).
2. **Add SCDFT as the refinement step** – the platform sends the raw feedback text to SCDFT, and SCDFT returns the clear, professional, and formally structured version, complete with an audit hash.
3. **Route the results** – the refined report is automatically forwarded to the relevant manager, saved back to your HR spreadsheet, or stored for documentation.

**No coding required.** Just a few clicks to connect your feedback source and SCDFT. The platform handles the rest. A complete n8n workflow example is available in the Apify integration guide.

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
| `context` | ❌ | Type of feedback (`performance review`, `customer complaint`, `product review`, `public report`). Helps SCDFT refine more precisely. |
| `recipientName` | ❌ | Name of the person receiving the feedback. If provided, SCDFT will address them respectfully. |

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

- Field Description
- originalFeedback The raw feedback you provided.
- improvedFeedback The refined, professional version. Every criticism is preserved; every harsh word is replaced with actionable language.
- toneUsed The tone that was applied.
- status success or error.
- error Error message (if any).
- timestamp Processing timestamp (ISO 8601).
- context The context you provided (if any).
- recipientName The recipient name you provided (if any).
- auditHash A unique SHA‑256 hash of the output (for audit trail and accountability).

## Example output (JSON):

```json
[
  {
    "originalFeedback": "His work is a mess. Deadlines keep slipping. I'm tired of saying the same things over and over.",
    "improvedFeedback": "Andre is facing serious challenges in consistently meeting deadlines. This has been a recurring issue that is affecting the team. We cannot rely on his output until there is measurable and sustained improvement.",
    "toneUsed": "honest and constructive",
    "status": "success",
    "timestamp": "2026-05-01T10:30:00.000Z",
    "context": "performance review",
    "recipientName": "Andre",
    "auditHash": "a1b2c3d4e5f6..."
  }
]
```
You can download the dataset as CSV directly from the Apify Console, or access it programmatically via the Apify API.

---
## ⚙️ Advanced Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Default Tone | Fallback tone when not specified per item. | honest and constructive |
| Max Concurrency | Number of feedback items processed in parallel (1‑20). | 5 |
| Timeout (seconds) | Maximum wait time per feedback request. | 60 |

---
## 🔌 Integrations (Built‑in by Apify)

Because SCDFT is a published Apify Actor, it automatically appears in the integration catalogs of:

- n8n – connect SCDFT to hundreds of apps without code.
- Make – drag‑and‑drop SCDFT into automated workflows.
- Zapier – trigger SCDFT from thousands of events.
- Google Sheets and Google Drive – send refined reports as spreadsheets or save directly to your drive.
- Slack – get notified when a run finishes, or trigger SCDFT directly from a Slack channel.
- GitHub – create issues automatically when a run fails.
- LangChain and LlamaIndex – use SCDFT as a tool inside your custom AI agents.

No extra setup is required from the developer. The integrations are ready to use directly from the Apify Actor page. Users simply authenticate with their own accounts and select SCDFT from the list of available Actors.

**Example no‑code workflow (Zapier + Google Sheets + Slack):**
1. A manager submits rough performance feedback into a Google Sheet.
2. Zapier detects the new row and sends the raw text to SCDFT.
3. SCDFT refines it into a clear, structured, and professional report.
4. Zapier sends the refined report to the HR Manager via Slack.

Just a few clicks — you never touch a single line of code.

---

## 🧪 Sample Workflow (HR Manager)

1. Export your performance review list from your HR system (or ATS) to a CSV file.
2. Keep the column with the raw feedback (or create one).
3. Add extra columns: `targetTone` (set to `honest and constructive`), `recipientName`, `context`, and `additionalInstructions` (optional).
4. Save the file.
5. Visit the SCDFT Actor page on Apify Store, upload the CSV, click **Run**.
6. Wait a few seconds, then download the output CSV.
7. Review each `improvedFeedback` item and deliver it to the employee, or copy it into your performance review document.

Time saved: hours → minutes. Integrity: preserved.

---
## ❌ Not a Bulk Processor
SCDFT is not a mass-feedback tool. It does not take a single template and spray it to thousands of recipients. Each feedback item is individually refined through the Stech Core API, ensuring ethical, honest, and personalized output. We deliver the value of genuine human connection, not just the quantity of feedback processed.

## ❗ Notes & Risks

- SCDFT is NOT an HR decision tool. It is a writing assistant only. All final decisions on performance, discipline, or employment must remain with human managers. SCDFT does not evaluate, score, or recommend personnel actions.
- SCDFT will NOT falsify feedback. A core honesty principle is embedded in its architecture. It will never turn a serious criticism into an empty compliment, nor sugarcoat the truth.
- Always review the refined feedback before delivering. AI can make mistakes, and the final responsibility for the message rests with the sender.
- No legal, medical, or financial advice – Stech is not a professional advisor; the output is for language improvement only.
- No data storage – feedback items are processed in memory and never persisted; once a run is complete, the data is available only in your dataset until you delete it.
- Regulatory transparency – every output includes an auditHash (SHA‑256) for traceability without storing your data, supporting accountability under frameworks such as the EU AI Act.
- Failed rows are flagged with status: error in the output; you can retry them after addressing the cause (e.g., network timeout, malformed input).
- Apify charges – as a Pay Per Event Actor, each processed result incurs a small fee, which is displayed transparently to the user before the run starts. The first 5 seconds of each run are free.

---

## 🔗 Links

- Stech Service on RapidAPI – for production access with higher rate limits
- Interactive Service Documentation (Postman) – explore and test the service endpoints directly

---

## 📄 License & Disclaimer

**This Actor is provided for informational and communication improvement purposes only.
Stech does not give financial, legal, or medical advice. Always review the output before delivering.
By using this Actor, you agree that the creator is not liable for any consequences arising from its use.**
---
The source code of SCDFT is publicly available for transparency and trust. All rights are reserved under the **Stech Commercial License (SCL) v2.1**. For full terms, see the [LICENSE](https://github.com/sherado99/Stech/blob/main/LICENSE.md) file in the Stech repository.

---

**Stech – honest, warm, and never pretends to be human. 😊🌿**

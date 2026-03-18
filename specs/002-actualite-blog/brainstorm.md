# Actualités (AI-Powered Blog) - Brainstorming Document

## 1. Context & Objective
The goal is to build an "Actualité" (News/Blog) section to significantly drive high-value organic traffic and improve website SEO. The system must seamlessly integrate with an AI automation pipeline while maintaining the strict "Industrial Luxury" standard of the Smatch Digital brand.

## 2. Content & SEO Strategy
**The Hybrid Authority Approach**
The AI content engine will execute a mix of two strategies:
1. **Thought Leadership:** Deep-dive, educational pieces targeting B2B CTOs and decision-makers (e.g., Enterprise Architecture, Digital Transformation).
2. **Targeted Implementation:** Niche, long-tail articles focused on specific domains and case studies.

## 3. Architecture Overview (The Flow)
A secure, **one-way, human-gated pipeline**:
1. AI (via n8n) generates the structured article.
2. The AI writes the raw output into a **Google Sheet**.
3. The editorial team reviews the sheet and checks an "Approve" box.
4. n8n detects the approval and fires a secure REST API call directly into Payload CMS.
5. Payload automatically creates the document in a new `Actualités` collection and sets its status to "Published".
6. Next.js instantly serves this new SEO-optimized page to Google.

## 4. The Data Model (Advanced Semantic Structure)
To ensure the AI injects maximum SEO "juice", the Payload schema will capture highly structured semantic data nodes:
- **Content Core:** `Title` (H1), `Slug` (URL), and `Body` (Lexical Rich Text).
- **SEO & Snippet Fuel:** `Meta Title`, `Meta Description`, `Estimated Read Time`, and `Author`.
- **Taxonomy:** `Categories` (e.g., Thought Leadership) and `Tags`.
- **Structured Schema (The Secret Weapon):** An `FAQ Schema` JSON field where the AI extracts 3 common questions answered in the article, injected invisibly into the HTML `<head>` for Google Rich Snippets.

## 5. Component Breakdown
- **Backend (PayloadCMS):** 
  - A dedicated `Actualités` collection (keeps AI content isolated from premium, human-curated corporate announcements).
  - A custom REST endpoint (e.g., `/api/actualites/n8n-ingest`) secured by a private API Key.
- **Frontend (Next.js):**
  - **The Hub (`/actualites`):** A sleek, filterable masonry grid showing the latest posts, localized and categorized for users.
  - **The Article (`/actualites/[slug]`):** The dynamic detail page engineered strictly for SEO (semantic HTML5, zero-layout-shift imagery, automated Breadcrumbs, pre-rendered JSON-LD).

## 6. Error Handling (The Defense)
The API boundary will enforce **Strict Zod Validation**. If n8n tries to push a post where the Title is missing, the Meta Description is too short, or the HTML is broken, the Payload API instantly blocks the insertion and returns a specific `400 Bad Request`. This guarantees that zero broken or un-optimized pages ever enter the live CMS.

---

## 7. Technical Specifications (Draft)

### A. The n8n JSON Payload
When the Google Sheet is approved, n8n will send a `POST` request with the following structure:
```json
{
  "api_key": "smatch_secure_ai_key_...",
  "title": "Why Modular Architecture is Replacing Legacy Systems",
  "contentHtml": "<h2>The Era of Monoliths is Over</h2><p>...</p>",
  "meta": {
    "title": "Modular Architecture vs Legacy ERPs | Smatch Digital",
    "description": "Discover why modern enterprises are abandoning legacy ERPs for modular...",
    "readTime": "4 min"
  },
  "taxonomy": {
    "categories": ["Thought Leadership", "Architecture"],
    "tags": ["ERP", "Next.js", "Scale"]
  },
  "schemaFAQ": [
    { "question": "What is modular architecture?", "answer": "..." }
  ]
}
```

### B. Payload CMS 3.0 Custom Endpoint
To ingest this without bypassing our access controls, we will define a custom endpoint directly on the `Actualités` collection in Payload:

```typescript
// src/collections/Actualites.ts
export const Actualites: CollectionConfig = {
  slug: 'actualites',
  // ... fields ...
  endpoints: [
    {
      path: '/n8n-ingest',
      method: 'post',
      handler: async (req) => {
        // 1. Verify API Key
        // 2. Validate req.json() against Zod schema
        // 3. Convert HTML to Lexical Rich Text Node
        // 4. Create document using req.payload.create()
        return Response.json({ success: true, docId: newDoc.id })
      }
    }
  ]
}
```

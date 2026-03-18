# API Contract: n8n Actualités Ingestion Endpoint

## Endpoint
**POST** `/api/actualites/n8n-ingest`

## Authentication
Requires an API key passed in the headers.

**Headers**:
```http
x-api-key: <YOUR_SECRET_API_KEY>
Content-Type: application/json
```

## Rate Limiting
Maximum 10 requests per minute per API key. Returns HTTP 429 when exceeded.

## Request Payload

### Example Request
```json
{
  "title": "The Future of Supply Chain Transparency",
  "slug": "future-of-supply-chain-transparency", // optional
  "bodyHtml": "<h2>Introduction</h2><p>The global layout...</p>",
  "excerpt": "A deep dive into how blockchain and IoT are revolutionizing end-to-end visibility in modern manufacturing and supply chain operations.",
  "heroImageUrl": "https://example.com/images/supply-chain.jpg",
  "additionalImageUrls": [
    "https://example.com/images/diagram1.png"
  ],
  "category": "Supply Chain", 
  "tags": ["IoT", "Blockchain", "Industry 4.0"],
  "estimatedReadTime": 8,
  "locale": "en",
  "metaTitle": "Supply Chain Transparency 2026 | Smatch",
  "metaDescription": "Discover how IoT and blockchain technology are creating unprecedented transparency in modern supply chains. Read the full analysis.",
  "focusKeywords": "supply chain transparency, IoT logistics",
  "seoPotentialScore": 85,
  "faqEntries": [
    {
      "question": "What is supply chain transparency?",
      "answer": "Supply chain transparency refers to the process of capturing and sharing data about product origins, manufacturing conditions, and logistics paths."
    }
  ]
}
```

### Field Requirements
- `title` (string, required): The article title.
- `bodyHtml` (string, required): Raw HTML content from the AI. Script tags and iframes will be stripped before Lexical conversion.
- `excerpt` (string, required): A brief ~150 char plain text summary.
- `locale` (string, required): `"en"` or `"fr"`.
- `heroImageUrl` (string, optional): A valid HTTP(S) URL to an image. The CMS will download and save it.
- `additionalImageUrls` (array of strings, optional): Valid HTTP(S) URLs to additional images.
- `slug` (string, optional): URL-safe identifier. If omitted, generated from title. Must be unique.
- `category` (string, optional): Name of the category. The CMS will try to match this to an existing category ID.
- `tags` (array of strings, optional): Array of tags.
- `estimatedReadTime` (number, required): Estimated minutes to read.
- `metaTitle` (string, required): SEO Title. Mapped to Payload's native `meta.title`.
- `metaDescription` (string, required): SEO Description (50-160 chars recommended). Mapped to Payload's native `meta.description`.
- `focusKeywords` (string, optional): Keyword comma-separated list.
- `seoPotentialScore` (number, required): Integer 0-100 indicating SEO potential. Default to 0 if missing/invalid.
- `faqEntries` (array of objects, optional): Each object requires `question` and `answer` as strings. Mapped to Payload's custom array field for JSON-LD.

## Responses

### 201 Created
Returns the basic metadata of the created item.
```json
{
  "success": true,
  "message": "Article ingested successfully",
  "articleId": "651f92e...",
  "slug": "future-of-supply-chain-transparency"
}
```

### 400 Bad Request
Zod validation failure or JSON parsing error.
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    { "field": "excerpt", "message": "Required" }
  ]
}
```

### 401 Unauthorized
Missing or invalid `x-api-key`.
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### 409 Conflict
An article with the same slug already exists.
```json
{
  "success": false,
  "error": "An article with slug 'future-of-supply-chain-transparency' already exists."
}
```

### 429 Too Many Requests
Rate limit exceeded.
```json
{
  "success": false,
  "error": "Rate limit exceeded. Maximum 10 requests per minute."
}
```

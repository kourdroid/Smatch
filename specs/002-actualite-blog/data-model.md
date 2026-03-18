# Data Model: AI-Powered Actualités Blog

## Entities

### `Actualités` (Payload CMS Collection)
This is a new collection isolated from the existing `Posts` collection to track AI-generated/batch-ingested content separately while reusing many familiar fields.

**Settings**:
- Slug: `actualites`
- Admin: Grouped under "Content", localized (en/fr)
- Access: Create (authenticated), Read (authenticatedOrPublished), Update (authenticated), Delete (authenticated)
- Versions: `maxPerDoc: 50`

**Fields**:
| Field Name | Type | Required | Localized | Notes |
|------------|------|----------|-----------|-------|
| `title` | Text | Yes | Yes | The article title |
| `slug` | Text | Yes | No | URL-safe identifier. Auto-generated if omitted. Unique index. |
| `body` | RichText (Lexical) | Yes | Yes | Main article content, ingested as HTML but converted to Lexical nodes. |
| `excerpt` | Textarea | Yes | Yes | Plain text excerpt (~150 chars). Displayed on hub cards. |
| `heroImage` | Upload (Media) | No | No | Sourced via URL in Google Sheets. Downloaded & saved to Media collection. |
| `additionalImages`| Array of Uploads | No | No | Additional images referenced in the article, downloaded to Media. |
| `category` | Relationship | No | No | Points to existing `Categories` collection. |
| `tags` | Array of Texts | No | No | Simple string array for lightweight taxonomy. |
| `estimatedReadTime`| Number | Yes | No | Displayed as minute duration on frontend. |
| `source` | Select | Yes | No | Options: `ai-generated`, `manual`. Defaults based on API vs Admin UI creation. |
| `publishedAt` | Date | No | No | Set automatically on ingestion/publication. |

**SEO Metadata Group (Tab/Group)**:
| Field Name | Type | Required | Localized | Notes |
|------------|------|----------|-----------|-------|
| `metaTitle` | Text | Yes | Yes | Title tag for SEO. |
| `metaDescription`| Textarea | Yes | Yes | Meta description. Max 160 chars. |
| `focusKeywords` | Text | No | Yes | Keyword targets. |
| `seoPotentialScore`| Number | Yes | No | Integer 0-100 indicating SEO value estimate (defaults to 0). |

**Schema Markup Group (Tab/Group)**:
| Field Name | Type | Required | Localized | Notes |
|------------|------|----------|-----------|-------|
| `faqEntries` | Array | No | Yes | Contains blocks/objects with `question` and `answer` (text fields) to generate JSON-LD `FAQPage` schema on frontend. |

### `Categories` (Existing Collection)
- Reused to map an `Actualité` to a specific domain (e.g. "Thought Leadership").

### `Media` (Existing Collection)
- Reused to store images downloaded from the URLs provided in the ingestion payload.

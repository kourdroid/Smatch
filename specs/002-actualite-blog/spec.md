# Feature Specification: AI-Powered Actualités Blog

**Feature Branch**: `002-actualite-blog`
**Created**: 2026-03-18
**Status**: Draft
**Input**: Build an Actualités (blog) page with AI-generated content for SEO. AI articles are generated externally, staged in Google Sheets for editorial review, then ingested into CMS via n8n automation upon approval.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Editorial Review & Approval via Google Sheets (Priority: P1)

Every day, the editorial team opens Google Sheets and sees a batch of AI-generated article proposals. Each row contains: title, body content, meta title, meta description, focus keywords, SEO potential score, category, tags, estimated read time, and FAQ schema entries. The editor reviews the content, and when satisfied, changes the **Status** column from "Draft" to "Approved." Upon status change, n8n detects the approval and fires a secure API request to the CMS, which creates the article as a published post. The post then appears live on the website within minutes.

**Why this priority**: This is the entire pipeline. Without the approval-to-publish flow, no content reaches the website. Everything else is presentation.

**Independent Test**: Can be fully tested by changing a row status to "Approved" in the Google Sheet and verifying the article appears in the CMS within 5 minutes and on the live website within 10 minutes.

**Acceptance Scenarios**:

1. **Given** the editorial team has a Google Sheet with AI-generated article data and a row with status "Draft", **When** the editor changes status to "Approved", **Then** n8n sends a POST request to the CMS ingestion endpoint and the article is created as a published document within 5 minutes.
2. **Given** n8n sends a POST request with missing or malformed data (e.g., empty title, meta description under 50 characters), **When** the CMS receives the request, **Then** the system blocks the insertion entirely and returns a clear error (no broken pages ever enter the CMS).
3. **Given** n8n sends a POST request without a valid API key, **When** the CMS receives the request, **Then** the system rejects it with an authentication error.
4. **Given** an article is successfully ingested, **When** the post is created in the CMS, **Then** it includes: title, slugified URL, body content (Lexical rich text), meta title, meta description, focus keywords, SEO potential score, category, tags, estimated read time, FAQ schema, and publishedAt timestamp.

---

### User Story 2 — Visitor Browses the Actualités Hub (Priority: P2)

A visitor navigates to the `/actualites` page and sees a visually compelling, filterable listing of all published articles. The listing uses a **magazine layout**: the most recent (or editorially featured) article is displayed prominently at the top as a large hero card, followed by a responsive card grid below. The design follows the "Industrial Luxury" standard — dark backgrounds, gold accents, smooth motion. Each article card shows the title, category, estimated read time, publish date, and a brief excerpt. The visitor can filter articles by category. The listing is paginated.

**Why this priority**: The public-facing hub is what Google indexes and visitors interact with. Without it, published content has no home.

**Independent Test**: Can be tested by creating several test articles manually in the CMS and verifying the hub page renders correctly with proper filtering, pagination, and responsive layout.

**Acceptance Scenarios**:

1. **Given** there are published articles in the CMS, **When** a visitor navigates to `/actualites`, **Then** the page displays article cards in a structured listing with title, category, read time, date, and excerpt.
2. **Given** articles span multiple categories, **When** a visitor selects a category filter, **Then** only articles in that category are shown.
3. **Given** there are more than 12 published articles, **When** a visitor views the hub, **Then** pagination controls appear and allow navigation between pages.
4. **Given** a visitor is on a mobile device, **When** they view the hub, **Then** the layout adapts to a single-column mobile-first design without layout shift.

---

### User Story 3 — Visitor Reads an Individual Article (Priority: P2)

A visitor clicks on an article card from the hub (or arrives via Google search) and lands on the full article page at `/actualites/[slug]`. The page renders the complete article with semantic HTML structure (proper heading hierarchy, `<article>`, `<time>`, breadcrumbs), embedded FAQ schema as JSON-LD in the `<head>`, and all SEO metadata. The page loads fast, has zero layout shift, and is fully pre-rendered for search engine crawlers.

**Why this priority**: Same priority as the hub — this is the page Google actually ranks and visitors actually read. Both are needed for SEO value.

**Independent Test**: Can be tested by navigating to a specific article URL and verifying: correct content rendering, proper heading hierarchy, JSON-LD FAQ schema in page source, breadcrumb navigation, meta tags, and responsive layout.

**Acceptance Scenarios**:

1. **Given** a published article exists, **When** a visitor navigates to `/actualites/[slug]`, **Then** the full article renders with title (H1), body content, author attribution, publish date, category, tags, and estimated read time.
2. **Given** the article has FAQ schema data, **When** the page is rendered, **Then** the FAQ JSON-LD structured data is present in the `<head>` for Google Rich Snippet eligibility.
3. **Given** the article exists, **When** a search engine crawler accesses the page, **Then** the page is fully server-side rendered with correct `<title>`, `<meta description>`, canonical URL, and Open Graph tags.
4. **Given** the article page is loaded, **When** the visitor scrolls, **Then** breadcrumb navigation shows: Home > Actualités > [Article Title].

---

### User Story 4 — Google Sheets Dashboard with SEO Metrics (Priority: P3)

The editorial team uses Google Sheets as a lightweight editorial dashboard. Each row contains not just the article content but also SEO intelligence: focus keywords, SEO potential score (0-100), keyword difficulty estimate, and suggested category. This allows the team to make informed approval decisions based on SEO value, not just content quality.

**Why this priority**: The dashboard enriches the editorial workflow but the core pipeline (US1) works without it. This adds intelligence to the process.

**Independent Test**: Can be tested by verifying that AI-generated rows in the Google Sheet contain all expected SEO metadata columns with non-empty, meaningful values.

**Acceptance Scenarios**:

1. **Given** the AI generates a new article proposal, **When** the row is written to Google Sheets, **Then** it includes columns for: Title, Body (or preview), Meta Title, Meta Description, Focus Keywords, SEO Potential Score, Category, Tags, Read Time, FAQ entries, and Status (defaulting to "Draft").
2. **Given** the editorial team views the sheet, **When** they sort by SEO Potential Score, **Then** the highest-value articles appear first for prioritized review.

---

### User Story 5 — Bilingual Article Support (Priority: P3)

Articles ingested via the n8n pipeline support both English and French locales. The AI generates content in the primary language, and the system stores it with the correct locale flag. The editorial team can optionally provide translations for the alternate locale via the CMS admin panel.

**Why this priority**: The website already supports en/fr localization. Articles must respect this, but the initial pipeline can launch with single-language articles and add translations later.

**Independent Test**: Can be tested by ingesting an article with a locale flag and verifying it appears correctly on the locale-prefixed URL (e.g., `/fr/actualites/[slug]`).

**Acceptance Scenarios**:

1. **Given** an article is ingested with locale "fr", **When** a visitor navigates to `/fr/actualites/[slug]`, **Then** the article renders in French.
2. **Given** an article exists only in French, **When** a visitor navigates to `/en/actualites/[slug]`, **Then** the system falls back gracefully (either shows the French version per Payload's fallback config or displays a "not available in this language" message).

---

### Edge Cases

- What happens when n8n sends a duplicate article (same slug as an existing published article)? The system MUST reject the duplicate and return an error — no silent overwrites.
- What happens when the Google Sheet has a row approved but n8n's webhook fails (network error, CMS downtime)? n8n MUST retry the request with exponential backoff and log the failure for the editorial team.
- What happens when a very long article (10,000+ words) is ingested? The system MUST handle it without timeout, but the Lexical editor MUST render it without performance degradation.
- What happens when HTML content from the AI contains unsafe tags (e.g., `<script>`, `<iframe>`)? The system MUST sanitize the HTML before converting to Lexical nodes.
- What happens when the SEO potential score is missing or out of range? The system MUST default to 0 and flag the row for manual review.
- What happens when the ingestion endpoint receives more than 10 requests per minute? The system MUST return HTTP 429 and reject excess requests without processing them.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a secure API endpoint for n8n to create articles, authenticated via a dedicated API key (not user credentials).
- **FR-002**: System MUST validate every incoming article payload at the API boundary — rejecting malformed data with specific error messages before any database write occurs.
- **FR-003**: System MUST convert HTML content from the AI into the CMS's native rich text format (Lexical nodes) during ingestion.
- **FR-004**: System MUST generate a URL-safe slug from the article title automatically if one is not provided.
- **FR-005**: System MUST store FAQ structured data per article and output it as JSON-LD on the article detail page for Google Rich Snippet eligibility.
- **FR-006**: System MUST store SEO metadata per article: meta title, meta description, focus keywords, and SEO potential score.
- **FR-007**: System MUST support filtering articles by category on the public listing page.
- **FR-008**: System MUST paginate the article listing (configurable page size, default 12).
- **FR-009**: System MUST render article detail pages with semantic HTML5 (`<article>`, `<time>`, `<nav>` breadcrumbs, proper heading hierarchy).
- **FR-010**: System MUST support localized content (English and French) consistent with the existing i18n configuration.
- **FR-011**: System MUST prevent duplicate articles by rejecting ingestion of articles with slugs that already exist.
- **FR-012**: System MUST sanitize HTML content during ingestion, stripping unsafe tags (`<script>`, `<iframe>`, `<object>`, event handlers).
- **FR-013**: System MUST store estimated read time per article and display it on both the listing and detail pages.
- **FR-014**: System MUST set `publishedAt` automatically during ingestion to the current timestamp.
- **FR-015**: System MUST revalidate the Actualités listing page and any affected tag/category pages when a new article is published.
- **FR-016**: System MUST store a dedicated plain-text excerpt (~150 characters) per article, provided by the AI via the ingestion payload, and display it on hub listing cards.
- **FR-017**: System MUST enforce rate limiting on the ingestion endpoint at 10 requests per minute per API key, returning HTTP 429 (Too Many Requests) when exceeded.
- **FR-018**: System MUST accept image URLs in the ingestion payload (one required hero image URL + optional additional image URLs), download them, and store them in the CMS media library. If an image URL is unreachable or invalid, the system MUST log the failure and proceed with article creation without that image.
- **FR-019**: System MUST allow editors to create, edit, and delete Actualités articles directly in the CMS admin panel (bypassing the n8n pipeline). The `source` field MUST automatically be set to "manual" for admin-created articles and "ai-generated" for API-ingested articles.

### Key Entities

- **Actualité (Article)**: An AI-generated article with title, slug, body (rich text), excerpt (plain text, ~150 chars), hero image (optional, sourced from URL), additional images (optional array of URLs), meta title, meta description, focus keywords, SEO potential score, estimated read time, FAQ schema entries, publish date, locale, and source indicator ("ai-generated" vs "manual").
- **Category**: A taxonomy label for organizing articles (e.g., "Thought Leadership", "Supply Chain", "Digital Transformation"). Reuses the existing Categories collection.
- **Tag**: A lightweight keyword label for cross-cutting article taxonomy (e.g., "ERP", "IoT", "Industry 4.0").
- **FAQ Entry**: A question-answer pair embedded within an article, used to generate JSON-LD FAQ schema for Google Rich Snippets.

## Assumptions

- The n8n workflow, Google Sheets template, and AI content generation pipeline are built and maintained **external** to this project. This specification covers only the CMS ingestion endpoint and frontend display.
- The Google Sheets structure (columns, status field, formatting) is defined by the editorial team externally. This spec does not prescribe Google Sheets schema — only the API contract between n8n and the CMS.
- The AI generates HTML content (not raw Lexical JSON). The CMS is responsible for HTML-to-Lexical conversion at ingestion time.
- Tags are stored as a simple text array on the article (not a separate collection), keeping the architecture lightweight for the initial launch. If tag-based navigation becomes a priority, a dedicated Tags collection can be introduced later.
- The dedicated `Actualités` collection is separate from the existing `Posts` collection to isolate AI-generated content from human-curated corporate communications.

## Clarifications

### Session 2026-03-18

- Q: What layout pattern should the Actualités hub use? → A: Magazine layout — featured article (large hero card) at top, responsive card grid below.
- Q: Where does the article excerpt come from? → A: AI-generated excerpt — n8n sends a dedicated `excerpt` field (~150 chars plain text), stored on the article.
- Q: Should the ingestion endpoint have rate limiting? → A: Yes, 10 requests/minute per API key, HTTP 429 on excess.
- Q: How are hero images sourced for AI articles? → A: Google Sheets contains image URL(s). n8n sends them in the payload. CMS downloads and stores them. Multiple images per post are optional.
- Q: Can editors create Actualités articles manually in the CMS admin? → A: Yes, full manual creation. Source indicator ("ai-generated" vs "manual") tracks origin automatically.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An approved article in Google Sheets appears as a published page on the website within 10 minutes of status change.
- **SC-002**: 100% of ingested articles pass SEO validation (meta title present, meta description 50-160 chars, slug URL-safe, FAQ schema valid).
- **SC-003**: The Actualités hub page loads in under 2 seconds on mobile (3G connection) with zero Cumulative Layout Shift.
- **SC-004**: Article detail pages score 90+ on Google Lighthouse Performance audit.
- **SC-005**: Article detail pages with FAQ schema generate Google Rich Snippet previews (verified via Google Rich Results Test).
- **SC-006**: The system handles ingestion of at least 50 articles per day without degradation.
- **SC-007**: The editorial team can identify, sort, and approve high-value articles using SEO metrics in the Google Sheets dashboard within 2 minutes per article.
- **SC-008**: All articles are accessible in both English and French locales, with proper URL prefixing and locale-appropriate metadata.

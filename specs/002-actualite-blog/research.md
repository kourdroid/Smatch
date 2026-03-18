# Research & Technical Decisions: AI-Powered Actualités Blog

## Payload CMS Custom Endpoints
- **Decision**: Define a custom REST API endpoint directly within the `Actualites` collection configuration.
- **Rationale**: Payload CMS 3 allows collection-specific endpoints via the `endpoints` array in `CollectionConfig`. This keeps the ingestion logic co-located with the collection it mutates, making it maintainable and adhering to modular design. The path will be `/api/actualites/n8n-ingest`.
- **Alternatives considered**: Creating a standalone Next.js Route Handler (`app/api/n8n-ingest/route.ts`). Rejected because standard Payload collection endpoints inherently provide better access to the `req.payload` instance and integrate seamlessly with the CMS's REST API structure.

## HTML to Lexical Conversion
- **Decision**: Use Payload's official `@payloadcms/richtext-lexical` utility `convertHTMLToLexical` alongside `jsdom`.
- **Rationale**: The AI generates raw HTML, but Payload 3 uses Lexical by default. The official utility converts HTML strings into the proper Lexical serialized JSON state, ensuring the rich text editor works flawlessly for editors.
- **Alternatives considered**: Pushing raw HTML strings to a text field and rendering with `dangerouslySetInnerHTML`. Rejected because it breaks the editorial ability to modify the content in the Payload Admin UI securely.

## Rate Limiting & Authentication
- **Decision**: Implement a custom Node.js/Next.js memory-based rate limiter (or simple Map) tied to the `x-api-key` header within the endpoint handler, combined with a secret API key check.
- **Rationale**: The specification requires 10 req/minute per API key. Checking this inside the endpoint handler guarantees the logic is strictly applied to this specific high-value ingestion route.
- **Alternatives considered**: Using global standard Payload rate-limiting. Rejected because the limit (10/min) is very specific to this integration and shouldn't affect standard frontend or admin API usage.

## Duplicate Prevention
- **Decision**: In the ingestion endpoint, use `req.payload.find({ where: { slug: { equals: incomingSlug } } })` before attempting creation.
- **Rationale**: Explicitly checking for duplicate slugs allows us to return a clean, descriptive 409 Conflict error to n8n, avoiding database constraint crash errors and adhering to Defensive Architecture principles.

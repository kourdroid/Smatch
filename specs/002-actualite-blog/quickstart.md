# Quickstart: AI-Powered Actualités Blog

## Prerequisites
- Node.js 20+
- pnpm
- Local PostgreSQL (via pgAdmin) or Docker for DB.
- `jsdom` and `@types/jsdom` installed in the project (for Lexical HTML conversion).

## Setting up locally
1. Run `pnpm i` to ensure new packages (`jsdom`) are installed.
2. Run your local Postgres database.
3. Configure your `.env` file with `PAYLOAD_SECRET` and `DATABASE_URI`.
4. Generate Payload types for the new `Actualités` collection:
   ```bash
   pnpm generate:types
   ```
5. Apply database migrations (or use `push` if in local dev with `PAYLOAD_PUSH=true`):
   ```bash
   pnpm payload migrate
   ```
6. Start the Next.js development server:
   ```bash
   pnpm dev
   ```

## Testing the Ingestion Endpoint locally
Send a POST request to `http://localhost:3000/api/actualites/n8n-ingest` with the header `x-api-key: <YOUR_SECRET>` and an appropriate JSON payload (see `contracts/n8n-ingest-api.md`).

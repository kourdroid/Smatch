# Implementation Plan: AI-Powered Actualités Blog

**Branch**: `002-actualite-blog` | **Date**: 2026-03-18 | **Spec**: [specs/002-actualite-blog/spec.md](file:///c:/Users/kourd/Desktop/Smatch/Website/website/specs/002-actualite-blog/spec.md)

## Summary

Implement a new `Actualités` collection in Payload CMS to ingest AI-generated articles via a secure `x-api-key` authenticated custom POST endpoint (`/api/actualites/n8n-ingest`). The endpoint will map JSON payloads to the database, download referenced image URLs to the Media collection, and convert raw HTML into Lexical rich-text format using `@payloadcms/richtext-lexical` + `jsdom`. The frontend will feature a magazine-style `/actualites` hub with category filtering and an SEO-optimized `/actualites/[slug]` detail page providing JSON-LD FAQ schema. 

## Technical Context

**Language/Version**: TypeScript 5.7, Node.js 20+
**Primary Dependencies**: Next.js 15.4, PayloadCMS 3.68, React 19.2, TailwindCSS 3.4, `jsdom` (for Lexical HTML conversion)
**Storage**: Supabase PostgreSQL (Prod) / pgAdmin (Dev) + Payload Media (S3 conditionally enabled)
**Testing**: Manual API testing (Postman/Curl) for ingestion, visual inspection for Next.js frontend pages.
**Target Platform**: Web application (Vercel)
**Project Type**: Fullstack Next.js + Payload CMS application
**Performance Goals**: <2s TTI on mobile, 90+ Lighthouse Performance score
**Constraints**: 10 requests/minute rate limit on ingestion API. No duplicate slugs.
**Scale/Scope**: ~50 articles/day scale.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Type Safety**: New collection and endpoint handler will be fully typed. Will run `pnpm generate:types` after adding the collection.
- **Defensive Architecture**: The ingestion endpoint uses explicit `x-api-key` auth. Duplicate slugs checked proactively (409 Conflict). HTML tags like scripts and iframes stripped before insertion.
- **Industrial Luxury**: Frontend `/actualites` will use `smatch-*` colors, strong typography (Antonio/Inter), and a card grid pattern below a featured article to avoid CLS issues.
- **Payload Architecture**: Following standard conventions. `Actualités` collection created separately from `Posts`. Endpoint attached to collection config directly natively in Payload 3.
- **Database Safety**: Supabase connection limits respected. Payload `req.payload` mapped queries used exclusively for database operations inside the endpoint.
- **i18n**: The new collection config sets `localized: true` on text/richText fields, localized routing via existing `[locale]` directories.

## Project Structure

### Documentation (this feature)

```text
specs/002-actualite-blog/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/n8n-ingest-api.md # API Contract
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code

```text
src/
├── collections/
│   └── Actualites/
│       └── index.ts     # New Payload Collection + custom endpoints array
├── app/(frontend)/[locale]/
│   └── actualites/
│       ├── page.tsx     # Hub magazine listing
│       └── [slug]/
│           └── page.tsx # Article detail, JSON-LD schema
└── payload.config.ts    # Central Payload config updated to register collection
```

**Structure Decision**: A standard Next.js App Router + Payload structure following the existing pattern established by the `Posts` framework.

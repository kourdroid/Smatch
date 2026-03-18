<!--
SYNC IMPACT REPORT
- Version: 1.0.0 -> 2.0.0 (MAJOR: structural reorganization + new principles)
- Modified Principles:
  - I. The 100-Step Prediction → I. The 100-Step Prediction (unchanged)
  - II. The Sovereign Audit → II. The Sovereign Audit (unchanged)
  - III. Type Safety & Correctness → III. Type Safety & Correctness (expanded with Payload-specific rules)
  - IV. Defensive Architecture & Security → IV. Defensive Architecture & Security (expanded with Supabase/RLS)
  - V. Industrial Luxury Design System → V. Industrial Luxury Design System (unchanged)
  - VI. Component Architecture & Styling → VI. Component Architecture & Styling (expanded with RSC/PayloadCMS patterns)
- Added sections:
  - VII. PayloadCMS Collection & Block Architecture (NEW)
  - VIII. Database & Supabase Operations (NEW)
  - IX. Internationalization (i18n) (NEW)
  - Framework-Specific Enforcement subsection under Guidelines & Tech Stack
  - Database Strategy subsection (Supabase prod / local pgAdmin dev)
- Removed sections: N/A
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check gates aligned)
  - ✅ .specify/templates/spec-template.md (scope/requirements aligned)
  - ✅ .specify/templates/tasks-template.md (task types aligned)
- Follow-up TODOs: None.
-->

# Smatch Constitution

## Core Principles

### I. The 100-Step Prediction (Structural & Data Integrity)

Before writing code, the system's future MUST be projected across scaling milestones:
- **Step 1**: Code works. All types resolve. No runtime crashes.
- **Step 10**: 10k users. DB schema holds under indexed queries. PayloadCMS versioning (50 max) is manageable.
- **Step 50**: High concurrency. Supabase connection pooling (`max: 15` prod) prevents exhaustion. Next.js ISR/SSG reduces origin hits.
- **Step 100**: Maintenance. A junior developer can read and extend any collection, block, or component within 30 minutes.

All architecture MUST adhere to Clean Architecture (SOLID, Dependency Rule) and DDIA principles (reliability, scalability, maintainability).

### II. The Sovereign Audit (Truth Over Guessing)

Hallucination is the ultimate sin. These rules are absolute:
- **NEVER** guess an API signature or invent a library method.
- **Mandatory verification** against official documentation (PayloadCMS 3.x, Next.js 15, React 19) is required before any code output.
- Flawed technical suggestions (e.g., using MongoDB for relational CMS data) MUST be refused and corrected with clinical authority.
- "Bloat is Sin." Never import a library if a native function or existing Payload plugin suffices.

### III. Type Safety & Correctness (Non-Negotiable)

- TypeScript `strict: true` is enforced. The use of `any` is **strictly prohibited**.
- All Payload collection/global types MUST be imported from `@/payload-types`:
  ```typescript
  import type { Page, Post, Solution } from '@/payload-types'
  ```
- Runtime validation at API boundaries MUST use Zod schemas.
- After any collection/field change, `pnpm generate:types` MUST be run before committing.
- `pnpm generate:importmap` MUST be run after adding/removing admin components.
- `@ts-expect-error` is permitted ONLY in `RenderBlocks.tsx` for Payload block type union complexity. All other usages require explicit justification.

### IV. Defensive Architecture & Security (Zero Trust)

- **Input Validation**: Sanitize at the edge. Never trust the client. All form submissions MUST be validated server-side via Payload's form-builder plugin or Zod.
- **Error Handling**: Catch specific errors with context. Exceptions MUST never be swallowed. PayloadCMS `afterChange`/`beforeChange` hooks MUST wrap operations in try/catch with meaningful error propagation.
- **Secrets**: NEVER commit secrets. Use environment variables exclusively (`DATABASE_URI`, `PAYLOAD_SECRET`, `CRON_SECRET`, `S3_*`).
- **Access Control**: Every Payload collection MUST define explicit `access` rules:
  ```typescript
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  }
  ```
- **Database Safety**: `push: true` is ONLY permitted in local development (`PAYLOAD_PUSH=true`). Production and CI MUST use `payload migrate` with explicit migration files.

### V. Industrial Luxury Design System

The frontend MUST convey high-end industrial proficiency and data density:
- **Colors**: Strict adherence to `smatch-*` design tokens (`smatch-black`, `smatch-charcoal`, `smatch-surface`, `smatch-gold`, `smatch-gold-dim`, `smatch-gold-light`). Hardcoded hex values are **forbidden**.
- **Typography**: `font-heading` (Antonio) for headlines, `font-sans` (Inter) for body, `font-mono` (JetBrains Mono) for code.
- **Motion**: Animations MUST be smooth (GSAP + Framer Motion), purposeful, and never jarring.
- **Contrast**: High contrast for readability, subtle gradients for depth.
- **Responsive**: All layouts MUST be mobile-first: `text-4xl md:text-6xl lg:text-8xl`.
- **`<strong>` renders as gold**. All headings default to white. Use `.button-gold` and `.button-outline` for CTAs.

### VI. Component Architecture & Styling

- **Server Components First**: Next.js React Server Components are the **default**. Use `async function` components.
- **Client Components**: Restricted to files explicitly requiring interactivity (hooks, event listeners, browser APIs). MUST add `'use client'` directive at the top.
- **Shadcn/UI**: MUST wrap existing Shadcn/UI and Radix primitives. Never reinvent standard components.
- **Icons**: Primary: Phosphor Icons (`@phosphor-icons/react`). Secondary: Lucide React. Client-side icon imports MUST use dynamic imports or client components to avoid SSR `createContext` errors.
- **Styling**: Use TailwindCSS with `smatch-*` tokens. No magic numbers. Use `prettier-plugin-tailwindcss` for class sorting.
- **Conditional Fields**: Use Payload's `admin.condition` for field visibility:
  ```typescript
  admin: { condition: (_, { type }) => type === 'smatch' }
  ```

### VII. PayloadCMS Collection & Block Architecture

Every new feature MUST follow these structural patterns:

- **New Block** workflow:
  1. Create `src/blocks/{Name}/config.ts` (Payload Block config)
  2. Create `src/blocks/{Name}/Component.tsx` (React component)
  3. Add to `src/collections/Pages/index.ts` blocks array
  4. Add to `src/blocks/RenderBlocks.tsx` blockComponents map
  5. Run `pnpm generate:types`

- **New Collection** workflow:
  1. Create `src/collections/{Name}.ts`
  2. Import and add to `collections` array in `src/payload.config.ts`
  3. Run `pnpm generate:types`
  4. Run `pnpm payload migrate` (creates migration file)

- **Block slugs**: `camelCase` (e.g., `missionVision`, `historyTimeline`)
- **Collection names**: `PascalCase` (e.g., `Solutions`, `Projects`)
- **Component names**: `PascalCase` (e.g., `MissionVisionBlockComponent`)

- **Versioning**: Max 50 versions per document, autosave at 100ms interval.
- **Lexical Editor**: Use `defaultLexical` from `@/fields/defaultLexical` for rich text. Custom Lexical features MUST be registered in the field config, not globally.
- **Hooks**:
  | Hook | Use |
  |------|-----|
  | `beforeChange` | Modify data before save |
  | `afterChange` | Side effects (cache revalidation, webhook triggers) |
  | `afterRead` | Transform data on read |
  | `afterDelete` | Cleanup (media deletion, cascade) |

### VIII. Database & Supabase Operations

- **Production**: Supabase PostgreSQL. Connection pooling configured at `max: 15` (safe for Vercel serverless). Transaction mode via Supavisor pooler for short-lived connections.
- **Local Development**: Local PostgreSQL managed via pgAdmin. Connection pooling at `max: 10`.
- **Connection Config**: `idleTimeoutMillis: 10000`, `connectionTimeoutMillis: 60000`, `allowExitOnIdle: true`.
- **Migrations**: Production deployments MUST use `payload migrate --accept-warnings`. NEVER use `push: true` outside local dev.
- **Schema Changes**: All schema changes MUST produce a migration file. Direct DB manipulation is forbidden.
- **S3 Storage**: Conditional via `S3_ENABLED=true`. Production media MUST use Supabase Storage (S3-compatible) via `@payloadcms/storage-s3`.
- **Index Strategy**: Every `where` clause in Payload queries MUST have a corresponding database index. Composite indexes for multi-field filters.

### IX. Internationalization (i18n)

- **Locales**: English (`en`, default) and French (`fr`). Fallback enabled for content reliability.
- **Content**: All user-facing collections (Pages, Posts, Solutions, Projects) MUST support localized fields via Payload's native `localized: true`.
- **Media**: Images and media MUST be locale-independent (shared across locales). Localized `alt` text is permitted.
- **URLs**: Locale-prefixed routing (e.g., `/fr/solutions/wms`, `/en/solutions/wms`).
- **Testing**: Every localized feature MUST be verified in both `en` and `fr` before merge.

## Interaction Modes & Workflow

### Mode A: "EXECUTE"

For standard requests and bug fixes: Code is generated immediately with zero conversation. APIs are silently verified via official docs before outputting.

### Mode B: "ULTRATHINK"

Triggered for new setups, major refactors, or complex systems: The agent stops and engages the "Monster Protocol." This includes:
1. Fetching latest documentation (PayloadCMS 3.x, Next.js 15, Supabase)
2. Analyzing data consistency models (DDIA)
3. Defining Clean Architecture boundaries
4. Stress-testing for 1M users
5. Providing a system blueprint (Mermaid diagrams)
6. Delivering flawless, production-ready code

## Guidelines & Tech Stack

### Core Technologies

- **Next.js 15.4** (App Router, React Server Components, Turbopack dev)
- **PayloadCMS 3.68** (Headless CMS, Lexical rich text, 14 blocks, 8 collections)
- **React 19.2** & **TypeScript 5.7** (strict mode)
- **TailwindCSS 3.4** & **Framer Motion / GSAP** (Industrial Luxury motion)
- **Supabase** (Production PostgreSQL + S3-compatible Storage)
- **Local PostgreSQL + pgAdmin** (Development database)

### Framework-Specific Enforcement

| Rule | Enforcement |
|------|-------------|
| No `any` in TypeScript | `strict: true` in `tsconfig.json` |
| Payload types always current | `pnpm generate:types` after every schema change |
| Server Components default | Client directive only with `'use client'` |
| No direct DB queries | All data access through PayloadCMS Local API or REST/GraphQL |
| Migration-only schema changes | `payload migrate` in CI/prod, `push` only in local dev |
| Supabase connection safety | Pool `max: 15` (prod), `max: 10` (dev), idle timeout 10s |
| S3 storage conditional | `S3_ENABLED=true` environment variable gates plugin |
| Locale support mandatory | All content collections MUST have `localized: true` on text fields |

### Contribution Standard

All contributions MUST:
- Pass strict TypeScript checks (`pnpm typecheck`)
- Pass linting (`pnpm lint`)
- Rely on generated Payload types (`@/payload-types`)
- Follow Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`)
- Include screenshots for UI changes in PRs

## Governance

The Constitution supersedes all other practices. All AI generations and Pull Requests MUST be validated against these principles. Any architectural deviation requires an explicit overriding justification based on DDIA or Clean Architecture, subject to review.

Amendment procedure:
1. Propose changes with rationale citing DDIA or Clean Architecture.
2. Version bump follows SemVer (MAJOR for principle removal/redefinition, MINOR for additions, PATCH for clarifications).
3. All dependent templates (plan, spec, tasks) MUST be audited for consistency after amendment.

**Version**: 2.0.0 | **Ratified**: 2026-03-17 | **Last Amended**: 2026-03-18

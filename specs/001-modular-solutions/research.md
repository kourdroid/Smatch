# Research: Modular Solutions Detail Page

## Phase 0: Outline & Research

### Unknowns & Decisions

1. **How to integrate new modular blocks while preserving existing settings?**
   - **Decision**: Update the `layout` field within the `Content` tab of the `Solutions` collection in PayloadCMS, while leaving the `Card Settings` and `Hero Section` tabs completely unchanged.
   - **Rationale**: The user explicitly requested to keep the same card settings, SEO, and hero section. The existing collection (`src/collections/Solutions.ts`) already uses a `tabs` structure, making it perfectly suited to restrict changes only to the `Content` tab.
   - **Alternatives considered**: Creating a new collection entirely (Rejected as it violates the instruction to preserve the existing page setup).

2. **How to ensure zero regressions to the "Industrial Luxury" UI?**
   - **Decision**: The new blocks will be implemented by directly mapping the HTML structure from `content/index.html` into React Server Components natively styled with the existing `smatch-*` utility classes.
   - **Rationale**: The provided `index.html` uses raw HTML/CSS. Moving this into the Next.js App Router requires adapting it to React and Tailwind, but using the exact same classes and structure ensures the design remains identical.

All `NEEDS CLARIFICATION` points from the technical context have been resolved.

# Implementation Plan: Modular Solutions Detail Page

**Branch**: `001-modular-solutions` | **Date**: 2026-03-17 | **Spec**: [spec.md](../spec.md)
**Input**: Feature specification from `/specs/001-modular-solutions/spec.md`

## Summary

This feature updates the `Solutions` CMS collection and frontend detail page to support a fully modular block layout matching the strict structure of `content/index.html`. It specifically preserves the existing `Card Settings`, `Hero Section`, and `slug` definition, changing only the content area to allow editors to dynamically add: Presentation, Architecture, Use Cases, specific Module details, Custom rich text, and Accordions. The frontend will render these blocks reusing precisely the existing "Industrial Luxury" `smatch-*` utility classes.

## Technical Context

**Language/Version**: TypeScript 5.7, Next.js 15.4  
**Primary Dependencies**: PayloadCMS 3.68, React 19.2, TailwindCSS 3.4
**Storage**: PostgreSQL (via PayloadCMS)  
**Target Platform**: Web (Vercel deployment)
**Project Type**: Next.js App Router Web Application with integrated Headless CMS  
**Constraints**: Must strictly preserve the `smatch-*` design tokens, ensure zero regression for SEO/Hero settings, and fully support FR/EN localization.

## Constitution Check

*GATE: Passed*

- **The 100-Step Prediction**: Decoupling the content layout into blocks ensures the CMS schema scales natively without rigid field limits.
- **The Sovereign Audit**: Using PayloadCMS's native `blocks` field within the `tabs` layout precisely follows official Payload version 3.x patterns.
- **Type Safety**: New blocks will map directly through `payload-types` generation to strongly-typed React server components.
- **Component Architecture**: Blocks will be isolated in `src/blocks/` as Server Components, utilizing the existing UI wrapper patterns.

## Project Structure

### Documentation (this feature)

```text
specs/001-modular-solutions/
├── plan.md              # This file
├── research.md          # CMS approach verification
├── data-model.md        # PayloadCMS block definitions
└── spec.md              # Functional requirements
```

### Source Code (repository root)

```text
src/
├── blocks/
│   ├── SolutionPresentation/
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── SolutionArchitecture/
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── SolutionModuleDetails/
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── SolutionBenefits/
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── SolutionUseCases/
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── SolutionCustomSection/
│   │   ├── config.ts
│   │   └── Component.tsx
│   └── SolutionAccordion/
│       ├── config.ts
│       └── Component.tsx
├── collections/
│   └── Solutions.ts      # Modified to include new blocks in the Content tab
└── components/
    └── RenderBlocks.tsx  # Updated to map the new Solution blocks
```

**Structure Decision**: The project uses an App Router monorepo where Payload config and Next.js co-exist. The new blocks will be placed in `src/blocks/` and injected into the existing `Solutions` collection inside `src/collections/`.

## Verification Plan

### Automated Development Checks
1. Run `pnpm generate:types` to ensure the new Payload block configurations correctly compile into TypeScript interfaces.
2. Run `pnpm typecheck` and `pnpm lint:fix` to ensure no type safety or linting regressions occur.

### Manual Verification
1. Open the PayloadCMS Admin Panel in a local development environment.
2. Create/Edit a Solution. Observe that the "Card Settings" and "Hero Section" tabs are intact.
3. In the "Content" tab, successfully add all the newly created modular blocks: Presentation, Architecture, Use Cases, Module Details, Context/Custom, and Accordion.
4. Save the Solution. Ensure no database errors occur.
5. Visit the Solution detail page on the frontend. Visually confirm the layout follows the exact sequence mapped entirely from the blocks, and perfectly matches the "Industrial Luxury" UI styling as provided in `index.html`.
6. Switch the locale (FR -> EN) and verify that localized fields in the new blocks retrieve the correct translations without fallback errors.

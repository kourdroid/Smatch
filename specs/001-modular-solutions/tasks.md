# Tasks: Modular Solutions Detail Page

**Input**: Design documents from `/specs/001-modular-solutions/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md

## Phase 1: Setup & Foundational

**Purpose**: Initializing the block directories

- [x] T001 [P] Create directory structure for new blocks (e.g., `src/blocks/SolutionPresentation/`, etc.)
- [x] T002 [P] Create `index.ts` exporters for the new blocks if the project pattern uses them

## Phase 2: User Story 1 - CMS Admin Assembling a Solution Page (Priority: P1) 🎯 MVP

**Goal**: Allow CMS admins to build solution pages using modular blocks while preserving Card and Hero settings.

**Independent Test**: Admins can add "Presentation," "Architecture," "Use Cases," "Custom," and "Accordion" blocks within the `layout` field inside the "Content" tab of a Solution, and save it without databse errors.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create Paylaod configuration for `SolutionPresentation` in `src/blocks/SolutionPresentation/config.ts`
- [x] T004 [P] [US1] Create Payload configuration for `SolutionArchitecture` in `src/blocks/SolutionArchitecture/config.ts`
- [x] T005 [P] [US1] Create Payload configuration for `SolutionModuleDetails` in `src/blocks/SolutionModuleDetails/config.ts`
- [x] T006 [P] [US1] Create Payload configuration for `SolutionBenefits` in `src/blocks/SolutionBenefits/config.ts`
- [x] T007 [P] [US1] Create Payload configuration for `SolutionUseCases` in `src/blocks/SolutionUseCases/config.ts`
- [x] T008 [P] [US1] Create Payload configuration for `SolutionCustomSection` in `src/blocks/SolutionCustomSection/config.ts`
- [x] T009 [P] [US1] Create Payload configuration for `SolutionAccordion` in `src/blocks/SolutionAccordion/config.ts`
- [x] T010 [US1] Update `src/collections/Solutions.ts` to include the new blocks in the `layout` list inside the "Content" tab.
- [x] T011 [US1] Run `pnpm generate:types` to update `payload-types.ts` with the new block definitions.

**Checkpoint**: CMS Admins can now assemble the backend data structure.

---

## Phase 3: User Story 2 - Visitor Viewing the Solution Page (Priority: P1)

**Goal**: Render the newly created modular blocks on the frontend, exactly matching the Industrial Luxury UI layout of `index.html`.

**Independent Test**: Visiting a published Solution page renders the added blocks in the correct visual sequence matching `index.html`.

### Implementation for User Story 2

- [x] T012 [P] [US2] Implement `SolutionPresentation` component in `src/blocks/SolutionPresentation/Component.tsx`
- [x] T013 [P] [US2] Implement `SolutionArchitecture` component in `src/blocks/SolutionArchitecture/Component.tsx`
- [x] T014 [P] [US2] Implement `SolutionModuleDetails` component in `src/blocks/SolutionModuleDetails/Component.tsx`
- [x] T015 [P] [US2] Implement `SolutionBenefits` component in `src/blocks/SolutionBenefits/Component.tsx`
- [x] T016 [P] [US2] Implement `SolutionUseCases` component in `src/blocks/SolutionUseCases/Component.tsx`
- [x] T017 [P] [US2] Implement `SolutionCustomSection` component in `src/blocks/SolutionCustomSection/Component.tsx`
- [x] T018 [P] [US2] Implement `SolutionAccordion` component in `src/blocks/SolutionAccordion/Component.tsx`
- [x] T019 [US2] Register new block components in `src/components/RenderBlocks.tsx`
- [x] T020 [US2] Verify layout sequence and verify no React hydration errors occur on the `/solutions/[slug]` route.

**Checkpoint**: The frontend perfectly mirrors the backend capabilities with the existing UI styling.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and validation

- [x] T021 [P] Run `pnpm lint:fix` and `pnpm typecheck`
- [x] T022 [P] Validate that the FR/EN translations correctly map across all modules

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately.
- **CMS Phase (US1)**: Depends on Phase 1. 
- **Frontend Phase (US2)**: Depends on US1 (specifically on T011 `generate:types`), because the frontend components require the generated Payload types.
- **Polish (Phase 4)**: Depends on US1 and US2.

### Parallel Opportunities

- Block configurations (T003-T009) can be created in parallel.
- Block components (T012-T018) can be created in parallel once types are generated.

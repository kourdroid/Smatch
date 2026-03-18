# Tasks: AI-Powered Actualités Blog

**Input**: Design documents from `/specs/002-actualite-blog/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/n8n-ingest-api.md`

**Tests**: Manual testing scenarios defined per phase. Extracted from the `spec.md` and `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Contains exact file paths for modifications.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic dependencies

- [x] T001 Install `jsdom` and `@types/jsdom` dependencies

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Create `Actualites` collection schema with all fields in `src/collections/Actualites/index.ts`
- [x] T003 Register `Actualites` collection in `src/payload.config.ts`
- [x] T004 Run type generation `pnpm generate:types`

**Checkpoint**: Foundation ready - database schema established.

---

## Phase 3: User Story 1 - n8n Ingestion API (Priority: P1) 🎯 MVP

**Goal**: As an n8n webhook, I want to send an AI-generated article so it can be published without manual copy-pasting.

**Independent Test**: Send a POST request to `/api/actualites/n8n-ingest` with the `x-api-key` header and payload. Verify 201 Created and article appears in DB.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create custom endpoint handler `n8nIngest` in `src/collections/Actualites/endpoints.ts`
- [x] T006 [US1] Attach `endpoints.ts` to `src/collections/Actualites/index.ts`
- [x] T007 [US1] Implement `x-api-key` auth and 10req/min rate limiting in `src/collections/Actualites/endpoints.ts`
- [x] T008 [US1] Implement Zod payload validation in `src/collections/Actualites/endpoints.ts`
- [x] T009 [US1] Implement HTML to Lexical JSON conversion using `jsdom` in `src/collections/Actualites/endpoints.ts`
- [x] T010 [US1] Implement logic to download `heroImageUrl` and save to `Media` collection in `src/collections/Actualites/endpoints.ts`
- [x] T011 [US1] Implement Payload create document call with `req.payload.create` in `src/collections/Actualites/endpoints.ts`

**Checkpoint**: Ingestion API fully functional. n8n workflow can now be connected.

---

## Phase 4: User Story 2 - Magazine Hub Page (Priority: P2)

**Goal**: As a site visitor, I want to see a magazine-style hub of the latest articles.

**Independent Test**: Navigate to `/fr/actualites` and visually verify the magazine layout and category filters using dummy data.

### Implementation for User Story 2

- [x] T012 [P] [US2] Create `/actualites` route page in `src/app/(frontend)/[locale]/actualites/page.tsx`
- [x] T013 [US2] Query `Actualites` collection and pass data to hub page in `src/app/(frontend)/[locale]/actualites/page.tsx`
- [x] T014 [US2] Implement magazine layout (Featured top + grid below) in `src/app/(frontend)/[locale]/actualites/page.tsx`
- [x] T015 [US2] Implement category filtering UI component in `src/app/(frontend)/[locale]/actualites/page.tsx`

**Checkpoint**: Visitors can browse the actualités hub.

---

## Phase 5: User Story 3 & 4 - Article Detail & SEO (Priority: P3)

**Goal**: As a visitor, I read the full article. As a bot, I read the JSON-LD schema.

**Independent Test**: Navigate to `/fr/actualites/[slug]` and verify rich text formatting. Check DOM for `<script type="application/ld+json">`.

### Implementation for User Story 3 & 4

- [x] T016 [P] [US3] Create dynamic route page in `src/app/(frontend)/[locale]/actualites/[slug]/page.tsx`
- [x] T017 [US3] Query individual `Actualite` and generate generic Metadata in `src/app/(frontend)/[locale]/actualites/[slug]/page.tsx`
- [x] T018 [US3] Implement Lexical rich text renderer to display article `body` in `src/app/(frontend)/[locale]/actualites/[slug]/page.tsx`
- [x] T019 [P] [US4] Implement JSON-LD FAQ schema generator using `faqEntries` in `src/app/(frontend)/[locale]/actualites/[slug]/page.tsx`

**Checkpoint**: Articles can be read and understood by search engines.

---

## Phase 6: User Story 5 - CMS Editor Tuning (Priority: P4)

**Goal**: Admin users can manually adjust AI articles easily in Payload UI.

**Independent Test**: Go to `/admin/collections/actualites`, edit an article, and verify tabs/groups are cleanly organized.

### Implementation for User Story 5

- [x] T020 [P] [US5] Group fields into Tabs (`Content`, `SEO`, `Advanced`) in `src/collections/Actualites/index.ts`
- [x] T021 [US5] Make `slug` read-only after creation via admin hook in `src/collections/Actualites/index.ts`

**Checkpoint**: Admin experience polished.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T022 [P] Test mobile responsivenes on all new pages
- [ ] T023 Run Lighthouse accessibility & performance audit on `/actualites`
- [ ] T024 Add translations to strictly localized strings in `src/i18n` or similar (if applicable)

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Immediate
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Stories**: Phase 3 (US1), Phase 4 (US2), Phase 5 (US3) can all run **in parallel** after Phase 2 is complete. Backend dev builds the API (US1), frontend dev builds the views (US2, US3) using mock data.
- **Polish (Phase 7)**: Depends on all User Stories.

### Parallel Opportunities
- After Foundation (T002-T004):
  - Task T005 (Endpoint handler)
  - Task T012 (Hub page)
  - Task T016 (Detail page)
  - Task T020 (CMS Tabs)
  can theoretically start concurrently.

---

## Implementation Strategy

### MVP First
1. Complete Phase 1 & 2 (Foundation)
2. Complete Phase 3 (API Ingestion)
4. Validate API works fully via Postman
3. Complete Phase 4 (Hub) and Phase 5 (Detail)
5. Deploy MVP to staging.

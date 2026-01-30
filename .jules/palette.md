## 2026-02-12 - Missing Input Labels Pattern
**Learning:** Several interactive components (Chatbot, IconGallery) use `input` elements without visible labels or `aria-label` attributes, relying solely on placeholders. This makes them inaccessible to screen reader users who may not perceive the placeholder as a label, or if the placeholder disappears.
**Action:** When using the `Input` component or raw `input` elements, always ensure a visible `label` is associated via `htmlFor`, or if a visual label is not desired (e.g., chat input), strictly enforce `aria-label` or `aria-labelledby`.

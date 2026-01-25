# Bolt's Journal

## 2024-05-22 - [Invalid sizes attribute in ImageMedia]
**Learning:** The `sizes` attribute in `next/image` (and HTML) must use length units (px, vw), not width descriptors (w). The codebase was generating `(max-width: Xpx) Yw`, which is invalid and causes browsers to ignore the attribute, defaulting to full-width (100vw).
**Action:** When generating `sizes` dynamically, always ensure the value is a length unit. Use `100vw` as a safe default for full-width images relative to their container.

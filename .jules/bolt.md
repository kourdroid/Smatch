# Bolt's Journal

## 2024-05-23 - Invalid units in `sizes` attribute
**Learning:** The `sizes` attribute in HTML `<img>` or `<source>` tags must use length units (e.g., `px`, `vw`, `em`) for the resource selection condition results. Using width descriptors like `w` (e.g., `(max-width: 500px) 1000w`) is invalid syntax for `sizes` (it belongs in `srcset`). Browsers may ignore invalid `sizes` attributes or fall back to defaults (typically `100vw`).
**Action:** When defining default `sizes`, always use valid length units (usually `vw` or `px`). Ensure any "smart" generation logic verifies syntax validity. Use `100vw` as a safe fallback if layout width is unknown.

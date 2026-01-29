## 2024-05-22 - Invalid sizes attribute generation
**Learning:** The `sizes` attribute in HTML images requires length units (e.g., `px`, `vw`), not width descriptors (`w`). Generating `sizes` with `w` units (e.g., `(max-width: 600px) 1200w`) is invalid and causes browsers to likely ignore the attribute, rendering the computational effort to generate it wasteful and potentially confusing developers.
**Action:** When optimizing images, ensure `sizes` attribute contains valid length units. Use `undefined` to let Next.js handle defaults or provide explicit layout widths.

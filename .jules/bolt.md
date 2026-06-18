## 2024-05-22 - Fix invalid sizes attribute
**Learning:** The `sizes` attribute in `next/image` (and HTML) requires length units (e.g. `100vw`, `500px`), but width descriptors (e.g. `500w`) are invalid and can cause browsers to download incorrect image sizes.
**Action:** Always verify `sizes` syntax and default to `100vw` if precise layout dimensions are unknown, allowing `srcset` to handle resolution switching.

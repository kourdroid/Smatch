## 2024-05-22 - Invalid sizes attribute values
**Learning:** The `sizes` attribute in HTML/Next.js `Image` must use length units (e.g., `100vw`, `500px`) for source sizes. Using width descriptors (e.g., `1536w`) is invalid in `sizes` (only valid in `srcset`) and can cause browsers to select incorrect images or download unnecessarily large resources.
**Action:** When generating default `sizes` for responsive images, always use valid length units (like `100vw` or specific pixel values) and rely on Next.js/browser defaults when the size is unknown.

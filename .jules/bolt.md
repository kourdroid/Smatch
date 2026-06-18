## 2026-01-21 - Invalid sizes attribute units
**Learning:** The `sizes` attribute for images must use length units (px, vw); width descriptors (w) are invalid in the `sizes` attribute context.
**Action:** When defining `sizes`, ensure all values are valid lengths (e.g. `100vw`, `500px`) and not `w` descriptors. Use `w` descriptors only in `srcset` (or let Next.js handle `srcset` automatically).

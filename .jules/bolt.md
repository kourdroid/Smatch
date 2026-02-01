## 2026-01-29 - Invalid sizes attribute in ImageMedia
**Learning:** The `sizes` attribute in HTML images/Next.js must use length units (px, vw). Width descriptors (w) are invalid in `sizes` (they belong in `srcset`). The `ImageMedia` component was generating invalid strings like `(max-width: 768px) 1536w`.
**Action:** When defining `sizes`, always use `vw` or `px`. `NextImage` automatically generates `srcset` with `w` descriptors based on the device pixel ratio and the `sizes` slot width.

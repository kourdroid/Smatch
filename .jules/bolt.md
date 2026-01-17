## 2026-01-17 - Invalid sizes attribute units
**Learning:** The `sizes` attribute in `next/image` (and HTML) requires length units (px, vw). Using width descriptors (w) like `1280w` is invalid and can cause the browser to ignore the attribute or default to inefficient behavior.
**Action:** Always verify `sizes` attributes use correct units. When generating sizes dynamically from breakpoints, use `px` for the media condition and the value.

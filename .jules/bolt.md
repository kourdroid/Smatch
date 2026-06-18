## 2025-05-22 - [Invalid `sizes` Attribute in Images]
**Learning:** Next.js `sizes` prop expects length units (e.g., `100vw`, `500px`), NOT width descriptors (e.g., `1000w`). Using `w` units in `sizes` invalidates the attribute, causing browsers to fall back to defaults (often full width), which hurts LCP if the browser loads a larger image than necessary, or breaks responsive behavior.
**Action:** When defining `sizes`, always map media conditions to length units. If unsure of exact layout size, `100vw` is a safer default than an invalid width descriptor. Also, ensure media queries are ordered correctly if relying on `max-width` or `min-width` logic.

## 2025-05-22 - [Missing Poster on Video Elements]
**Learning:** Autoplay videos without a `poster` attribute delay the First Contentful Paint (FCP) or Largest Contentful Paint (LCP) because the browser must download the first frame of the video to render anything.
**Action:** Always provide a `poster` attribute for `<video>` elements, ideally using a generated thumbnail from the CMS (like Payload's `thumbnailURL`) to show an immediate visual while the video loads.

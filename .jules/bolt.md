# Bolt's Journal

## 2025-05-22 - Invalid sizes attribute anti-pattern
**Learning:** Found an `ImageMedia` component generating invalid `sizes` attributes (e.g., `(max-width: 640px) 1280w`). The `w` unit is for `srcset`, not `sizes`. `sizes` expects length units like `px` or `vw`. This likely caused browsers to ignore the attribute or behave unpredictably.
**Action:** Always verify `sizes` attribute syntax. Use `100vw` as a safe default if the layout size is unknown, rather than trying to construct complex but invalid logic.

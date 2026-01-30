## 2024-05-22 - Invalid sizes attribute syntax
**Learning:** The 'sizes' attribute in HTML images must use length units (e.g., px, vw). Width descriptors (e.g., 1280w) are invalid in 'sizes' and are only for 'srcset'. Using them causes browsers to ignore the hint.
**Action:** Ensure 'sizes' attribute only uses length units. Correct invalid defaults in component libraries.

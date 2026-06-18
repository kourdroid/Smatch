## 2024-05-23 - [Invalid sizes attribute in NextImage]
**Learning:** Found usage of `w` units in `sizes` attribute (e.g. `(max-width: 768px) 1536w`), which is invalid HTML. `sizes` expects length units (px, vw). `w` is only for `srcset`.
**Action:** When defining default `sizes`, use `100vw` or specific length units. Do not mix up density descriptors with slot sizes.

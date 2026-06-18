
## 2024-04-20 - Global Input Focus States
**Learning:** The default `focus-visible:ring-1` combined with dark borders creates a muddy, almost invisible focus state on standard form inputs (`Input`, `Textarea`, `Select`). Using `ring-offset` requires the ring width to be at least `ring-2` to remain crisp.
**Action:** Always use `focus-visible:ring-2 focus-visible:ring-offset-1` combined with `transition duration-200` for custom inputs in this project to ensure the focus state "pops" off the dark background.

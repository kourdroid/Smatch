## 2026-02-16 - Custom Dropdown Accessibility
**Learning:** Custom interactive components like language selectors often lack semantic structure, making them invisible to screen readers. Specifically, `div`-based dropdowns need explicit `role="menu"` and `role="menuitem"` alongside `aria-expanded` states to be accessible.
**Action:** When auditing custom dropdowns, immediately check for `aria-haspopup`, `aria-expanded`, and proper role definitions before even testing keyboard navigation.

## 2025-05-24 - Accessibility Patterns in Custom Overlays
**Learning:** Custom modal overlays (like `MobileMenuOverlay`) implemented with Framer Motion often miss `role="dialog"`, `aria-modal="true"`, and focus management. Adding these attributes is a quick accessibility win.
**Action:** Always check custom overlay components for these ARIA attributes and add them if missing. Also consider focus trapping if possible.

## 2024-05-23 - Mobile Navigation Accessibility
**Learning:** The custom mobile navigation (`MobileMenuOverlay`) was implemented as a visual overlay but lacked semantic structure (`role="dialog"`, `aria-modal`) and accessible labels for its icon-only triggers.
**Action:** When creating custom overlays or modals, always ensure they are wrapped in a semantic container with appropriate ARIA roles and that all interactive triggers have accessible names, especially icon-only buttons.

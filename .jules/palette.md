## 2026-05-23 - Interactive Component Accessibility
**Learning:** Interactive components (e.g., Chatbot, IconGallery) in this repository often utilize inputs with placeholders but missing labels, requiring the manual addition of `aria-label` for accessibility.
**Action:** When working on interactive widgets, explicitly check for and add `aria-label` to inputs and `role`/`aria-live` attributes to dynamic content containers.

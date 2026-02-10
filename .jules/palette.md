## 2025-02-12 - Chatbot Accessibility Pattern
**Learning:** Chat interfaces require specific ARIA roles to be usable by screen readers. A message history container should use `role="log"`, `aria-live="polite"`, and `aria-atomic="false"` to announce new messages without interrupting the user. The main container should have `role="dialog"` or `complementary` with a label.
**Action:** When implementing or modifying chat-like interfaces, ensure these roles and live regions are present. Use localized strings for all `aria-label` attributes.

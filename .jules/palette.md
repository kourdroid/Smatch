## 2026-02-02 - Chatbot Accessibility
**Learning:** Chat interfaces require `role="log"` and `aria-live="polite"` on the message container for screen readers to announce new messages automatically without losing focus on the input. Inputs must always have labels, even if placeholders are present.
**Action:** Always verify chat or live-feed components include these ARIA attributes and labels.

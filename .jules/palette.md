## 2024-05-23 - Chatbot Accessibility Pattern
**Learning:** Interactive chat widgets often miss `aria-live` regions, making them silent for screen reader users when new messages arrive.
**Action:** Always wrap message lists in `role="log"` with `aria-live="polite"` and ensure "Typing..." indicators are also announced or at least don't interfere.

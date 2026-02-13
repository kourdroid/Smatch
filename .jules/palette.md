## 2026-02-19 - Accessible Chat Widget
**Learning:** Chat widgets often have focus traps or confusing screen reader experiences. Using `role="log"` with `aria-live="polite"` on the message container ensures new messages are announced naturally. Additionally, managing `tabIndex` and `aria-hidden` on the launcher button when the chat is open prevents "ghost focus" issues for keyboard users.
**Action:** Always check interactive overlays for correct focus management and ARIA roles for dynamic content regions.

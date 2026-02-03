## 2025-05-15 - Chatbot Accessibility Gaps
**Learning:** Interactive components like Chatbots often rely on visual cues (scrolling, bubbles) but miss semantic roles (`role="log"`) and live regions (`aria-live`), making them silent for screen readers. Inputs in these widgets frequently lack labels due to design constraints.
**Action:** Always verify "dynamic log" components (chats, feeds) have `role="log"` and `aria-live="polite"`. Ensure embedded inputs have `aria-label`.

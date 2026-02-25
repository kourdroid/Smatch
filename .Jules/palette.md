## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Custom widgets (like chatbots) that use `opacity` and `pointer-events` for transitions must also use `visibility: hidden` (or `display: none`) when closed. Otherwise, screen reader users can still navigate into the hidden content.
**Action:** Always pair `opacity-0` with `invisible` or `hidden` for toggled UI elements that remain in the DOM.

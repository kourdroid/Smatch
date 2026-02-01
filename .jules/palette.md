## 2025-05-23 - Accessibility of Opacity-Based Toggles
**Learning:** This codebase frequently uses `opacity-0 pointer-events-none` to hide interactive elements (like the Chatbot) instead of conditional rendering (`{isOpen && ...}`). This leaves invisible interactive elements in the DOM.
**Action:** When working on toggled components in this repo, always ensure `aria-hidden` is explicitly toggled alongside the visual classes to prevent screen reader focus on invisible elements.

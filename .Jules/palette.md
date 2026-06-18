## 2025-05-23 - Accessibility of Hidden Modals
**Learning:** Elements hidden with `opacity-0` and `pointer-events-none` remain in the accessibility tree and can be focused by keyboard users.
**Action:** Always combine `opacity-0` with `invisible` (or `visibility: hidden`) for off-screen or hidden interactive elements to ensure they are properly removed from the accessibility tree.

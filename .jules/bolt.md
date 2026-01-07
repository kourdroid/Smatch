# Bolt's Journal ⚡

This journal records critical learnings about performance optimization in this codebase.

## Format
`## YYYY-MM-DD - [Title]`
`**Learning:** [Insight]`
`**Action:** [How to apply next time]`

## 2024-05-23 - Missing Dependency Array in HighImpactHero
**Learning:** Found a `useEffect` in `HighImpactHero` that was running on every render because it lacked a dependency array. This caused `setHeaderTheme` to be called repeatedly, potentially triggering unnecessary state updates or work.
**Action:** Always check `useEffect` hooks for missing dependency arrays, especially when they call context setters.

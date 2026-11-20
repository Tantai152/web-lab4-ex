# PROJECT RULES - LAB 4 (EXERCISE 1.1)
**Topic:** Performance & Resiliency Architectural Upgrades

## 1. Workflow & Anti-Monolithic Constraints
- **Atomic Execution:** Strictly work on ONE task and ONE file at a time as defined in `TASK_DECOMPOSITION.md`.
- **No Monolithic Code:** Never combine multiple components or unrelated logic into a single file.
- **No Unsolicited Files:** Do not create extra files, helper libraries, or boilerplate outside the defined directory structure unless explicitly requested in the active task.

## 2. Tech Stack & Coding Standards
- **Framework:** React 19 + Vite (JavaScript `.jsx`).
- **Components:** 100% Functional Components with clean, readable structure.
- **Styling:** Standard CSS (`index.css`) with explicit fixed dimensions to prevent layout shifts. Avoid heavy external UI libraries.

## 3. Architectural & Lab 1.1 Requirements
- **Code-Splitting:** Must implement dynamic imports via `React.lazy(() => import('./pages/PersonDetail'))`.
- **Suspense Boundary:** Wrap the lazy-loaded component inside `<Suspense fallback={<Skeleton />}>`.
- **Zero Layout Shift (CLS = 0):** `Skeleton.jsx` must mirror the exact outer dimensions, padding, margins, and internal block heights of `PersonDetail.jsx`.
- **Accessibility (a11y):** The fallback `Skeleton` component must include `aria-busy="true"` and `aria-live="polite"`.

## 4. Target Directory Structure
```text
web-lab4-ex/
├── PROJECT_RULES.md
├── TASK_DECOMPOSITION.md
└── client/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── components/
        │   └── Skeleton.jsx
        └── pages/
            └── PersonDetail.jsx

```markdown
# TASK DECOMPOSITION - EXERCISE 1.1

Execute each task sequentially (1 prompt = 1 task). Mark `[x]` once verified.

- [ ] **Task 1: Project Scaffold (`client/package.json`, `client/vite.config.js`, `client/index.html`, `client/src/main.jsx`)**
  - Initialize minimal Vite + React 19 configuration files.
- [ ] **Task 2: Zero-CLS Layout Styles (`client/src/index.css`)**
  - Define exact box-model dimensions, skeleton pulse animation, and card layout styles so `Skeleton` and `PersonDetail` occupy identical space (`CLS = 0`).
- [ ] **Task 3: Accessible Skeleton Component (`client/src/components/Skeleton.jsx`)**
  - Create the fallback UI matching `PersonDetail`'s layout dimensions, strictly including `aria-busy="true"` and `aria-live="polite"`.
- [ ] **Task 4: Lazy-Loaded Detail Component (`client/src/pages/PersonDetail.jsx`)**
  - Create the `PersonDetail` component displaying detailed person profile information matching the skeleton's exact geometry.
- [ ] **Task 5: Code-Splitting & Suspense Integration (`client/src/App.jsx`)**
  - Import `PersonDetail` via `React.lazy()` (with a controlled simulated delay for DevTools inspection) and wrap it inside `<Suspense fallback={<Skeleton />}>`.

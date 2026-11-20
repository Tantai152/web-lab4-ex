```markdown
# TASK DECOMPOSITION - EXERCISE 1.3

Execute each task sequentially (1 prompt = 1 task). Mark `[x]` once verified.

- [ ] **Task 1: Project Scaffold (`client/package.json`, `client/vite.config.js`, `client/index.html`, `client/src/main.jsx`)**
  - Setup minimal Vite + React 19 configuration (note: render without `<StrictMode>` double-invocation noise or clearly label render counts so the exact 5-render cascade is transparent).
- [ ] **Task 2: Form Comparison & Execution Trace Terminal Styles (`client/src/index.css`)**
  - Style split comparison cards (Anti-Pattern Red vs. Refactored Green), form inputs, validation error messages, and a dark terminal-style `execution_trace.log` viewer.
- [ ] **Task 3: Pure Validation Rules Utility (`client/src/utils/validation.js`)**
  - Export pure synchronous validation functions for email, username, and password fields.
- [ ] **Task 4: Legacy Anti-Pattern Input (`client/src/components/legacy/LegacyInputField.jsx`)**
  - Implement local state + `useEffect #1: syncToParent()` and `useEffect #5: autoScrollToError()` with render cycle trace logging.
- [ ] **Task 5: Legacy Anti-Pattern Form (`client/src/components/legacy/LegacySimpleForm.jsx`)**
  - Implement parent state + `useEffect #2: validateField()`, `useEffect #3: calcFormValidity()`, and `useEffect #4: syncErrorsToChild()` triggering the 5-render cascade per keystroke.
- [ ] **Task 6: Refactored Stateless Input (`client/src/components/refactored/RefactoredInputField.jsx`)**
  - Implement a pure controlled input component with zero `useEffect` hooks.
- [ ] **Task 7: Refactored Derived-State Form (`client/src/components/refactored/RefactoredSimpleForm.jsx`)**
  - Implement single-source-of-truth form state where errors and validity are derived synchronously during render (zero `useEffect` chains, 1 render per keystroke).
- [ ] **Task 8: Interactive Comparison & Trace Log Dashboard (`client/src/App.jsx`)**
  - Combine Legacy vs. Refactored forms side-by-side (or via mode toggle) alongside a live `execution_trace.log` panel for DevTools & screenshot verification.

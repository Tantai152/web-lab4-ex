# PROJECT RULES - LAB 4 (EXERCISE 1.3)
**Topic:** Legacy Validation Anti-Patterns (Deconstructing `useEffect` Chaining Across `InputField` & `SimpleForm`)

## 1. Workflow & Anti-Monolithic Constraints
- **Atomic Execution:** Strictly execute ONE task and output ONE file per prompt as defined in `TASK_DECOMPOSITION.md`.
- **No Monolithic Code:** Separate Legacy Anti-Pattern components, Refactored React 19 components, and Render Trace Loggers into distinct, single-responsibility files.
- **No Unsolicited Files:** Do not generate extra files outside the defined directory structure.

## 2. Tech Stack & Coding Standards
- **Framework:** React 19 + Vite (JavaScript `.jsx`).
- **Components:** 100% Functional Components.

## 3. Architectural & Lab 1.3 Requirements
- **Side-by-Side Architectural Demonstration:**
  - **Part A — Legacy Anti-Pattern (`legacy/`):**
    - Reproduce the exact 5-hook `useEffect` cascade between `LegacyInputField.jsx` and `LegacySimpleForm.jsx` from the Lab 4 specification[cite: 4]:
      1. `useEffect #1`: `syncToParent()` (in `InputField`)[cite: 4]
      2. `useEffect #2`: `validateField()` (in `SimpleForm`)[cite: 4]
      3. `useEffect #3`: `calcFormValidity()` (in `SimpleForm`)[cite: 4]
      4. `useEffect #4`: `syncErrorsToChild()` (in `SimpleForm`)[cite: 4]
      5. `useEffect #5`: `autoScrollToError()` (in `InputField`)[cite: 4]
    - Emit clear execution trace logs (`console.log` + on-screen trace log) proving `CASCADE DETECTED: 5 re-renders / 1 keypress` and warning about Race Conditions & `Maximum update depth exceeded`[cite: 4].
  - **Part B — Refactored React 19 Pattern (`refactored/`):**
    - Eliminate ALL `useEffect` state-synchronization chains in `RefactoredInputField.jsx` and `RefactoredSimpleForm.jsx`.
    - Compute field validation errors and `isFormValid` purely as **derived state during render** (or inside `onChange` / `onSubmit` event handlers), achieving **1 single render cycle per keystroke**.

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
        ├── utils/
        │   └── validation.js
        ├── components/
        │   ├── legacy/
        │   │   ├── LegacyInputField.jsx
        │   │   └── LegacySimpleForm.jsx
        │   └── refactored/
        │       ├── RefactoredInputField.jsx
        │       └── RefactoredSimpleForm.jsx
        └── App.jsx

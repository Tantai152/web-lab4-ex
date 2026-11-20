# PROJECT RULES - LAB 4 (EXERCISES 1.2, 1.2.1 & 1.2.2)
**Topic:** Declarative Syntax Updates, React Router v7 Layout Architecture & Master-Detail Views

## 1. Workflow & Anti-Monolithic Constraints
- **Atomic Execution:** Strictly execute ONE task and output ONE file per prompt as defined in `TASK_DECOMPOSITION.md`.
- **No Monolithic Code:** Separate Layout, Pages, Components, and Mock Data into dedicated files. Never cram everything into `App.jsx`.
- **No Unsolicited Files:** Do not generate extra files outside the defined directory structure.

## 2. Tech Stack & Coding Standards
- **Framework:** React 19 + Vite (JavaScript `.jsx`).
- **Routing Library:** React Router v7 (`react-router` package, importing `{ BrowserRouter, Routes, Route, NavLink, Outlet, useParams, Link }`).
- **Components:** 100% Functional Components.

## 3. Architectural & Lab 1.2 / 1.2.1 / 1.2.2 Requirements
- **Declarative Router v7 Syntax (1.2 & 1.2.1):**
  - Replace legacy `<Switch>` with `<Routes>` and `component={...}` with `element={<Component />}`.
  - Implement a shared `Layout` component rendering navigation links and `<Outlet />` for nested child routes (`/`, `/about`, `/people`, `/people/:id`).
  - Use `<NavLink>` with functional callback styling `className={({ isActive }) => (isActive ? 'active' : '')}` for active route highlighting.
- **Master-Detail & CSS Grid (1.2.2):**
  - Build a responsive Master-Detail layout using `grid-template-columns: minmax(280px, 1fr) 2fr`.
  - Extract dynamic route `:id` safely via `useParams()`.
  - Locate entity via `people.find((p) => p.id === id)` and render `<NotFoundState />` when the ID is invalid.
  - Render entity attributes inside `PersonDetail.jsx` using semantic HTML definition lists (`<dl>`, `<dt>`, `<dd>`).

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
        ├── data/
        │   └── people.js
        ├── components/
        │   ├── Layout.jsx
        │   └── NotFoundState.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── About.jsx
        │   ├── PeopleLayout.jsx
        │   └── PersonDetail.jsx
        └── App.jsx

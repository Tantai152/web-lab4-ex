```markdown
# TASK DECOMPOSITION - EXERCISE 1.2 (1.2, 1.2.1 & 1.2.2)

Execute each task sequentially (1 prompt = 1 task). Mark `[x]` once verified.

- [ ] **Task 1: Project Scaffold with React Router v7 (`client/package.json`, `client/vite.config.js`, `client/index.html`, `client/src/main.jsx`)**
  - Setup Vite + React 19 + `react-router` (`^7.0.0`) wrapped in `<BrowserRouter>`.
- [ ] **Task 2: Layout, Active NavLink & Master-Detail CSS Grid (`client/src/index.css`)**
  - Style navigation bar with `.active` NavLink highlight, semantic `<dl>/<dt>/<dd>` styling, and responsive Master-Detail grid (`grid-template-columns: minmax(280px, 1fr) 2fr`).
- [ ] **Task 3: People Dataset (`client/src/data/people.js`)**
  - Export an array of realistic person objects with string `id`s for `people.find()` matching.
- [ ] **Task 4: Shared Root Layout with `<Outlet />` & `<NavLink>` (`client/src/components/Layout.jsx`)**
  - Build the top-level layout using functional `NavLink` active class callbacks and `<Outlet />`.
- [ ] **Task 5: 404 Not Found Fallback Component (`client/src/components/NotFoundState.jsx`)**
  - Create a clean fallback state rendered when an invalid `:id` is requested.
- [ ] **Task 6: Static Route Pages (`client/src/pages/Home.jsx` & `client/src/pages/About.jsx`)**
  - Create concise `Home` and `About` pages to verify nested `<Outlet />` routing and active `NavLink` states.
- [ ] **Task 7: Master-Detail Container (`client/src/pages/PeopleLayout.jsx`)**
  - Build the Master list sidebar + `<Outlet />` detail pane using CSS Grid (`minmax(280px, 1fr) 2fr`).
- [ ] **Task 8: Detail View with `useParams()` & Semantic `<dl>` (`client/src/pages/PersonDetail.jsx`)**
  - Extract `id` via `useParams()`, lookup via `people.find()`, render `<NotFoundState />` if missing, and display fields using `<dl>`, `<dt>`, and `<dd>`.
- [ ] **Task 9: Declarative Route Tree (`client/src/App.jsx`)**
  - Wire `<Routes>`, `<Route element={<Layout />}>`, nested index/about routes, and nested `/people` + `:id` routes.

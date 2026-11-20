import { Routes, Route } from 'react-router';

import Layout from './components/Layout.jsx';
import NotFoundState from './components/NotFoundState.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import PeopleLayout from './pages/PeopleLayout.jsx';
import PersonDetail from './pages/PersonDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Exercise 1.2: Home Page */}
        <Route index element={<Home />} />

        {/* Exercise 1.2.1: About Page */}
        <Route path="about" element={<About />} />

        {/* Exercise 1.2.2: Master-Detail People Directory */}
        <Route path="people" element={<PeopleLayout />}>
          <Route
            index
            element={
              <p className="select-prompt">
                Select a person from the directory to view details.
              </p>
            }
          />

          <Route path=":id" element={<PersonDetail />} />
        </Route>

        {/* 404: Unknown Routes */}
        <Route
          path="*"
          element={<NotFoundState message="404 — Page not found." />}
        />
      </Route>
    </Routes>
  );
}

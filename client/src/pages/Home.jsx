import { Link } from 'react-router';

export default function Home() {
  return (
    <section>
      <h1>Welcome to Lab 4</h1>

      <h2>Multi-Route SPA Architecture</h2>

      <p>
        This exercise explores modern client-side routing using React Router
        v7 and React 19. It demonstrates how to build a Single Page Application
        with declarative routing, shared layouts, and nested routes.
      </p>

      <p>
        Key upgrades include replacing the legacy <code>Switch</code> component
        with <code>Routes</code>, using the <code>element</code> prop to render
        route components, and implementing nested layouts with
        <code> Outlet</code>.
      </p>

      <Link to="/people" className="person-link">
        Explore People Directory
      </Link>
    </section>
  );
}

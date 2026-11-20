import { NavLink, Outlet } from 'react-router';

function Layout() {
  return (
    <div className="app-container">
      <header>
        <nav className="main-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            About
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            People Directory
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

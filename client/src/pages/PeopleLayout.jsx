import { NavLink, Outlet } from 'react-router';
import { people } from '../data/people.js';

export default function PeopleLayout() {
  return (
    <div className="master-detail-grid">
      {/* Master: People Directory Sidebar */}
      <aside className="master-sidebar">
        <h2>People Directory</h2>

        <ul className="person-list">
          {people.map((person) => (
            <li key={person.id}>
              <NavLink
                to={`/people/${person.id}`}
                className={({ isActive }) =>
                  `person-link ${isActive ? 'active' : ''}`
                }
              >
                <strong>{person.name}</strong>
                <br />
                <span>{person.role}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Detail: Selected Person Content */}
      <section className="detail-pane">
        <Outlet />
      </section>
    </div>
  );
}

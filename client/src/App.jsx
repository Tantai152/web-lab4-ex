
import { Suspense, lazy, useState } from 'react';
import Skeleton from './components/Skeleton.jsx';

// Controlled delay to make the Suspense fallback visible in DevTools.
const PersonDetail = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./pages/PersonDetail.jsx'));
    }, 1500);
  })
);

// Sample profiles for demonstrating dynamic content.
const people = [
  {
    name: 'Nguyen Van An',
    role: 'Software Architect',
    initials: 'NA',
    bio: 'Software Architect and Information Systems researcher at the University of Information Technology (UIT). Focuses on software architecture, distributed systems, and building scalable applications.',
    department: 'Information Systems',
    email: 'an.nguyen@uit.edu.vn',
    location: 'Ho Chi Minh City',
    id: 'UIT2024001',
  },
  {
    name: 'Tran Thi Minh',
    role: 'Frontend Developer',
    initials: 'TM',
    bio: 'Frontend Developer specializing in modern web technologies, React applications, user interface engineering, and accessible digital experiences.',
    department: 'Software Engineering',
    email: 'minh.tran@uit.edu.vn',
    location: 'Ho Chi Minh City',
    id: 'UIT2024002',
  },
  {
    name: 'Le Hoang Nam',
    role: 'Backend Developer',
    initials: 'LN',
    bio: 'Backend Developer focusing on distributed systems, database architecture, API development, and reliable cloud-based applications.',
    department: 'Computer Science',
    email: 'nam.le@uit.edu.vn',
    location: 'Ho Chi Minh City',
    id: 'UIT2024003',
  },
];

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(0);

  const toggleDetail = () => {
    setIsVisible((previous) => !previous);
  };

  const handlePersonChange = (event) => {
    setSelectedPerson(Number(event.target.value));
  };

  return (
    <main className="app-container">
      {/* Application Header */}
      <header className="app-header">
        <h1>Lab 4 - Exercise 1.1</h1>

        <button
          type="button"
          className="btn btn-primary"
          onClick={toggleDetail}
        >
          {isVisible ? 'Hide Detail' : 'Load Person Detail'}
        </button>
      </header>

      {/* Profile Selection */}
      {isVisible && (
        <div
          style={{
            width: '100%',
            maxWidth: '760px',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <label
            htmlFor="person-select"
            style={{ fontWeight: 600, fontSize: '14px' }}
          >
            Select Person:
          </label>

          <select
            id="person-select"
            value={selectedPerson}
            onChange={handlePersonChange}
            style={{
              height: '40px',
              padding: '0 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              fontSize: '14px',
            }}
          >
            {people.map((person, index) => (
              <option key={person.id} value={index}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Lazy Loading & Suspense Boundary */}
      {isVisible && (
        <Suspense fallback={<Skeleton />}>
          <PersonDetail person={people[selectedPerson]} />
        </Suspense>
      )}
    </main>
  );
}

import { useParams } from 'react-router';
import { people } from '../data/people.js';
import NotFoundState from '../components/NotFoundState.jsx';

export default function PersonDetail({ people: peopleList = people }) {
  const { id } = useParams();

  const person = peopleList.find((p) => p.id === id);

  if (!person) {
    return (
      <NotFoundState message={`No person found with ID "${id}".`} />
    );
  }

  return (
    <div>
      <h2>Person Details</h2>

      <dl className="person-details">
        <dt>Name</dt>
        <dd>{person.name}</dd>

        <dt>Role</dt>
        <dd>{person.role}</dd>

        <dt>Department</dt>
        <dd>{person.department}</dd>

        <dt>Email</dt>
        <dd>{person.email}</dd>

        <dt>Location</dt>
        <dd>{person.location}</dd>

        <dt>Bio</dt>
        <dd>{person.bio}</dd>
      </dl>
    </div>
  );
}

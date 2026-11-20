import { Link } from 'react-router';

export default function NotFoundState({ message = "Person not found." }) {
  return (
    <div className="not-found-card" role="alert">
      <h2>404 - Not Found</h2>

      <p>{message}</p>

      <Link to="/people">
        Back to People Directory
      </Link>
    </div>
  );
}

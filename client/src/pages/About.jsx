export default function About() {
  return (
    <section>
      <h1>About Lab 4</h1>

      <p>
        This lab demonstrates the architectural improvements introduced in
        Exercises 1.2, 1.2.1, and 1.2.2 using React Router v7.
      </p>

      <h2>Exercise 1.2 - Declarative Routing</h2>
      <p>
        Replaced the legacy <code>Switch</code> component with
        <code> Routes</code> and replaced the <code>component</code> prop
        with <code>element</code> to render route components declaratively.
      </p>

      <h2>Exercise 1.2.1 - Shared Layout & Nested Routes</h2>
      <p>
        Implemented a shared Layout component using nested routes and
        <code> Outlet</code>. Navigation uses <code>NavLink</code> with
        functional <code>className</code> callbacks to highlight the active
        route automatically.
      </p>

      <h2>Exercise 1.2.2 - Master-Detail Architecture</h2>
      <p>
        Implemented a responsive Master-Detail interface using CSS Grid.
        Dynamic route parameters are extracted using <code>useParams()</code>,
        while entity information is displayed through semantic HTML definition
        lists: <code>dl</code>, <code>dt</code>, and <code>dd</code>.
      </p>

      <h2>Learning Objectives</h2>
      <ul>
        <li>Understand declarative routing in React Router v7.</li>
        <li>Build reusable layouts with nested routes and Outlet.</li>
        <li>Implement active navigation using NavLink callbacks.</li>
        <li>Handle dynamic URL parameters safely.</li>
        <li>Build responsive Master-Detail layouts with CSS Grid.</li>
      </ul>
    </section>
  );
}

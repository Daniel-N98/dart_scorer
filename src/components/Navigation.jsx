import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <section id="navigation-section">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/games" className="nav-link">
        Games
      </Link>
    </section>
  );
}

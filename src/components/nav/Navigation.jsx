import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./navigation.css";

export default function Navigation() {
  const [user] = useAuthState(getAuth());

  return (
    <section id="navigation-section">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/games" className="nav-link">
        Games
      </Link>
      <Link to="/account" className="nav-link">
        {user ? "Account" : "Register/Sign-in"}
      </Link>
    </section>
  );
}

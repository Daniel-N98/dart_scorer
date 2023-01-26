import { Link } from "react-router-dom";
import "./navigation.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Navigation() {
  const { currentUser } = useContext(UserContext);

  return (
    <section id="navigation-section" className="d-flex justify-content-center ">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/games" className="nav-link">
        Games
      </Link>
      <Link to="/account" className="nav-link">
        {currentUser ? "Account" : "Register/Sign-in"}
      </Link>
    </section>
  );
}

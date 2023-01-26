import Register from "../components/auth/Register.jsx";
import SignIn from "../components/auth/SignIn.jsx";
import Logout from "../components/auth/Logout.jsx";
import Profile from "../components/auth/Profile.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import { useContext } from "react";

export default function Account() {
  const { currentUser } = useContext(UserContext);

  return (
    <section id="account-page">
      {currentUser ? (
        <div>
          <h2>Profile</h2>
          <Profile />
          <Logout />
        </div>
      ) : (
        <div className="d-flex flex-column gap-5">
          <Register />
          <SignIn />
        </div>
      )}
    </section>
  );
}

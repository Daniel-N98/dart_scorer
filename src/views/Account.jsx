import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Register from "../components/auth/Register.jsx";
import SignIn from "../components/auth/SignIn.jsx";
import Logout from "../components/auth/Logout.jsx";
import Profile from "../components/auth/Profile.jsx";

export default function Account() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section id="account-page">
      {user ? (
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

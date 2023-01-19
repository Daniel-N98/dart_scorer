import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Register from "../components/online/Register.jsx";
import SignIn from "../components/online/SignIn.jsx";
import Logout from "../components/online/Logout";
import Profile from "../components/online/Profile.jsx";

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
        <div>
          <Register />
          <SignIn />
        </div>
      )}
    </section>
  );
}

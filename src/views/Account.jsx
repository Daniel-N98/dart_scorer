import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Register from "../components/Register.jsx";
import SignIn from "../components/SignIn.jsx";
import Logout from "../components/Logout";

export default function Account() {
  const [user, loading] = useAuthState(getAuth());
  if (loading) return <h2>Loading...</h2>;

  return (
    <section id="account-page">
      {user ? (
        <div>
          <h2>Profile</h2>
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

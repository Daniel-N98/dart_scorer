import { signOutUser } from "../../firebase/userAuth.js";
import { auth } from "../../firebase/firebase.js";
export default function Logout() {
  const handleClick = (e) => {
    e.preventDefault();
    signOutUser(auth);
  };

  return (
    <button id="logout-btn" onClick={(e) => handleClick(e)}>
      Sign out
    </button>
  );
}

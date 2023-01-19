import { signOutUser } from "../../firebase/userAuth.js";

export default function Logout() {
  const handleClick = (e) => {
    e.preventDefault();
    signOutUser();
  };

  return (
    <button id="logout-btn" onClick={(e) => handleClick(e)}>
      Sign out
    </button>
  );
}

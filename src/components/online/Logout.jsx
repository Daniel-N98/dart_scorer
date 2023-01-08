import { getAuth, signOut } from "firebase/auth";

export default function Logout() {
  const handleClick = (e) => {
    e.preventDefault();
    signOut(getAuth());
  };

  return (
    <button id="logout-btn" onClick={(e) => handleClick(e)}>
      Sign out
    </button>
  );
}

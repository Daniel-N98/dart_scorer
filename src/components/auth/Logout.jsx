import Button from "react-bootstrap/Button";
import { signOutUser } from "../../firebase/userAuth.js";

export default function Logout() {
  const handleClick = (e) => {
    e.preventDefault();
    signOutUser();
  };

  return (
    <Button id="logout-btn" variant="danger" onClick={(e) => handleClick(e)}>
      Sign out
    </Button>
  );
}

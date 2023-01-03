import { createOnlineGame, gameExists } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CreateOnlineMatch() {
  const [user] = useAuthState(getAuth());

  const handleClick = async (e) => {
    e.preventDefault();
    const matchExists = await gameExists(user);
    if (!matchExists) {
      createOnlineGame();
    } else {
      alert("Match already exists");
    }
  };

  return (
    <section id="create-online-match">
      <button onClick={(e) => handleClick(e)}>Create match</button>
    </section>
  );
}

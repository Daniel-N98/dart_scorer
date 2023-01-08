import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { gameExists } from "../../firebase";
import CreateOnlineMatch from "./CreateOnlineMatch";
import JoinOnlineMatch from "./JoinOnlineMatch";

export default function OnlineMatch() {
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    async function checkForMatch() {
      const matchID = await gameExists(user);
      if (matchID) {
        document.location.href = `/games/online/${matchID}/waiting`;
      }
    }
    checkForMatch();
  });

  return (
    <section id="online-match">
      <h1>Online games</h1>
      <CreateOnlineMatch />
      <JoinOnlineMatch />
    </section>
  );
}

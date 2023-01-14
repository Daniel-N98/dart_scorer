import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { gameExists } from "../../firebase";
import CreateOnlineMatch from "./CreateOnlineMatch";
import JoinOnlineMatch from "./JoinOnlineMatch";

export default function OnlineMatch() {
  const [user, loading] = useAuthState(getAuth());

  useEffect(() => {
    async function checkForMatch() {
      const matchID = await gameExists(user);
      if (matchID) {
        document.location.href = `/games/online/${matchID}/waiting`;
      }
    }
    checkForMatch();
  });

  if (loading) return <h2>Loading</h2>;

  return (
    <section id="online-match">
      <h1>Online games</h1>
      {user ? (
        <div className="d-flex flex-column justify-content-center online-game">
          <CreateOnlineMatch />
          <JoinOnlineMatch />
        </div>
      ) : (
        <h3>You must be signed in to play online matches.</h3>
      )}
    </section>
  );
}

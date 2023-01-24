import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { gameExists } from "../../firebase/utilFunctions.js";
import { auth } from "../../firebase/firebase.js";
import CreateOnlineMatch from "./CreateOnlineMatch";
import JoinOnlineMatch from "./JoinOnlineMatch";
import ViewOnlineMatches from "./ViewOnlineMatches.jsx";

export default function OnlineMatch() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    async function checkForMatch() {
      const { gameID, join_code } = (await gameExists(user)) || {};
      if (gameID) {
        document.location.href = `/games/online/${gameID}/waiting/${
          join_code ? join_code : "public"
        }`;
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
          <ViewOnlineMatches />
        </div>
      ) : (
        <h3>You must be signed in to play online matches.</h3>
      )}
    </section>
  );
}

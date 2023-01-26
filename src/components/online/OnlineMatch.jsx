import { useEffect } from "react";
import { gameExists } from "../../firebase/utilFunctions.js";
import CreateOnlineMatch from "./CreateOnlineMatch";
import JoinOnlineMatch from "./JoinOnlineMatch";
import ViewOnlineMatches from "./ViewOnlineMatches.jsx";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

export default function OnlineMatch() {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function checkForMatch() {
      const { gameID, join_code } = (await gameExists(currentUser)) || {};
      if (gameID) {
        document.location.href = `/games/online/${gameID}/waiting/${
          join_code ? join_code : "public"
        }`;
      }
    }
    checkForMatch();
  });

  return (
    <section id="online-match">
      <h1>Online games</h1>
      {currentUser ? (
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

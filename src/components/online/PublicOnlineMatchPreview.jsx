import { useState } from "react";
import updateGameDocument from "../../firebase/utilFunctions";

export default function PublicOnlineMatchPreview({ match }) {
  const { gameID, start_score, sets, legs, p1 } = match;
  const [isAvailable, setIsAvailable] = useState(true);

  async function handleClick() {
    const joined = await updateGameDocument(gameID);
    if (joined) {
      document.location.href = `/games/online/${gameID}`;
    } else {
      setIsAvailable(false);
    }
  }

  return (
    <section>
      {isAvailable ? (
        <div>
          <h2>Player: {p1.name}</h2>
          <div>
            <p>Start score: {start_score}</p>
            <p>Sets: {sets}</p>
            <p>Legs: {legs}</p>
          </div>
          <button onClick={handleClick}>Join this game</button>
        </div>
      ) : null}
    </section>
  );
}

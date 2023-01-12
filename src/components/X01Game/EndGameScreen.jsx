import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFinishedMatch } from "../../firebase";

export default function EndGameScreen() {
  const [gameRef, setGameRef] = useState();
  const { gameID } = useParams();

  useEffect(() => {
    async function fetchGameRef() {
      const match = await getFinishedMatch(gameID, "completed_games");
      setGameRef(match);
    }
    fetchGameRef();
  }, [gameID]);

  return (
    <section id="end-game-section">
      {gameRef ? (
        <div>
          <h3>The game has finished</h3>
          <h3>{gameRef.winner} has won the game!</h3>
          <h4>{gameRef.p1.name}</h4>
          <p>Sets: {gameRef.p1.sets}</p>
          <p>Darts: {gameRef.p1.dart_scores.join(", ")}</p>
          <h4>{gameRef.p2.name}</h4>
          <p>Sets: {gameRef.p2.sets}</p>
          <p>Darts: {gameRef.p2.dart_scores.join(", ")}</p>
        </div>
      ) : (
        "Nothing here.."
      )}
    </section>
  );
}

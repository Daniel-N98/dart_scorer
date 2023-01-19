import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFinishedMatch } from "../../../firebase/utilFunctions.js";
import PlayerEndGameResults from "./PlayerEndGameResults";

export default function EndGameScreen() {
  const [gameRef, setGameRef] = useState();
  const { gameID } = useParams();

  const calculateAverage = (scores) => {
    Object.keys(scores).reduce((sum, next) => sum + scores[next], 0);
  };

  useEffect(() => {
    async function fetchGameRef() {
      const match = await getFinishedMatch(gameID, "completed_games");
      match.p1.avg = calculateAverage(match.p1.dart_scores);
      match.p2.avg = calculateAverage(match.p2.dart_scores);
      setGameRef(match);
    }
    fetchGameRef();
  }, [gameID]);

  return (
    <section id="end-game-section">
      {gameRef ? (
        <div>
          <h3>{gameRef.winner} has won the game!</h3>
          <div id="player-results" className="d-flex" style={{ width: "100%" }}>
            <PlayerEndGameResults player={gameRef.p1} />
            <PlayerEndGameResults player={gameRef.p2} />
          </div>
        </div>
      ) : (
        "Nothing here.."
      )}
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDocumentById,
  getDocumentIdByPropertyValue,
  updateDocument,
  updatePlayerWinsLosses,
} from "../../../firebase/utilFunctions.js";
import PlayerEndGameResults from "./PlayerEndGameResults";

export default function EndGameScreen() {
  const [gameRef, setGameRef] = useState();
  const { gameID } = useParams();

  const calculateAverage = (scores) => {
    Object.keys(scores).reduce((sum, next) => sum + scores[next], 0);
  };

  useEffect(() => {
    async function fetchGameRef() {
      const match = await getDocumentById("completed_games", gameID, "gameID");
      match.p1.avg = calculateAverage(match.p1.dart_scores);
      match.p2.avg = calculateAverage(match.p2.dart_scores);
      setGameRef(match);
    }
    fetchGameRef();
  }, [gameID]);

  useEffect(() => {
    if (!gameRef || gameRef.stat_received) return;
    async function updateWinsAndLosses() {
      if (gameRef.p1.name === gameRef.winner) {
        await updatePlayerWinsLosses({
          winnerUid: gameRef.p1.uid,
          loserUid: gameRef.p2.uid,
        });
      } else {
        await updatePlayerWinsLosses({
          winnerUid: gameRef.p2.uid,
          loserUid: gameRef.p1.uid,
        });
      }
      const colId = await getDocumentIdByPropertyValue(
        "completed_games",
        "gameID",
        gameRef.gameID
      );
      await updateDocument(
        "completed_games",
        colId,
        { stat_received: true },
        true
      );
    }
    updateWinsAndLosses();
  }, [gameRef]);
  return (
    <section id="end-game-section">
      {gameRef ? (
        <React.Fragment>
          <h3>{gameRef.winner} has won the game!</h3>
          <div
            id="player-results"
            className="d-flex flex-column align-items-center gap-4"
            style={{ width: "100%" }}
          >
            <PlayerEndGameResults player={gameRef.p1} />
            <PlayerEndGameResults player={gameRef.p2} />
          </div>
        </React.Fragment>
      ) : (
        "Nothing here.."
      )}
    </section>
  );
}

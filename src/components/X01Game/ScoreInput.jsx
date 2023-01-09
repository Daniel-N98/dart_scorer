import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import {
  addMatchToCompletedGames,
  deleteGameDocument,
  updatePlayerDocument,
  updatePlayerScore,
} from "../../firebase";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Submit"];

export default function ScoreInput({ gameRef }) {
  const [user] = useAuthState(getAuth());
  const [typedScore, setTypedScore] = useState("");
  const { gameID } = useParams();
  const { sets, legs, turn } = gameRef;

  const updateScore = async (input) => {
    if (gameRef[turn].uid !== user.uid) {
      return;
    }

    if (input === "Clear") {
      setTypedScore("");
      return;
    }

    if (Number(typedScore) > 180) {
      return;
    }

    if (typedScore.length < 3) {
      setTypedScore((typedScore) => typedScore + input);
    }

    if (input === "Submit") {
      const { sets: pSets, legs: pLegs, score: pScore, name } = gameRef[turn];
      const remainingScore = pScore - typedScore;
      setTypedScore("");
      if (remainingScore < 0 || remainingScore === 1) {
        return;
      }
      // Handle round win logic
      if (remainingScore === 0) {
        const updateObj = {
          p1: { score: gameRef.start_score },
          p2: { score: gameRef.start_score },
        };
        if (pLegs + 1 === legs) {
          if (pSets + 1 === sets) {
            alert(`Game has been won! by ${name}`);
            await updatePlayerDocument(gameID, {
              gameID,
              status: "finished",
              winner: name,
            });
            await addMatchToCompletedGames(gameID);
            await deleteGameDocument(gameID);
            document.location.href = "/";
            return;
          } else {
            updateObj[turn].sets = pSets + 1;
            updateObj[turn].legs = 0;
            updateObj[turn === "p1" ? "p2" : "p1"].legs = 0;
          }
        } else {
          updateObj[turn].legs = pLegs + 1;
        }
        updateObj.turn = turn === "p1" ? "p2" : "p1";
        updatePlayerDocument(gameID, updateObj);
      } else {
        await updatePlayerScore(remainingScore, gameID);
      }
    }
  };

  return (
    <section id="scorer-input-section">
      <h3 id="typed-score">{typedScore}</h3>
      <div id="scorer-input">
        {numbers.map((number) => (
          <button
            className="number-grid-input"
            key={number}
            onClick={() => updateScore(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
}

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
  const { turn } = gameRef;

  const updateScore = async (input) => {
    // Initial score validation
    if (
      !validateScore(gameRef, user, input, typedScore, setTypedScore) ||
      input === "Clear"
    ) {
      setTypedScore("");
      return;
    }

    // Update typedScore state with digit input
    if (typedScore.length < 3) {
      setTypedScore((typedScore) => typedScore + input);
    }

    // Submit score to document
    if (input === "Submit") {
      const remainingScore = gameRef[turn].score - typedScore;
      const tempTypedScore = typedScore;
      setTypedScore("");
      await handleUpdateScore({
        tempTypedScore,
        gameRef,
        remainingScore,
        gameID,
      });
    }
  };

  return (
    <section id="scorer-input-section" style={{ marginTop: "5px" }}>
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

function validateScore(gameRef, user, typedScore) {
  const { turn } = gameRef;

  // Not the users turn, false
  if (gameRef[turn].uid !== user.uid) {
    return false;
  }
  // Too many points, false
  if (Number(typedScore) > 180) {
    return false;
  }

  // Score validated, true
  return true;
}

async function handleUpdateScore({
  tempTypedScore: score,
  gameRef,
  remainingScore,
  gameID,
}) {
  const { turn, sets, legs, start_score } = gameRef;
  const { sets: pSets, legs: pLegs, name } = gameRef[turn];

  // Remaining score is invalid
  if (remainingScore < 0 || remainingScore === 1 || remainingScore === "") {
    return;
  }
  // Adds darts score to dart_scores
  await updatePlayerScore(gameID, score);
  const updateObject = {};
  let setWon = false;
  // Remaining score is valid, leg, set or match has been won.
  if (remainingScore === 0) {
    updateObject.p1 = { score: start_score };
    updateObject.p2 = { score: start_score };
    // Player has reached the total number of legs in the set
    if (pLegs + 1 === legs) {
      // Reset both users legs to 0
      updateObject.p1.legs = 0;
      updateObject.p2.legs = 0;
      setWon = true;
      updateObject[turn].sets = pSets + 1; // Increase set winners sets by 1
    } else {
      updateObject[turn].legs = pLegs + 1; // Increase leg winners legs by 1
    }

    // Player has reached the total number of sets required to win the match
    if (setWon && pSets + 1 === sets) {
      // Add properties required for the end of the match
      updateObject.winner = name;
      updateObject.status = "finished";
      updateObject.gameID = gameID;
    }
  } else {
    // Update players score to the remaining score.
    updateObject[turn] = { score: remainingScore };
  }
  updateObject.turn = turn === "p1" ? "p2" : "p1";
  await sendUpdate(updateObject, gameID); // Update the players score within the match document
}

const sendUpdate = async (updateObject, gameID) => {
  await updatePlayerDocument(gameID, updateObject);
  // Match has been won
  if (updateObject.status === "finished") {
    // Move document to games_finished collection, and delete from games collection
    try {
      await addMatchToCompletedGames(gameID);
      await deleteGameDocument(gameID);
    } catch (error) {
      console.error("Unable to complete request", error);
      return;
    }
    // Alter the URL to load the end game screen
    document.location.href = `/games/online/${gameID}/finished`;
  }
};

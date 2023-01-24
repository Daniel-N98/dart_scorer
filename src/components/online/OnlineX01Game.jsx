import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addMatchToCompletedGames,
  deleteGameDocument,
  updateDocument,
} from "../../firebase/utilFunctions.js";
import { db, auth } from "../../firebase/firebase.js";
import ScoreScreen from "../X01Game/ScoreScreen";
import "../styles/x01Game.css";
import ScoreInput from "../X01Game/ScoreInput";
import { useAuthState } from "react-firebase-hooks/auth";

export default function OnlineX01Game() {
  const [user] = useAuthState(auth);
  const { gameID } = useParams();
  const [gameRef, setGameRef] = useState();
  const [loading, setLoading] = useState(false);
  const [typedScore, setTypedScore] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
      if (!doc.data()) {
        document.location.href = `/games/online/${gameID}/finished`;
        unsub();
        return;
      }
      setGameRef(doc.data());
      setLoading(false);
    });
  }, [gameID]);

  useEffect(() => {
    const { turn } = gameRef || {};
    if (!gameRef || gameRef[turn].uid !== user.uid) {
      setTypedScore("");
      return;
    }

    if (typedScore > 180 || typedScore === "") {
      setTypedScore("");
      return;
    }

    async function handleScoreUpdate() {
      await updateScore({
        tempTypedScore: typedScore,
        gameRef,
        remainingScore: gameRef[turn].score - typedScore,
        gameID,
      });
      setTypedScore("");
    }
    handleScoreUpdate();
  }, [typedScore]);

  if (loading) return <h2>Loading</h2>;

  return (
    <div className="mt-3">
      {gameRef ? (
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between m-auto player-scores">
            <ScoreScreen gameRef={gameRef} player="p1" />
            <ScoreScreen gameRef={gameRef} player="p2" />
          </div>
          <ScoreInput setTypedScore={setTypedScore} />
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

async function updateScore({
  tempTypedScore: score,
  gameRef,
  remainingScore,
  gameID,
}) {
  const { turn, sets, legs, start_score, leg_start } = gameRef;
  const { sets: pSets, legs: pLegs, name, dart_scores } = gameRef[turn];
  const { sets: p2Sets, legs: P2legs } = gameRef[turn === "p1" ? "p2" : "p1"];
  const currentSet = `set${pSets + p2Sets + 1}`;
  const currentLeg = `leg${pLegs + P2legs + 1}`;
  let currentScores = false;
  if (dart_scores[currentSet] && dart_scores[currentSet][currentLeg]) {
    currentScores = dart_scores[currentSet][currentLeg];
  }
  // Remaining score is invalid
  if (remainingScore < 0 || remainingScore === 1 || remainingScore === "") {
    return;
  }
  // Adds darts score to dart_scores
  await updateDocument(
    "games",
    gameID,
    {
      [turn]: {
        dart_scores: {
          [currentSet]: {
            [currentLeg]: currentScores ? [...currentScores, score] : [score],
          },
        },
      },
    },
    true
  );
  const updateObject = {};
  let setWon = false;
  // Remaining score is valid, leg, set or match has been won.
  if (remainingScore === 0) {
    updateObject.p1 = { score: start_score };
    updateObject.p2 = { score: start_score };
    updateObject.leg_start = leg_start === "p1" ? "p2" : "p1";
    updateObject.turn = updateObject.leg_start;
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
    updateObject.turn = turn === "p1" ? "p2" : "p1";
  }
  await sendUpdate(updateObject, gameID); // Update the players score within the match document
}

const sendUpdate = async (updateObject, gameID) => {
  await updateDocument("games", gameID, updateObject, true);
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

import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, deleteGameDocument } from "../../firebase";
import ScoreInput from "../X01Game/ScoreInput";
import ScoreScreen from "../X01Game/ScoreScreen";
import "../styles/x01Game.css";

export default function OnlineX01Game() {
  const { gameID } = useParams();
  const [gameRef, setGameRef] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
      if (!doc.data()) {
        document.location.href = "/";
        unsub();
        return;
      }
      setGameRef(doc.data());
      setLoading(false);
    });
  }, [gameID]);

  const handleLeaveGame = async (e) => {
    e.preventDefault();
    document.location.href = "/";
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {gameRef ? (
        <section id="online-game-screen">
          <button onClick={(e) => handleLeaveGame(e)}>Leave game</button>
          <div id="online-game-score-screens">
            <ScoreScreen player={gameRef.p1} />
            <ScoreScreen player={gameRef.p2} />
          </div>
          <ScoreInput gameRef={gameRef} />
        </section>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

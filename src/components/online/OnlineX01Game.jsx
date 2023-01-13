import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
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
        document.location.href = `/games/online/${gameID}/finished`;
        unsub();
        return;
      }
      setGameRef(doc.data());
      setLoading(false);
    });
  }, [gameID]);

  if (loading) return <h2>Loading</h2>;

  return (
    <div className="mt-3">
      {gameRef ? (
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between m-auto player-scores">
            <ScoreScreen gameRef={gameRef} player="p1" />
            <ScoreScreen gameRef={gameRef} player="p2" />
          </div>
          <ScoreInput gameRef={gameRef} />
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

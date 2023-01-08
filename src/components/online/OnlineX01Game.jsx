import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import ScoreInput from "../X01Game/ScoreInput";
import ScoreScreen from "../X01Game/ScoreScreen";

export default function OnlineX01Game() {
  const { gameID } = useParams();
  const [gameRef, setGameRef] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
      setGameRef(doc.data());
      setLoading(false);
    });
  }, [gameID]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {gameRef ? (
        <div>
          <ScoreScreen player={gameRef.p1} />
          <ScoreScreen player={gameRef.p2} />
          <ScoreInput gameRef={gameRef} />
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

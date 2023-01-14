import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, deleteGameDocument } from "../../firebase";
import { useEffect } from "react";

export default function WaitingForMatch() {
  const { gameID, join_code } = useParams();

  const watchDocument = (gameID) => {
    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
      if (doc.data().p2) {
        document.location.href = `/games/online/${gameID}`;
        unsub();
      }
    });
  };

  const handleClick = async () => {
    await deleteGameDocument(gameID);
    document.location.href = "/games/online/";
  };

  useEffect(() => {
    watchDocument(gameID);
  }, [gameID]);

  return (
    <div>
      <h2>Waiting for opponent</h2>
      <p>Share the code below with a friend</p>
      <h3>Join code: {join_code}</h3>
      <button onClick={() => handleClick()}>Cancel</button>
    </div>
  );
}

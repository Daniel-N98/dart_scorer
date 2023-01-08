import { useParams } from "react-router-dom";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

export default function WaitingForMatch() {
  const { gameID } = useParams();

  const watchDocument = (id) => {
    const unsub = onSnapshot(doc(db, "games", id), (doc) => {
      if (doc.data().p2) {
        document.location.href = `/games/online/${id}`;
        unsub();
      }
    });
  };

  const handleClick = async () => {
    const docRef = doc(db, "games", gameID);
    await deleteDoc(docRef);
    document.location.href = "/games/online";
  };

  useEffect(() => {
    watchDocument(gameID);
  }, [gameID]);

  return (
    <div>
      <h2>Waiting for opponent</h2>
      <h3>GameID: {gameID}</h3>
      <button onClick={() => handleClick()}>Cancel</button>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { deleteGameDocument } from "../../firebase/utilFunctions.js";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function WaitingForMatch() {
  const { gameID, join_code = null } = useParams();

  const watchDocument = (gameID) => {
    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
      if (doc.data() && doc.data().p2) {
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
      {join_code !== "public" ? (
        <React.Fragment>
          <p>Share the code below with a friend</p>
          <h3>Join code: {join_code}</h3>
        </React.Fragment>
      ) : (
        <h3>This match is public, anybody can join.</h3>
      )}
      <Button variant="dark" onClick={() => handleClick()}>
        Cancel
      </Button>
    </div>
  );
}

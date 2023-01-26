import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import updateGameDocument from "../../firebase/utilFunctions";

export default function PublicOnlineMatchPreview({ match }) {
  const { gameID, start_score, sets, legs, p1 } = match;
  const [isAvailable, setIsAvailable] = useState(true);

  async function handleClick() {
    const joined = await updateGameDocument(gameID);
    if (joined) {
      document.location.href = `/games/online/${gameID}`;
    } else {
      setIsAvailable(false);
    }
  }

  return (
    <Card style={{ width: "400px" }} className="m-auto border-dark p-3 mt-4">
      {isAvailable ? (
        <React.Fragment>
          <h2>Player: {p1.name}</h2>
          <React.Fragment>
            <p>Start score: {start_score}</p>
            <p>Sets: {sets}</p>
            <p>Legs: {legs}</p>
          </React.Fragment>
          <Button
            variant="primary"
            className="w-75 m-auto"
            onClick={handleClick}
          >
            Join this game
          </Button>
        </React.Fragment>
      ) : null}
    </Card>
  );
}

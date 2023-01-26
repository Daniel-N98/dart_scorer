import React from "react";
import Card from "react-bootstrap/Card";
import PlayerLegs from "./PlayerLegs";

export default function PlayerSets({ dart_scores }) {
  return (
    <React.Fragment>
      {Object.keys(dart_scores)
        .sort()
        .map((set, index) => {
          return (
            <Card key={index} className="d-flex p-3">
              <h3 style={{ color: "blue" }}>Set {index + 1}</h3>
              <PlayerLegs set={dart_scores[set]} />
            </Card>
          );
        })}
    </React.Fragment>
  );
}

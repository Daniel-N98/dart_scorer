import { Card } from "react-bootstrap";
import PlayerLegs from "./PlayerLegs";

export default function PlayerSets({ dart_scores }) {
  return (
    <div>
      {Object.keys(dart_scores)
        .sort()
        .map((set, index) => {
          return (
            <Card key={index} className="d-flex flex-column p-3">
              <h3 style={{ color: "blue" }}>Set {index + 1}</h3>
              <PlayerLegs set={dart_scores[set]} />
            </Card>
          );
        })}
    </div>
  );
}

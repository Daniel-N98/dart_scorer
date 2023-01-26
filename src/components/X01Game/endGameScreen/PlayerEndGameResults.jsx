import Card from "react-bootstrap/Card";
import PlayerSets from "./PlayerSets";

export default function PlayerEndGameResults({ player }) {
  const { dart_scores } = player;
  return (
    <Card style={{ width: "600px" }} className="p-5">
      <h4>{player.name}</h4>
      <p>
        Sets: {player.sets} | Legs: {player.legs}
      </p>
      <PlayerSets dart_scores={dart_scores} />
    </Card>
  );
}

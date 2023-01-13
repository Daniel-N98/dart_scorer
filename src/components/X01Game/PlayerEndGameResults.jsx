export default function PlayerEndGameResults({ player }) {
  return (
    <div>
      <h4>{player.name}</h4>
      <p>Sets: {player.sets}</p>
      <p>Darts: {player.dart_scores.join(", ")}</p>
      <p>3-dart avg: {player.avg}</p>
    </div>
  );
}

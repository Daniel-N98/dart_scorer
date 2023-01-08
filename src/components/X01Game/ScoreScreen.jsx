export default function ScoreScreen({ player }) {
  return (
    <div>
      <h3>{player.name}</h3>
      <p>Score: {player.score}</p>
      <p>Sets: {player.sets}</p>
      <p>Legs: {player.legs}</p>
    </div>
  );
}

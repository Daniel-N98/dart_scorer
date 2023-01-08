export default function ScoreScreen({ player }) {
  return (
    <section id="score-screen-section">
      <h3>{player.name}</h3>
      <p>Score: {player.score}</p>
      <div>
        <p>
          Sets: <span>{player.sets}</span>
        </p>
        <p>
          Legs: <span>{player.legs}</span>
        </p>
      </div>
    </section>
  );
}

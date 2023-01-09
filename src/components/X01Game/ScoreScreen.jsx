export default function ScoreScreen({ gameRef, player }) {
  const playerObj = gameRef[player];

  return (
    <div>
      <h3
        style={{
          color: gameRef[gameRef.turn].uid === playerObj.uid ? "red" : "black",
        }}
      >
        {playerObj.name}
      </h3>
      <p>Score: {playerObj.score}</p>
      <p>Sets: {playerObj.sets}</p>
      <p>Legs: {playerObj.legs}</p>
    </div>
  );
}

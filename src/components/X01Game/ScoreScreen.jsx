import checkouts from "../../checkouts.js";

export default function ScoreScreen({ gameRef, player }) {
  const playerObj = gameRef[player];

  return (
    <div>
      <h3
        className={
          gameRef[gameRef.turn].uid === playerObj.uid
            ? "text-primary"
            : "text-dark"
        }
      >
        {playerObj.name}
      </h3>
      <p>Score: {playerObj.score}</p>
      <p>Sets: {playerObj.sets}</p>
      <p>Legs: {playerObj.legs}</p>
      <div>
        {checkouts[playerObj.score] ? (
          <p style={{ color: "red" }}>
            {checkouts[playerObj.score].join(", ")}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

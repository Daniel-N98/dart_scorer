import checkouts from "../../checkouts.js";

export default function ScoreScreen({ gameRef, player }) {
  const playerObj = gameRef[player];
  console.log(checkouts[Number(playerObj.score)]);

  return (
    <div>
      <h3
        style={{
          color: gameRef[gameRef.turn].uid === playerObj.uid ? "blue" : "black",
        }}
      >
        {playerObj.name}
      </h3>
      <p>Score: {playerObj.score}</p>
      <p>Sets: {playerObj.sets}</p>
      <p>Legs: {playerObj.legs}</p>
      {checkouts[playerObj.score] ? (
        <p style={{ color: "red" }}>{checkouts[playerObj.score].join(", ")}</p>
      ) : (
        ""
      )}
    </div>
  );
}

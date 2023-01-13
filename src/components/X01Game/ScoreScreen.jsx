import checkouts from "../../checkouts.js";

export default function ScoreScreen({ gameRef, player }) {
  const playerObj = gameRef[player];
  const active =
    gameRef[gameRef.turn].uid === playerObj.uid
      ? "users-turn"
      : "not-users-turn";

  return (
    <div style={{ height: "170px" }} className={active}>
      <h3>
        <u>{playerObj.name}</u>
      </h3>
      <h3>{playerObj.score}</h3>
      <div className="match-stat">
        <p>Sets [{playerObj.sets}]</p>
        <p>Legs [{playerObj.legs}]</p>
      </div>
      <div>
        {checkouts[playerObj.score] ? (
          <p className="checkouts">{checkouts[playerObj.score].join(", ")}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

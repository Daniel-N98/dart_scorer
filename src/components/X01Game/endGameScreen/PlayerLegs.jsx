export default function PlayerLegs({ set }) {
  return (
    <div className="d-flex flex-row justify-content-evenly">
      {Object.keys(set)
        .sort()
        .map((leg, index) => {
          return (
            <div key={index}>
              <h3>Leg {index + 1}</h3>
              <p>[{set[leg].join(", ")}]</p>
              <p>
                Avg:{" "}
                {set[leg].reduce((a, b) => Number(a) + Number(b), 0) /
                  set[leg].length}
              </p>
            </div>
          );
        })}
    </div>
  );
}

import { useState } from "react";
import { useParams } from "react-router-dom";
import { updatePlayerScore } from "../../firebase";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Submit"];

export default function ScoreInput({ gameRef }) {
  const [typedScore, setTypedScore] = useState("");
  const { gameID } = useParams();

  const updateScore = async (input) => {
    if (input === "Clear") {
      setTypedScore("");
      return;
    }
    if (input === "Submit") {
      await updatePlayerScore(gameRef[gameRef.turn].score - typedScore, gameID);
      return;
    }
    // Verify score
    if (typedScore - input > 180 || 1) {
      return;
    }

    if (typedScore.length < 3) {
      setTypedScore((typedScore) => typedScore + input);
    }
  };

  return (
    <section id="scorer-input">
      <h3>{typedScore}</h3>

      {numbers.map((number) => (
        <button
          className="number-grid-input"
          key={number}
          onClick={() => updateScore(number)}
        >
          {number}
        </button>
      ))}
    </section>
  );
}

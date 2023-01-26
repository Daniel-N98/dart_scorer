import { useState } from "react";
import Button from "react-bootstrap/Button";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Submit"];

export default function ScoringInput({ setTypedScore }) {
  const [tempTypedScore, setTempTypedScore] = useState("");

  const updateScore = (input) => {
    if (input === "Clear") {
      setTempTypedScore("");
      return;
    }
    if (input === "Submit") {
      setTypedScore(tempTypedScore);
      setTempTypedScore("");
      return;
    }
    if (tempTypedScore.length >= 3) {
      return;
    }
    setTempTypedScore((tempTypedScore) => tempTypedScore + input);
  };

  return (
    <section id="scorer-input-section" style={{ marginTop: "5px" }}>
      <h3 id="typed-score">{tempTypedScore}</h3>
      <div id="scorer-input">
        {numbers.map((number) => (
          <Button
            size="lg"
            className="number-grid-input"
            variant="dark"
            key={number}
            onClick={() => updateScore(number)}
          >
            {number}
          </Button>
        ))}
      </div>
    </section>
  );
}

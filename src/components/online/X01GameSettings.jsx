import { createOnlineGame, gameExists } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function X01GameSettings() {
  const [user] = useAuthState(getAuth());

  const handleClick = async (e) => {
    e.preventDefault();
    const inputs = document.getElementById("x01-game-settings-form").elements;
    const start_score = Number(inputs[0].value);
    const sets = Number(inputs[1].value);
    const legs = Number(inputs[2].value);

    if (!start_score || !sets || !legs) {
      alert("Invalid form");
      return;
    }

    let { gameID, join_code } = await gameExists(user);
    if (!gameID) {
      const createdMatch = await createOnlineGame({ start_score, sets, legs });
      gameID = createdMatch.gameID;
      join_code = createdMatch.join_code;
    }
    document.location.href = `/games/online/${gameID}/waiting/${join_code}`;
  };

  return (
    <section>
      <h2>Game setup</h2>
      <form id="x01-game-settings-form">
        <label>
          Starting score:
          <select id="x01-score-selection" required>
            <option value="201">201</option>
            <option value="301">301</option>
            <option value="501">501</option>
            <option value="701">701</option>
          </select>
        </label>
        <label>
          Sets:
          <input type="number" required />
        </label>
        <label>
          Legs:
          <input type="number" required />
        </label>
        <label>
          <input type="submit" onClick={(e) => handleClick(e)} />
        </label>
      </form>
    </section>
  );
}

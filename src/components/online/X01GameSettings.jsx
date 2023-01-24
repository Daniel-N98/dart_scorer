import { createOnlineGame, gameExists } from "../../firebase/utilFunctions.js";
import { auth } from "../../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Form from "react-bootstrap/Form";

export default function X01GameSettings() {
  const [user] = useAuthState(auth);

  const handleClick = async (e) => {
    e.preventDefault();
    const inputs = document.getElementById("x01-game-settings-form").elements;
    const start_score = Number(inputs[0].value);
    const sets = Number(inputs[1].value);
    const legs = Number(inputs[2].value);
    const publicMatch = inputs[3].checked;
    if (!start_score || !sets || !legs) {
      alert("Invalid form");
      return;
    }

    let { gameID, join_code } = (await gameExists(user)) || {};
    if (!gameID) {
      const createdMatch = await createOnlineGame({
        start_score,
        sets,
        legs,
        publicMatch,
      });
      gameID = createdMatch.gameID;
      join_code = createdMatch.join_code;
    }
    document.location.href = `/games/online/${gameID}/waiting/${
      publicMatch ? "public" : join_code
    }`;
  };

  return (
    <section>
      <h2>Game setup</h2>
      <Form id="x01-game-settings-form" className="d-flex flex-column">
        <Form.Label>
          Starting score:
          <select id="x01-score-selection" required>
            <option value="201">201</option>
            <option value="301">301</option>
            <option value="501">501</option>
            <option value="701">701</option>
          </select>
        </Form.Label>
        <div className="form-group">
          <label htmlFor="sets">
            <p>Number of sets</p>
            <input
              type="number"
              className="form-control-sm"
              id="sets"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="legs">
            <p>Number of legs</p>
            <input
              type="number"
              className="form-control-sm"
              id="legs"
              required
            />
          </label>
        </div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Public match"
          className="m-auto"
        />
        <label>
          <input
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleClick(e)}
          />
        </label>
      </Form>
    </section>
  );
}

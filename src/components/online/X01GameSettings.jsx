import { createOnlineGame, gameExists } from "../../firebase/utilFunctions.js";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

export default function X01GameSettings() {
  const { currentUser } = useContext(UserContext);

  const handleClick = async (e) => {
    e.preventDefault();
    const inputs = document.getElementById("x01-game-settings-form").elements;
    const start_score = Number(inputs["x01-score-selection"].value);
    const sets = Number(inputs.sets.value);
    const legs = Number(inputs.legs.value);
    const publicMatch = inputs["custom-switch"].checked;
    if (!start_score || !sets || !legs) {
      showInvalidInputEntry(inputs);
      return;
    }

    let { gameID, join_code } = (await gameExists(currentUser)) || {};
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
          <Form.Select
            id="x01-score-selection"
            className="m-auto"
            required
            style={{ width: "230px" }}
          >
            <option value="201">201</option>
            <option value="301">301</option>
            <option value="501">501</option>
            <option value="701">701</option>
          </Form.Select>
        </Form.Label>
        <div className="form-group">
          <Form.Label htmlFor="sets">
            Number of sets:
            <Form.Control type="number" id="sets" />
          </Form.Label>
        </div>
        <div className="form-group">
          <Form.Label htmlFor="legs">
            Number of legs:
            <Form.Control type="number" id="legs" />
          </Form.Label>
        </div>
        <Form.Label htmlFor="custom-switch">
          Public match
          <Form.Check type="switch" id="custom-switch" className="p-0" />
        </Form.Label>
        <Form.Label>
          <Form.Control
            type="submit"
            className="btn btn-primary"
            style={{ width: "230px" }}
            onClick={(e) => handleClick(e)}
          />
        </Form.Label>
      </Form>
    </section>
  );
}

function showInvalidInputEntry(inputs) {
  const { sets, legs } = inputs;
  if (!sets.value) {
    document.querySelector(`#sets`).placeholder = "Please enter a value*";
  }
  if (!legs.value) {
    document.querySelector("#legs").placeholder = "Please enter a value*";
  }
}

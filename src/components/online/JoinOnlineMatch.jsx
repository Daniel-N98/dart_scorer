import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import updateGameDocument, {
  gameExistsWithCode,
} from "../../firebase/utilFunctions.js";

export default function JoinOnlineMatch() {
  const handleClick = async (e) => {
    e.preventDefault();
    const formElements = document.getElementById("join-code-form").elements;
    const code = formElements[0].value;
    const gameID = await gameExistsWithCode(code);
    if (gameID) {
      await updateGameDocument(gameID);
      document.location.href = `/games/online/${gameID}`;
    } else {
      formElements[0].value = "";
      formElements[0].placeholder = `No game found`;
    }
  };

  return (
    <section id="join-online-match">
      <Form id="join-code-form">
        <Form.Label htmlFor="join-code-input">
          <Form.Control
            type="text"
            placeholder="Enter a join code"
            className="p-1"
          />
        </Form.Label>
        <Button
          type="submit"
          variant="primary"
          className="m-0"
          onClick={(e) => handleClick(e)}
        >
          Join
        </Button>
      </Form>
    </section>
  );
}

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
// Import components like above, rather than below.
// import { Button } from "react-bootstrap";

export default function GameTypeList() {
  return (
    <section id="game-type-list">
      <Link to="/games/online">
        <Button>Online</Button>
      </Link>
      <Link to="/games/single-player">
        <Button>Singleplayer</Button>
      </Link>
    </section>
  );
}

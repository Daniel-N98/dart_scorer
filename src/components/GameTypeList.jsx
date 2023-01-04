import { Link } from "react-router-dom";

export default function GameTypeList() {
  return (
    <section id="game-type-list">
      <button>
        <Link to="/games/online" className="link-btn">
          Online
        </Link>
      </button>
      <button>
        <Link to="/games/single-player" className="link-btn">
          Singleplayer
        </Link>
      </button>
    </section>
  );
}

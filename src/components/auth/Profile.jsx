import { useContext } from "react";
import { useEffect, useState } from "react";
import { getPlayerStats } from "../../firebase/utilFunctions.js";
import { UserContext } from "../../contexts/UserContext.jsx";

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function getStatistics() {
      const stats = await getPlayerStats(currentUser.uid);
      setStats(stats);
    }
    getStatistics();
  }, [currentUser]);

  return (
    <section id="user-profile">
      <p>Display name: {currentUser.displayName}</p>
      <p>Wins: {stats.online_wins}</p>
      <p>Losses: {stats.online_losses}</p>
      <p>
        Win rate:{" "}
        {(
          (stats.online_wins / (stats.online_wins + stats.online_losses)) *
          100
        ).toFixed(2)}
        %
      </p>
    </section>
  );
}

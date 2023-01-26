import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.js";
import { getPlayerStats } from "../../firebase/utilFunctions.js";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [stats, setStats] = useState({});
  console.log("Profile");

  useEffect(() => {
    async function getStatistics() {
      const stats = await getPlayerStats(user.uid);
      setStats(stats);
    }
    getStatistics();
  }, [user]);

  if (loading) return <h2>Loading</h2>;

  return (
    <section id="user-profile">
      <p>Display name: {user.displayName}</p>
      <p>Wins: {stats.online_wins}</p>
      <p>Losses: {stats.online_losses}</p>
      <p>
        Win rate:{" "}
        {(stats.online_wins / (stats.online_wins + stats.online_losses)) * 100}%
      </p>
    </section>
  );
}

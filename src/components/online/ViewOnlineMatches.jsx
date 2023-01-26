import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebase";
import PublicOnlineMatchPreview from "./PublicOnlineMatchPreview";

export default function ViewOnlineMatches() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function monitorGames() {
    setIsLoading(true);
    const q = query(collection(db, "games"), where("status", "==", "pending"));
    const unsub = onSnapshot(q, (snap) => {
      const games = [];
      snap.forEach((doc) => {
        if (!doc.data().join_code) {
          const data = { ...doc.data(), gameID: doc.id };
          games.push(data);
        }
      });
      setMatches(games);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    monitorGames();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <section id="online-games-list">
      {matches.length > 0 ? (
        <div>
          {matches.map((match) => {
            return <PublicOnlineMatchPreview match={match} key={match.date} />;
          })}
        </div>
      ) : (
        <h2>There are currently no public matches.</h2>
      )}
    </section>
  );
}

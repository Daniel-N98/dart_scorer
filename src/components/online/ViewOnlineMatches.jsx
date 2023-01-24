import { useState } from "react";
import { useEffect } from "react";
import { getPublicMatches } from "../../firebase/utilFunctions";
import PublicOnlineMatchPreview from "./PublicOnlineMatchPreview";

export default function ViewOnlineMatches() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getOnlineMatches() {
      const matches = await getPublicMatches();
      setMatches(matches);
    }
    getOnlineMatches();
    setIsLoading(false);
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

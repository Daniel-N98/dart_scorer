import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchFromId } from "../../firebase";

export default function OnlineX01Game() {
  const { gameID } = useParams();
  const [gameRef, setGameRef] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getGameRef() {
      const gameRef = await getMatchFromId(gameID);
      setGameRef(gameRef);
      setLoading(false);
    }
    getGameRef();
  }, [gameID]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {gameRef ? (
        <div>
          <h2>Joined game: {gameID}</h2>
          <h3>Players:</h3>
          <ul>
            <li>P1: {gameRef.p1.uid}</li>
            <li>P2: {gameRef.p2.uid}</li>
          </ul>
          <h3>Settings:</h3>
          <ul>
            <li>Starting Score: {gameRef.start_score}</li>
            <li>Sets: {gameRef.sets}</li>
            <li>Legs: {gameRef.legs}</li>
          </ul>
          <p>Status: {gameRef.status}</p>
          <p>Join Code: {gameRef.join_code}</p>
        </div>
      ) : (
        <h2>Loading</h2>
      )}{" "}
    </div>
  );
}

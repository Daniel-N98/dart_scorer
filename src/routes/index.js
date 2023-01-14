import { Route, Routes } from "react-router-dom";
import OnlineMatch from "../components/online/OnlineMatch";
import OnlineX01Game from "../components/online/OnlineX01Game";
import WaitingForMatch from "../components/online/WaitingForMatch";
import X01GameSettings from "../components/online/X01GameSettings";
import EndGameScreen from "../components/X01Game/EndGameScreen";
import Account from "../views/Account";
import Games from "../views/Games";
import Home from "../views/Home";

export default function RoutePaths() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/online" element={<OnlineMatch />} />
        <Route path="/games/online/:gameID" element={<OnlineX01Game />} />
        <Route path="/games/online/setup" element={<X01GameSettings />} />
        <Route
          path="/games/online/:gameID/waiting/:join_code"
          element={<WaitingForMatch />}
        />
        <Route path="/account" element={<Account />} />
        <Route
          path="/games/online/:gameID/finished"
          element={<EndGameScreen />}
        />
      </Routes>
    </section>
  );
}

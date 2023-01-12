import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Games from "./views/Games";
import Account from "./views/Account";
import Navigation from "./components/Navigation.jsx";
import OnlineMatch from "./components/online/OnlineMatch.jsx";
import OnlineX01Game from "./components/online/OnlineX01Game.jsx";
import WaitingForMatch from "./components/online/WaitingForMatch.jsx";
import X01GameSettings from "./components/online/X01GameSettings.jsx";
import EndGameScreen from "./components/X01Game/EndGameScreen";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/online" element={<OnlineMatch />} />
        <Route path="/games/online/:gameID" element={<OnlineX01Game />} />
        <Route path="/games/online/setup" element={<X01GameSettings />} />
        <Route
          path="/games/online/:gameID/waiting"
          element={<WaitingForMatch />}
        />
        <Route path="/account" element={<Account />} />
        <Route
          path="/games/online/:gameID/finished"
          element={<EndGameScreen />}
        />
      </Routes>
    </div>
  );
}

export default App;

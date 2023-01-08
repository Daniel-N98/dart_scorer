import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Navigation from "./components/Navigation";
import Games from "./views/Games";
import Account from "./views/Account";
import OnlineMatch from "./components/OnlineMatch";
import OnlineX01Game from "./components/OnlineX01Game";
import WaitingForMatch from "./components/WaitingForMatch";
import X01GameSettings from "./components/X01GameSettings";

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
      </Routes>
    </div>
  );
}

export default App;

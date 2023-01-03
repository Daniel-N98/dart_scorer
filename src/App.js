import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Navigation from "./components/Navigation";
import Games from "./views/Games";
import Account from "./views/Account";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;

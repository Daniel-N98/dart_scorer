import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Navigation from "./components/Navigation";
import Games from "./views/Games";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  );
}

export default App;

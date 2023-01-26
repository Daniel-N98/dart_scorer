import "./App.css";
import Navigation from "./components/nav/Navigation.jsx";
import { UserContextProvider } from "./contexts/UserContext";
import RoutePaths from "./routes";
function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Navigation />
        <RoutePaths />
      </div>
    </UserContextProvider>
  );
}

export default App;

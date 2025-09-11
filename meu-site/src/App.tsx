import { AppRoutes } from "./routes/AppRoutes";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="app">
      <NavBar />
      <AppRoutes/>
    </div>
  );
}

export default App;

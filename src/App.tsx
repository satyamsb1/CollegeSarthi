import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "../src/components/Navbar";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <KanbanBoard />;{/* <Login /> */}
    </Router>
  );
}

export default App;

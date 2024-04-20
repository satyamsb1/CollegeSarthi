import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
// import Navbar from "../src/components/Navbar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<KanbanBoard />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;

import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "../src/components/Navbar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Error from "./components/Error";
import Stats from "./Stats";

function PrivateRoute() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/stats" element={<Stats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<KanbanBoard />} />
        </Route>

        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

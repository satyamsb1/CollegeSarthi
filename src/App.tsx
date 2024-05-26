import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "../src/components/Navbar";
import Login from "./components/Login";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Error from "./components/Error";

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
>>>>>>> origin/master

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<KanbanBoard />} />
      </Routes>
=======
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element={<KanbanBoard />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>

>>>>>>> origin/master
    </BrowserRouter>


  );
}

export default App;

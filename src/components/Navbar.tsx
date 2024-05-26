import logo from "../icons/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/userOnlineStatus";

const Navbar = () => {
  var isLoggedIn = useOnlineStatus();

  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="text-[#4274e8] bg-[#eff0f1] font-bold py-4 px-8 flex justify-between items-center pt-6">
      <div className="flex justify-between w-5/6">
        <Link to="/">
          <img className="h-12 w-[10rem] ml-5" src={logo} alt="Logo" />
        </Link>
        <ul className="my-auto">
          <li className="px-4 text-lg inset-y-0 right-0 mr-4">
            {isLoggedIn ? "User logged in✅" : "User logged out🔴"}
          </li>
        </ul>
      </div>
      <div className="text-center justify-end gap-8 flex w-1/6">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img
            className="absolute w-20 h-20"
            src="https://picsum.photos/200"
            alt="Profile"
          />
        </div>
        <button
          className="ml-4 py-2 px-4 bg-blue-500 text-white rounded"
          onClick={() => navigate("/stats")}
        >
          Stats
        </button>
        <button
          className="ml-4 py-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleAuthAction}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

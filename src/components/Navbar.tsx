import React from "react";
import useOnlineStatus from "../utils/userOnlineStatus";
import logo from "../icons/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const onlineStatus = useOnlineStatus();
  return (
    <nav className="text-[#4274e8] bg-[#eff0f1] font-bold py-4 px-8 flex justify-between items-center pt-6">
      <div className=" flex justify-between w-5/6">
        <Link to="/">
          <img className="h-auto w-[12rem] ml-5" src={logo} alt="" />
        </Link>
        <ul className="my-auto">
          <li className="px-4 text-lg inset-y-0 right-0 mr-4">
            Online Status :{" "}
            {onlineStatus ? "User logged in✅" : "User Logged out 🔴"}
          </li>
        </ul>
      </div>
      <div className="text-center justify-end gap-8 flex w-1/6 ">
        <div className="my-auto">
          <h1>Pramod Patil</h1>
        </div>
        <div className="relative  w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

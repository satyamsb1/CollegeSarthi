import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import baseURL from "../apis/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/auth/staff_login`, {
        staff_id: staffId,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");

      } else {
        console.error("Login failed");
        toast.error("Incorrect staff ID or password. Please try again.", { theme: "dark" });
      }
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ToastContainer theme="dark" />
      <form
        onSubmit={handleSubmit}
        className="bg-[#f7f8f9] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Staff Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1">
            Staff ID
          </label>
          <input
            type="staffID"
            id="staffID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="Enter your Staff ID"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#0c66e4] focus:border-[2px]"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#0c66e4] focus:border-[2px]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0c66e4] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

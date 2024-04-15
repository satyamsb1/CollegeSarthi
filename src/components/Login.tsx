import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your login logic
    console.log("Login clicked with email:", email, "and password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

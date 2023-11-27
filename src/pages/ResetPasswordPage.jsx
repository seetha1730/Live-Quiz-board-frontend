import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ResetPassWordPage() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation(); // Get the current location object

  // Extract email from the query parameters in the URL
  const getEmailFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("email");
  };

  const email = getEmailFromQuery();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
    
      const response = await axios.post("http://localhost:3000/auth/reset-password", {password: password,
      email: email});
      console.log("Server response:", response.data);
  
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="flex my-screen items-center">
      <div className="max-w-lg mx-auto w-11/12 my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <form className="text-2xl font-bold mb-4 text-[#008489] dark:text-[#008489] ">
          <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#008489] dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-[#008489] dark:text-white">
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 mb-2 text-sm font-medium">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-[#008489] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassWordPage;

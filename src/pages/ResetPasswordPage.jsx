import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ResetPassWordPage() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const location = useLocation(); // Get the current location object
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
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

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/reset-password`, {
        password: password,
        email: email
      });
      navigate('/login');
      console.log("Server response:", response.data);

    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="flex my-screen items-center">
      <div className={` ${theme === 'dark' ? ' bg-gray-700' : 'bg-gradient-2'} max-w-lg text-white mx-auto w-11/12 my-8 p-6  shadow-lg rounded-lg`}>
        <form className="text-2xl font-bold mb-4 text-white  ">
          <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 border-0"
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} className="h-6 text-gray-600" />
                ) : (
                  <FontAwesomeIcon icon={faEye} className="h-6 text-gray-600" />
                )}
              </button>
            </div>


          </div>

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-sm font-medium ">
              Repeat Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 border-0"
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} className="h-6 text-gray-600" />
                ) : (
                  <FontAwesomeIcon icon={faEye} className="h-6 text-gray-600" />
                )}
              </button>
            </div>


          </div>



          {error && (
            <p className="text-red-500 mb-2 text-sm font-medium">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              type="button"
              className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'purple-button border-light-purple '}  mx-auto w-full md:w-5/12 lg:w-5/12  rounded-3xl  text-white text-gray-200 justify-center px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}
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

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from '../context/theme.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const API_URL = "http://149.100.138.125:4141";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {

        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };





  return (
    <div className="flex my-screen items-center">
    <div className={` ${theme === 'dark' ? ' bg-gray-700' : 'bg-gradient-1'} max-w-lg text-white mx-auto w-11/12 my-8 p-6  shadow-lg rounded-lg`}>
      <form onSubmit={handleSubmit} className="text-2xl font-bold mb-4  ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border text-gray-600 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium ">
          Password
        </label>
        <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md text-gray-600"
          required
        />
       <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="h-6 text-gray-600" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="h-6 text-gray-600" />
            )}
          </button>
          </div>

        
      </div>
        <div className="w-full flex flex-col  sm:flex-row items-center justify-between">
          <button
            type="submit"
            className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'purple-button border-light-purple '}   w-full sm:w-5/12 md:w-5/12 lg:w-5/12  rounded-3xl  text-white text-gray-200 justify-center px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}
          >
            Login
          </button>
          
          <button
            type="submit"
            className={` ${theme === 'dark' ? ' bg-gray-700 border-white ' : 'purple-button border-light-purple '}    w-full mt-2 sm:mt-0  md:mt-0  lg:mt-0 sm:w-5/12  md:w-5/12 lg:w-5/12  rounded-3xl  text-white text-gray-200 justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}
          >
         <a href="/" id="guest" className="text-white" >
            Guest User
          </a>
          </button>

          
        </div>

        <Link to="/forgot-password" className="flex justify-end mt-2 text-white underline mr-3 w-full text-sm hover:underline">
            Forgot Password?
          </Link>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;

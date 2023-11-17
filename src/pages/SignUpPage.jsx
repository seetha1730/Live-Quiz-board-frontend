import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const API_URL = "http://localhost:3000";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false); // Add this line

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then((response) => {
      navigate('/login');
    })
    .catch((error) => {
        console.log(error)
     const errorDescription = error;
     setErrorMessage(errorDescription);
    })
  };

  return (

    <div className="max-w-md mx-auto mt-8">
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700  mb-4">Sign up to your Account</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
       <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="h-6 text-white-700" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="h-6 text-white-700" />
            )}
          </button>
          </div>

        
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Signup
        </button>
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
);
}

export default SignupPage;

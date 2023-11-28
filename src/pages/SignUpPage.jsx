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
  const [lastName, setLastName] = useState(""); 
  const [dateOfBirth, setDateOfBirth] = useState(""); 
  const [gender, setGender] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, lastName, dateOfBirth, gender, phoneNumber };

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

    <div className="flex my-screen items-center">
        <div className="max-w-lg  mx-auto w-11/12 my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">

    <form onSubmit={handleSubmit} className="text-2xl font-bold mb-4 text-[#008489] dark:text-[#008489]">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign up to your Account</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-[#008489] dark:text-white">
          First Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-[#008489] dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-[#008489] dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-[#008489] dark:text-white">
          Password
        </label>
        <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
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

      <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#008489] dark:text-white">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-[#008489] dark:text-white">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#008489] dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-[#008489]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Signup
        </button>
        <a href="/forgot-password" className="text-gray-900 text-sm hover:underline">
          Forgot Password?
        </a>
      </div>
    </form>
    </div>
  </div>
);
}

export default SignupPage;

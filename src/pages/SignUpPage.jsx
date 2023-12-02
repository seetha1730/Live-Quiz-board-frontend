import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from "../context/theme.context";
const API_URL = "http://149.100.138.125:4141";

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
  const { theme } = useContext(ThemeContext);
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
    <div className={` ${theme === 'dark' ? ' bg-gray-700' : 'bg-gradient-2'} max-w-lg text-white mx-auto w-11/12 my-8 p-6  shadow-lg rounded-lg`}>

    <form onSubmit={handleSubmit} className="text-2xl font-bold mb-4 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign up to your Account</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium ">
          First Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md text-gray-600"
          required
        />
      </div>
      <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium ">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-gray-600"
              required
            />
          </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium ">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md text-gray-600"
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

      <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium ">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-gray-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium ">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-gray-600"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium ">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-gray-600"
              required
            />
          </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'purple-button border-light-purple '}  mx-auto w-full md:w-5/12 lg:w-5/12  rounded-3xl  text-white text-gray-200 justify-center px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}
        >
          Signup
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

export default SignupPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
 // const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false); // Add this line

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then((response) => {
      navigate('/login');
    })
    .catch((error) => {
        console.log(error)
     // const errorDescription = error;
    //  setErrorMessage(errorDescription);
    })
    // axios.post(`${API_URL}/auth/signup`, requestBody)
    //   .then((response) => {
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       setErrorMessage(error.response.data.message);
    //     } else if (error.request) {
    //       setErrorMessage("No response received from the server.");
    //     } else {
    //       setErrorMessage("An error occurred while processing the request.");
    //     }
    //   });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} required />

        <button type="submit">Sign Up</button>
      </form>

      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}

      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;

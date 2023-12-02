import { useState,useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/theme.context";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { theme } = useContext(ThemeContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://149.100.138.125:4141/auth/forgot-password", { email });

      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending forgot password request:", error);
    }
  };
    return (
        <div className="flex my-screen items-center">
    <div className={` ${theme === 'dark' ? ' bg-gray-700' : 'bg-gradient-1'} max-w-lg text-white mx-auto w-11/12 my-8 p-6  shadow-lg rounded-lg`}>
          <form  className="text-2xl font-bold mb-4 text-white ">
            <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
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
                className="w-full mt-1 p-2 border rounded-md text-gray-600"
                required
              />
            </div>
           
            <div className="flex items-center justify-between">
              <button onClick={handleSubmit}
                type="button"
                className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'purple-button border-light-purple '}  mx-auto w-full md:w-5/12 lg:w-5/12  rounded-3xl  text-white text-gray-200 justify-center px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}
              >
                Forgot Password
              </button>
            
            </div>
          </form>
        </div>
        </div>

  )
}

export default ForgotPassword
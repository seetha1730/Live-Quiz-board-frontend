import { useState } from "react";
import axios from "axios";


function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/forgot-password", { email });

      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending forgot password request:", error);
    }
  };
    return (
        <div className="flex my-screen items-center">
        <div className="max-w-lg  mx-auto w-11/12 my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <form  className="text-2xl font-bold mb-4 text-[#008489] dark:text-[#008489] ">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
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
           
            <div className="flex items-center justify-between">
              <button onClick={handleSubmit}
                type="button"
                className="bg-[#008489]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Forgot Password
              </button>
            
            </div>
          </form>
        </div>
        </div>
      );
    }
    


export default ForgotPasswordPage;




 


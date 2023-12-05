

import { ThemeContext } from '../context/theme.context';
import { useContext} from 'react';
import { Link } from 'react-router-dom';
function HomePage() {
 const { theme } = useContext(ThemeContext);

  return (
      <div className='flex my-screen items-center'>
      <div className={` ${theme === 'dark' ? ' bg-gray-700' : ' bg-base-purple border-light-purple' } text-gray-300 p-8 max-w-lg mx-auto w-11/12 my-8 p-6  text-white-900 shadow-lg rounded-lg `}>

        {/* <div className='bg-base-purple border-light-purple max-w-lg mx-auto w-11/12 my-8 p-6 text-white-900 shadow-lg rounded-lg'> */}
          <h1 className={` ${theme === 'dark' ? ' bg-gray-700' :' text-gradient '} text-2xl font-bold  text-center text-4xl font-bold mb-4`} >Welcome to the Live Quiz Board!</h1>

          <p>
          Immerse yourself in the ultimate real-time quiz experience. Join live quiz rooms,
        answer questions, and compete with friends. Are you ready to be a quiz champion?
        Dive into the excitement now!           </p>

          <h2 className="text-2xl font-bold my-4">Key Features:</h2>
          <ul className="list-disc ml-8">
            <li>Participate in live quiz rooms with real-time updates.</li>
            <li>Create your quiz room and challenge your friends.</li>
            <li>Responsive design for a seamless experience on any device.</li>
            <li>Engage in interactive quiz sessions with WebSocket.io integration.</li>
          </ul>

         
     
          <p className='mt-5'>
            Are you ready to challenge your knowledge? Join us on the Live Quiz Board and experience quizzes like never before. The leaderboard awaits you!
          </p>
          <button
          type="submit"
          className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'gradient-button' }  text-white mx-auto flex  mt-4 w-4/12 justify-center font-bold py-2 px-4 rounded-3xl focus:outline-none `}
        >
         <Link className="text-white " to="/room">Join </Link> 
        </button>

        </div>
      </div>

  );
}

export default HomePage;

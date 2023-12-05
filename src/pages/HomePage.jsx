

// import { ThemeContext } from '../context/theme.context';
// import { useContext} from 'react';
function HomePage() {
 // const { theme } = useContext(ThemeContext);

  return (
    <div className="mx-auto p-8">
      <div className='flex my-screen items-center'>
      {/* <div className={ theme === 'dark' ? ' bg-gray-900 min-h-screen': ' bg-base-purple border-light-purple min-h-screen max-w-lg mx-auto w-11/12 my-8 p-6 text-white-900 shadow-lg rounded-lg'}> */}

        <div className='bg-base-purple border-light-purple max-w-lg mx-auto w-11/12 my-8 p-6 text-white-900 shadow-lg rounded-lg'>
          <h1 className="text-4xl font-bold mb-4">Welcome to the Live Quiz Board!</h1>

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


        </div>
      </div>
    </div>
  );
}

export default HomePage;

import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizBoardPage from './pages/QuizBoardPage';
import GameRoom from './pages/GameRoom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import IsAnon from "./components/isAnon";

import CreateQuestion from './pages/CreateQuestion';


function App() {

  return (
 
  
      <div className="min-h-full">
        <Navbar />
      
        <Routes>
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>  } />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/question-answers" element={<CreateQuestion /> } />
          <Route path="/" element={
          <QuizBoardPage />} />
          <Route path={`/room/:roomName`} element={
            
          <GameRoom />
         
          } />
        </Routes>
      </div>
  
  );
}

export default App;



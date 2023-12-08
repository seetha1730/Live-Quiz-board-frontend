import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeContext } from './context/theme.context';
import { useContext} from 'react';
import QuizBoardPage from './pages/QuizBoardPage';
import GameRoom from './pages/GameRoom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import IsAnon from "./components/isAnon";
import CreateQuestion from './pages/CreateQuestion';
import ResetPassWordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import GameHistory from "./pages/GameHistoryPage"
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import FeedBackPage from './pages/FeedBackPage';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
   
      <div className={theme === 'dark' ? ' bg-gray-900 min-h-screen': 'bg-purple min-h-screen' }>
        <Navbar />
        <Routes>      
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>  } />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
       
        <Route path="/question-answers" element={<CreateQuestion /> } />
        <Route path="/history/:userId" element={<GameHistory /> } />
        <Route path="/" element={ <HomePage />} />
        <Route path="/room" element={ <QuizBoardPage />} />
        <Route path="/feedback" element={ <FeedBackPage/>} />
        <Route path="/forgot-password" element={ <ForgotPassword/>} />
        <Route path="/reset-password" element={ <ResetPassWordPage/>} />
        <Route path="/profile/:userId" element={ <ProfilePage/>} />
        <Route path={`/room/:roomName`} element={
            
          <GameRoom />
         
          } />
        </Routes>
      </div>
     
  );
}

export default App;



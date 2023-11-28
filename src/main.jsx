import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProviderWrapper } from "./context/auth.context";
import { BrowserRouter as Router } from 'react-router-dom';
import { GameContextWrapper } from './context/game.context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>

      <AuthProviderWrapper>   
      <GameContextWrapper>
        <App />
        </GameContextWrapper>
      </AuthProviderWrapper>    

    </Router>
  </React.StrictMode>,
  
)

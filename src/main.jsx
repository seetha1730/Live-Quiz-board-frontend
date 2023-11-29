import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProviderWrapper } from "./context/auth.context";
import { BrowserRouter as Router } from 'react-router-dom';
import { GameContextWrapper } from './context/game.context';
import { ThemeProviderWrapper } from './context/theme.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
  <ThemeProviderWrapper>
      <AuthProviderWrapper>   
      <GameContextWrapper>
        <App />
        </GameContextWrapper>
      </AuthProviderWrapper>    
</ThemeProviderWrapper>
    </Router>
  </React.StrictMode>,
  
)

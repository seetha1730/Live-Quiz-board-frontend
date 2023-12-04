// components/GameHistoryPage.js
import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import Accordion from '../components/Accordion';
import { useParams } from "react-router-dom";
import { ThemeContext } from '../context/theme.context';

function GameHistoryPage() {
  const [scoreHistory, setScoreHistory] = useState([]);
  const { userId } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    // Fetch score history when the component mounts
    fetchScoreHistory();
  }, []);

  const fetchScoreHistory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/game/scoreHistory/${userId}`);
      setScoreHistory(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="w-8/12 flex  mx-auto">
                <h2 className={` ${theme === 'dark' ? ' bg-gray-700' : ' text-gradient '} text-2xl m-5 font-bold mb-4 text-center `}>
Game History</h2>
      <Accordion
        items={scoreHistory.map((score, index) => ({
          title: (
            
            <div className=' p-5 m-2 grid grid-cols-12 text-white' key={index} onClick={() => handleItemClick(index)}>

             <div className="arrow-icon col-span-1 flex justify-center items-center">
             {openIndex === index ? '▼' : '►'}
            </div>
            <div className="arrow-icon col-span-8 ">
              <p>Date: {new Date(score.date).toLocaleString()}</p>
              <p>Room Name: {score.roomName}</p>
              <p>Creator: {score.creator}</p>
              </div>
            </div>
          ),
          content: (
            <div className=' px-5 m-2 grid grid-cols-12 text-gray-500 text-sm' >
             <div className="col-span-1 flex justify-center items-center">
            </div>
            <div className="col-span-8">
            <ul >
           
              {score.players.map((player, playerIndex) => (
                <li  key={playerIndex}>
                  {player ? (
                    <>
                      <p>Player Name: {player.playerName}</p>
                      <p>Email: {player.email}</p>
                      <p>Score: {player.score}</p>
                      <p>Rank: {player.rank}</p>
                    </>
                  ) : (
                    <p>Player data not available</p>
                  )}
                </li>
              ))}
            </ul>
            </div>
            </div>
          ),
        }))}
      />
    </div>
  );
}

export default GameHistoryPage;

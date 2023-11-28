// components/GameHistoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../components/Accordion';
import { useParams } from "react-router-dom";
function GameHistoryPage() {
  const [scoreHistory, setScoreHistory] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    // Fetch score history when the component mounts
    fetchScoreHistory();
  }, []);

  const fetchScoreHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/game/scoreHistory/${userId}`);
      setScoreHistory(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Game History</h1>
      <Accordion
        items={scoreHistory.map((score, index) => ({
          title: (
            <div className='bg-gray-900 p-5 m-2' key={index}>
              <p>Date: {new Date(score.date).toLocaleString()}</p>
              <p>Room Name: {score.roomName}</p>
              <p>Creator: {score.creator}</p>
            </div>
          ),
          content: (
            <ul className='bg-white p-5 m-2' >
              {score.players.map((player, playerIndex) => (
                <li key={playerIndex}>
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
          ),
        }))}
      />
    </div>
  );
}

export default GameHistoryPage;

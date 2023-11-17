import React, { useState, useEffect,useContext } from 'react';
import RoomAndUsers from "../components/RoomsAndUser";
import { GameContext } from '../context/game.context';
import SendQuestion from '../components/sendQuestion';
import PlayerQuestion from '../components/PlayerQuestion';
import { socket } from "../services/socket.service";
function GameRoom() {
  const { gameContext } = useContext(GameContext);
  const { playerDetail } = useContext(GameContext);
  const [score,setScore]=useState("")

  useEffect(() => {
    socket.on('result', (data) => {
      console.log(data);
      setScore(data);
    });

    return () => {
      socket.off('result');
    };
  }, []);

  const endGame = (roomData) => {
    if (socket && socket.connected) {
      socket.emit("endGame", { roomData });
      console.log("End Game");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen grid grid-cols-12">
      {gameContext && gameContext === "creator" ? (
        <>
          <div className="gap-3 col-span-3 bg-white top-[3.8125rem]">
            <RoomAndUsers />
            <button onClick={()=> endGame(playerDetail.room)} className='bg-red-500'>End Game</button>
          </div>
         
          <div className="gap-3 col-span-5 bg-grey">
            <SendQuestion  />
          </div>

        
        </>
      ) : (
        <>
          <div className="gap-3 col-span-3 bg-white top-[3.8125rem]">
            <RoomAndUsers />
          </div>

          <div className="gap-3 col-span-5 bg-grey">
            <PlayerQuestion />
          </div>
        </>
      )}
    </div>
  );
}

export default GameRoom;

import React, { useState, useEffect,useContext } from 'react';
import RoomAndUsers from "../components/RoomsAndUser";
import { GameContext } from '../context/game.context';
import SendQuestion from '../components/sendQuestion';
import PlayerQuestion from '../components/PlayerQuestion';
import { socket } from "../services/socket.service";
import Dots from '../components/Dots';
import FancyButton from '../components/button/FancyButton';
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
          <div className="gap-3 col-span-4 m-5 rounded-lg bg-white top-[3.8125rem]">
            <RoomAndUsers />
            <FancyButton text="End Game" answerClick={() => endGame(playerDetail.room)}/>
           
          </div>

          <div className="gap-3 col-span-3 m-5 rounded-lg bg-white top-[3.8125rem]">
           <h1>questions</h1>
           
          </div>
         
          <div className="gap-3 col-span-5 m-5 rounded-lg  bg-gray ">
            <div className="container">
            
            <Dots/>
            <div className="content h-screen w-full w-2/4  overflow-y-scroll">
            <SendQuestion  />
            </div>
          </div>
            
          </div>

        
        </>
      ) : (
        <>
          <div className="gap-3 col-span-4 m-5 rounded-lg bg-white top-[3.8125rem]">
            <RoomAndUsers />
          </div>

          <div className="gap-3 col-span-8 m-5 rounded-lg bg-gray">
          <div className="container">
          
          <Dots/>
          <div className="content  m-3 w-2/4  overflow-hidden">
          <PlayerQuestion />
          </div>
        </div>

           
          </div>
        </>
      )}
    </div>
  );
}

export default GameRoom;

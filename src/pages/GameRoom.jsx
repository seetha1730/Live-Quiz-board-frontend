import React, { useState, useEffect,useContext } from 'react';
import RoomAndUsers from "../components/RoomsAndUser";
import { GameContext } from '../context/game.context';
import SendQuestion from '../components/sendQuestion';
import PlayerQuestion from '../components/PlayerQuestion';
import { socket } from "../services/socket.service";
import Dots from '../components/Dots';

function GameRoom() {
  const { gameContext } = useContext(GameContext);

  

  useEffect(() => {
   

    return () => {
      socket.off('result');
    };
  }, []);

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen grid grid-cols-12">
      {gameContext && gameContext === "creator" ? (
        <>
          <div className="gap-3 col-span-4 m-5 rounded-lg bg-white top-[3.8125rem]">
            <RoomAndUsers />
         

        {/* <button onClick={endGame(playerDetail.room)}  className="w-4/12 relative h-12 inline-flex items-center justify-center overflow-hidden bg-red-900  font-medium text-white transition duration-300 ease-out border-2 border-red-500 rounded-lg shadow-md group">
          <span className="absolute inset-0 p-2 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">End Game</span>
          <span className="relative invisible">End Game</span>
        </button> */}
           
          </div>

          
         
          <div className="gap-3 col-span-8 m-5 rounded-lg  bg-gray ">
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

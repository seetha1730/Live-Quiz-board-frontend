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

          <div className="gap-3 col-span-8 m-5 rounded-lg">
          <div className="container rounded-lg">
          
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

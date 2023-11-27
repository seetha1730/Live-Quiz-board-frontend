import { useState, useContext,useEffect } from "react";
import { Navigate } from "react-router-dom";
import Room from "../components/Room";
import { useNavigate } from "react-router-dom";

import { socket } from "../services/socket.service";
import { GameContext} from "../context/game.context";


function QuizBoardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

 
  const {manageContext} = useContext(GameContext)
  
  const navigate = useNavigate();
useEffect(() => {

  const storedGameContext = JSON.parse(localStorage.getItem('gameContext'));
  console.log(storedGameContext)


},[])

  function handleCreate(roomName,userName) {
    manageContext('creator',userName, roomName)
    if (socket && socket.connected) {
      socket.emit("create-room", { 
        roomName: roomName, 
        userName: userName 
      });
      localStorage.setItem('gameContext', JSON.stringify({ name:userName,roomName,role:"creator" }));

    }

  }

  function handleJoin(roomName,name) {
    manageContext('player',name, roomName)
    if (socket && socket.connected) {
      socket.emit("join-room", { roomName,name });
    }
    localStorage.setItem('gameContext', JSON.stringify({ name,roomName,role:"player" }));
  }

  function create(roomName,name) {
    handleCreate(roomName,name);
    navigate(`/room/${roomName}`);
  }

  function join(roomName,name) {
    handleJoin(roomName,name);
    navigate(`/room/${roomName}`);
  }

  if (!isLoggedIn) return <Navigate to="/error" />;

  return (
    <div className="h-screen md:flex">
   
      <main className="flex items-center mx-auto md:w-11/12 pb-10 ">
        <div className="grid grid-cols-12 mx-auto w-full md:gap-2">
          <Room type="Create" buttonEvt={create}  title="Create" />
          <Room type="Join" buttonEvt={join}  title="Join" />
        </div>
      </main>
      </div>
  );
}

export default QuizBoardPage;

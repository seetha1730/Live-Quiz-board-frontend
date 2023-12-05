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
  setIsLoggedIn(true);
  const storedGameContext = JSON.parse(localStorage.getItem('gameContext'));
  console.log(storedGameContext)


},[])

  function handleCreate(roomName,userName,email) {
    manageContext('creator',userName, roomName,email)
    if (socket && socket.connected) {
      socket.emit("create-room", { 
        roomName: roomName, 
        userName: userName ,
        email:email

      });
      localStorage.setItem('gameContext', JSON.stringify({ name:userName,email,roomName,role:"creator" }));
    
    }

  }

  function handleJoin(roomName,name,email) {
    manageContext('player',name, roomName,email)
    if (socket && socket.connected) {
      socket.emit("join-room", { roomName,name ,email});
    }
    localStorage.setItem('gameContext', JSON.stringify({ name,roomName,role:"player" }));
 
  }

  function create(roomName,name,email) {
    handleCreate(roomName,name,email);
    navigate(`/room/${roomName}`);
  }

  function join(roomName,name,email) {
    handleJoin(roomName,name,email);
    navigate(`/room/${roomName}`);
  }

  if (!isLoggedIn) return <Navigate to="/error" />;

  return (
    <div className="h-screen md:flex">
   
      <main className="flex items-center mx-auto md:w-11/12 pb-10 ">
        <div className="grid grid-cols-12 mx-auto w-full md:gap-2">
          <Room type="Create" background="bg-gradient-1" buttonEvt={create}  title="Create" />
          <Room type="Join"  background="bg-gradient-2" buttonEvt={join}  title="Join" />
        </div>
      </main>
      </div>
  );
}

export default QuizBoardPage;

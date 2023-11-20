import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Room from "../components/Room";
import { useNavigate } from "react-router-dom";

import { socket } from "../services/socket.service";
import { GameContext} from "../context/game.context";

import ThemeSwitcher from "../components/ThemeSwitcher";

function QuizBoardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {manageContext} = useContext(GameContext)
  
  const navigate = useNavigate();

  function handleCreate(roomName,userName) {
    manageContext('creator',userName, roomName)
    if (socket && socket.connected) {
      socket.emit("create-room", { 
        roomName: roomName, 
        userName: userName 
      });
    }
  }

  function handleJoin(roomName,name) {
    manageContext('player',name, roomName)
    if (socket && socket.connected) {
      socket.emit("join-room", { roomName,name });
    }
  }

  function create(roomName,name) {
    handleCreate(roomName,name);
    navigate(`/room/${roomName}`);
  }

  function join(roomName,name) {
    handleJoin(roomName,name);
    navigate(`/room/${roomName}`);
  }
 

  // const backgroundImageUrl = isDarkMode
  // ? "./../../public/240_F_362572396_7m4bza1L5UGWYeII0fH45Z2amx19IA7G.jpg"
  // : "../public/light-mode-background.jpg";

  if (!isLoggedIn) return <Navigate to="/error" />;

  return (
    <div className="h-screen">
   
      <main className="flex items-center h-screen bg-[url('./../../public/835e8b4a-6aad-48b9-a105-cff386b3afc3.jpg')] dark:bg-cover dark:bg-[url('./../../public/240_F_362572396_7m4bza1L5UGWYeII0fH45Z2amx19IA7G.jpg')]">
        <div className="grid grid-cols-12 gap-12 mx-auto w-1/2 ">
          <Room type="Create" buttonEvt={create} title="Create" />
          <Room type="Join" buttonEvt={join} title="Join" />
        </div>
      </main>
      </div>
  );
}

export default QuizBoardPage;

import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Room from "../components/Room";
import { useNavigate } from "react-router-dom";

import { socket } from "../services/socket.service";
import { GameContext} from "../context/game.context";


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

  if (!isLoggedIn) return <Navigate to="/error" />;

  return (
    <div className="h-screen" style={{ backgroundImage: 'url("/public/istockphoto-857045822-612x612.jpg")', backgroundSize: 'cover' }}>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Live Quiz board
          </h1>
        </div>
      </header>
      <main className="flex items-center h-screen">
        <div className="grid grid-cols-12 gap-12 mx-auto w-1/2 ">
          <Room type="Create" buttonEvt={create} title="Create" />
          <Room type="Join" buttonEvt={join} title="Join" />
        </div>
      </main>
    </div>
  );
}

export default QuizBoardPage;

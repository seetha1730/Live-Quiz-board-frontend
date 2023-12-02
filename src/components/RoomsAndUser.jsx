// RoomsAndUser.jsx
import { useState, useEffect,useContext } from 'react';
import { GameContext } from '../context/game.context';
import { useNavigate } from 'react-router-dom';
import { socket } from "../services/socket.service";
import { ThemeContext } from '../context/theme.context';
import Button from './button/Button';
function RoomAndUsers() {
  const [roomUsers, setRoomUsers] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { gameContext } = useContext(GameContext);

   const { playerDetail } = useContext(GameContext);
  const navigate = useNavigate();


  useEffect(() => {
    socket.on('userJoined', (data) => {
console.log(data)
      setRoomUsers(data);
    });
  

    return () => {
      socket.off('userJoined');
      socket.off('result');
     
    };
  }, [roomUsers]);

  const leaveRoom = () => {
    navigate('/', { replace: true });
  };

   const endGame = (roomData) => {
    if (socket && socket.connected) {
      socket.emit("endGame", { roomName:roomData }); 
    }

  }
  return (

    <>
          <h2 className={` ${theme === 'dark' ? ' bg-gray-700' :' text-gradient '} mt-2 text-2xl font-bold mb-4 text-center `}>Users</h2>

  
      {roomUsers.length > 0}
      <ul role="list" className="divide-y divide-gray-100">
        {roomUsers.map((user,index) => (
          <li key={index}>
            <div className=" p-2 flex min-h-56 items-center cursor-pointer my-1 hover:bg-blue-lightest rounded grid grid-cols-12">
              <div className=" col-span-2 text-center py-1">
                <img className=" h-12 w-12 flex-none rounded-full bg-gray-50" alt="" />
              </div>
              <div className=" flex items-center col-span-7 h-10 px-1">

                <p className=" hover:text-blue-dark text-sm font-semibold text-wrap">{user.userName}</p>
              </div>
              <div className="col-span-3 h-10 text-right flex p-3">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1 mr-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div> <p className="text-xs text-grey-dark leading-5 text-gray-500">Online</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex justify-around p-3 mx-auto gap-2'>
    
      {gameContext && gameContext === "creator" ? ( 
        <>
        <Button color1="purple-button"  clickFunction={() => leaveRoom()} text="Leave Room"/>
        <Button color2="gradient-button" clickFunction={() => endGame(playerDetail.room)} text="End Game"/>

      
        </>):(

          <>
          <Button color1="purple-button"  clickFunction={() => leaveRoom()} text="Leave Room"/>
          </>
        )}
      </div>
    </>
  );
}

export default RoomAndUsers;

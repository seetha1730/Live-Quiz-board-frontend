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
  const { gameContext, setResult } = useContext(GameContext);
  const [endButtonVisible, setEndButtonVisible] = useState(true); 
   const { playerDetail } = useContext(GameContext);
   
  const navigate = useNavigate();
 
  useEffect(() => {
    socket.on('userJoined', (data) => {
      setRoomUsers(data);
    });

    return () => {
      socket.off('userJoined');
      socket.off('result');
     
    };
  }, [roomUsers]);

  const leaveRoom = () => {
    navigate('/', { replace: true });
    setResult(0);
  };

   const endGame = (roomData) => {
    if (socket && socket.connected) {
      socket.emit("endGame", { roomName:roomData }, (score) => {
        setResult(score)
        setEndButtonVisible(false)
      }); 
    }

  }


  return (

    <>
    <div className='p-2 m-2 sm:m-0 sm:p-0'>
          <h2 className={` ${theme === 'dark' ? ' bg-gray-700' :' text-gradient '}  text-2xl font-bold mb-4 text-center `}>Users</h2>  
      {roomUsers.length > 0}
      <ul role="list" className="mb-6 ">
        {roomUsers.map((user,index) => (
          <li key={index} className=" border-b border-purple-400">
            <div className=" p-2 flex min-h-56 items-center cursor-pointer my-1 hover:bg-blue-lightest rounded grid grid-cols-12">
              <div className=" col-span-2 text-center py-1">

             
              <div className="relative w-10 h-10 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
           </div>
             
              </div>
              <div className=" flex justify-start ml-3 items-center col-span-6 sm:col-span-6 md:col-span-6 h-10 px-1">

                <p className=" hover:text-blue-dark text-sm font-semibold text-wrap">{user.userName}</p>
              </div>
              <div className="col-span-4 sm:col-span-4 md:col-span-4 h-10 text-right justify-end flex p-3">
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
        
        <Button color1="purple-button " clickFunction={() => leaveRoom()} text="Leave Room"/>
         {endButtonVisible && <Button color2="gradient-button" clickFunction={() => endGame(playerDetail.room)} text="End Game"/> }

      
        </>):(

          <div className="mt-2">
          <Button color1="purple-button"  clickFunction={() => leaveRoom()} text="Leave Room"/>
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default RoomAndUsers;

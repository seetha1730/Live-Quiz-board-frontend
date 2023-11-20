// RoomsAndUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from "../services/socket.service";

function RoomAndUsers() {
  const [roomUsers, setRoomUsers] = useState([]);
 
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('userJoined', (data) => {
      console.log(data);
      setRoomUsers(data);
    });
  

    return () => {
      socket.off('userJoined');
     
    };
  }, [roomUsers]);

  const leaveRoom = () => {
    navigate('/', { replace: true });
  };


  return (

    <>
      <h5 className='text-gray-500 text-center p-2' >Users:</h5>
      {roomUsers.length > 0}
      <ul role="list" className="divide-y divide-gray-100">
        {roomUsers.map((user) => (
          <li key={user}>
            <div className=" p-2 flex min-h-56 items-center cursor-pointer my-1 hover:bg-blue-lightest rounded grid grid-cols-12">
              <div className=" col-span-2 text-center py-1">
                <img className=" h-12 w-14 flex-none rounded-full bg-gray-50" alt="" />
              </div>
              <div className=" flex items-center col-span-7 h-10 px-1">

                <p className=" hover:text-blue-dark text-sm font-semibold text-gray-900 text-wrap">{user.userName}</p>
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
      <div className='flex justify-center py-3'>
        <button onClick={leaveRoom} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group">
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">Leave</span>
          <span className="relative invisible">Leave</span>
        </button>


      </div>
    </>
  );
}

export default RoomAndUsers;

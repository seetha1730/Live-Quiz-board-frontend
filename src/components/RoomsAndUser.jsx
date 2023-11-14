// RoomsAndUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from "../services/socket.service";

function RoomAndUsers() {
    const [roomUsers, setRoomUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(""); //  the user's name stored 
    const navigate = useNavigate();
  
    useEffect(() => {
      socket.on('userJoined', (data) => {
        console.log(data);
        setRoomUsers([...roomUsers, data]);
      });
  
      return () => {
        socket.off('userJoined');
      };
    }, [roomUsers]); // Add roomUsers 
  
    const leaveRoom = () => {
      navigate('/', { replace: true });
    };
  
    return (
      <div>
        <h2></h2>
  
        <div>
          {roomUsers.length > 0 && <h5>Users:</h5>}
          <ul>
            {roomUsers.map((user, index) => (
              <li
                style={{
                  fontWeight: `${user === currentUser ? 'bold' : 'normal'}`, // Compare with the current user's name
                }}
                key={index}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>
  
        <button className='btn btn-outline' onClick={leaveRoom}>
          Leave
        </button>
      </div>
    );
  }

export default RoomAndUsers;

import { useContext ,useEffect, useState} from 'react';
import RoomAndUsers from "../components/RoomsAndUser";
import { GameContext } from '../context/game.context';
import CreatorRoom from '../components/CreatorRoom';
import PlayerQuestion from '../components/PlayerQuestion';
import Dots from '../components/Dots';
import { ThemeContext } from '../context/theme.context';

function GameRoom() {
  const { theme } = useContext(ThemeContext);
  const { gameContext} = useContext(GameContext);

  const [isToggleVisible, setIsToggleVisible] = useState(false);

  const toggleVisibility = () => {
    setIsToggleVisible(!isToggleVisible);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-5 min-h-screen grid grid-cols-12">
      {gameContext && gameContext === "creator" ? (
        <>

          <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-dull-purple border-light-purple' } hidden md:block gap-3 overflow-y-scroll h-screen col-span-4 m-5 mr-0 rounded-lg top-[3.8125rem]`}>
            <RoomAndUsers />
          </div>
       
         
            <div className={`p-5 md:hidden ${isToggleVisible ? 'visible' : 'invisible' }`}>
            <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-dull-purple border-light-purple' } md:hidden block overflow-y-scroll  gap-3 col-span-12 m-5 h-screen absolute z-30 w-10/12 rounded-lg top-[4.8125rem]`}>
            <RoomAndUsers  />
            </div>
          </div>
          
          
          
          <button onClick={toggleVisibility} className="mobile-toggle-button md:hidden text-gray-900 p-3 flex justify-center align-items-center rounded-full bg-white block">
  {isToggleVisible ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
   

  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>

  )}
</button>

          

          
         
          <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } gap-3 col-span-12 md:col-span-8 my-5 sm:m-5 rounded-lg`}>
            <div className="container">
            
            <Dots/>
            <div className="content h-screen w-full overflow-y-scroll">
            <CreatorRoom  />
            </div>
          </div>
            
          </div>

        
        </>
      ) : (
        <>
        <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-dull-purple border-light-purple' } hidden overflow-y-scroll md:block gap-3 h-screen col-span-4 m-5 rounded-lg top-[3.8125rem]`}>
        <RoomAndUsers />
          </div>
       
          <div className={`p-5 md:hidden ${isToggleVisible ? 'visible' : 'invisible' }`}>
            <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-dull-purple border-light-purple' } md:hidden block overflow-y-scroll h-screen  gap-3 col-span-12  absolute z-30 w-10/12 rounded-lg m-5 `}>
            
            <RoomAndUsers />
            </div>
          </div>
          
          
          <button onClick={toggleVisibility} className="mobile-toggle-button md:hidden text-gray-900 p-3 flex justify-center align-items-center rounded-full bg-white block">
  {isToggleVisible ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
   

  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>

  )}
</button>

          <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } gap-3 my-5 sm:m-5 col-span-12 md:col-span-8  rounded-lg`}>
          <div className="container rounded-lg">
          
          <Dots/>
          <div className="content h-screen w-full  flex items-center justify-center overflow-hidden">
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

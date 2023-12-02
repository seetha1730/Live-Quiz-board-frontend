import { useContext } from 'react';
import RoomAndUsers from "../components/RoomsAndUser";
import { GameContext } from '../context/game.context';
import CreatorRoom from '../components/CreatorRoom';
import PlayerQuestion from '../components/PlayerQuestion';
import Dots from '../components/Dots';
import { ThemeContext } from '../context/theme.context';
function GameRoom() {
  const { theme } = useContext(ThemeContext);
  const { gameContext} = useContext(GameContext);
 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen grid grid-cols-12">
      {gameContext && gameContext === "creator" ? (
        <>

          <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } gap-3 col-span-4 m-5 rounded-lg top-[3.8125rem]`}>
            <RoomAndUsers />
          </div>

          
         
          <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } gap-3 col-span-8 m-5 rounded-lg`}>
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
        <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } gap-3 col-span-4 m-5 rounded-lg top-[3.8125rem]`}>
            <RoomAndUsers />
          </div>
          <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } gap-3 col-span-8 m-5 rounded-lg`}>
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

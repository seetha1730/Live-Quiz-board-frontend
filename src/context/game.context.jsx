import { createContext, useState } from 'react'
  
const GameContext = createContext(null);

const GameContextWrapper = ({children}) => {
    const [gameContext, setGameContext] = useState('')
      const [playerDetail, setplayerDetail]=useState({userName:'', room: ''})

    const manageContext = (context,playerInfo,roomName) => {
        setGameContext(context)
        setplayerDetail({userName: playerInfo, room: roomName})
    }

    return (
     <GameContext.Provider value={{manageContext,gameContext,playerDetail}}>
        {children}
     </GameContext.Provider>
    )
}

export {GameContext, GameContextWrapper }
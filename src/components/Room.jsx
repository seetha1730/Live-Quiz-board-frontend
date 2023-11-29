import  {useState,useContext, useEffect} from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from '../context/theme.context';
function Room({ buttonEvt, title,socket ,background}) {
  const { theme } = useContext(ThemeContext);
  const [roomName, setRoomName] = useState('');
  const [name,setName] = useState('')
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log(user)

useEffect(() => {
  if(isLoggedIn){
    setName(user.name)
  }
},[user, isLoggedIn])

  return (
    <>
    <div className={` ${theme === 'dark' ? ' bg-gray-700' : ` ${background}`}  mt-10 mx-auto max-w-lg  w-11/12 col-span-12 md:grid md:col-span-6 md:9/12 md:gap-2 sm:col-span-12 p-5 rounded-[12px]`}>
      {/* <div className={theme === 'dark' ? "": "max-w-lg" }{" mt-10 mx-auto ${background}  w-11/12 col-span-12 md:grid md:col-span-6 md:9/12 md:gap-2 sm:col-span-12  p-5 rounded-[12px]"}> */}
        <div className="sm:col-span-12 ">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            {title} Quiz Room
          </h2>
          <form className="space-y-6" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className=" text-white block text-sm font-medium leading-6">
                  Name
                </label>
              </div>
              
                
                <div className="mt-2">
                <input
                  id="name"
                value={name}
                  type="text"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)} 
                  required
                
                  className={` ${theme === 'dark' ? ' bg-gray-500' : 'bg-white'} block w-full px-2  rounded-md border  p-1.5 shadow-sm  placeholder:text-white text-gray-700 `}
                />
              </div>
           

           
          
             </div>

            <div className="sm:col-span-12 ">
              <label htmlFor="roomName" className="block text-sm font-medium leading-6 text-white">
                Room Name
              </label>
              <div className="mt-2">
                <input
                  id="roomName"
                  value={roomName}
                  type="text"
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                  className={` ${theme === 'dark' ? ' bg-gray-500' : 'bg-white'} block w-full px-2  rounded-md border  p-1.5 shadow-sm  placeholder:text-white text-gray-700 `}
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => buttonEvt(roomName,name,user.email)}
                  className={` ${theme === 'dark' ? ' bg-gray-800' : 'purple-button border-light-purple '}  flex mx-auto w-6/12 md:w-4/12 rounded-3xl  text-white text-gray-200 justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}

                // className=""
              >
                {title} Room
              </button>
            </div>

           
          </form>
        </div>
      </div>
    </>
  );
}

export default Room;

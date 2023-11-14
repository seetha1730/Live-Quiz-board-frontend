import  {useState} from "react";


function Room({ buttonEvt, title,socket }) {

  const [roomName, setRoomName] = useState('');
  const [name,setName] = useState('')
  

  return (
    <>
      <div className="grid grid-cols-1 bg-gray-600 p-5 rounded-[12px] sm:mx-auto bg-gray sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            {title} Quiz Room
          </h2>
          <form className="space-y-6" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white-900">
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
                
                  className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="roomName" className="block text-sm font-medium leading-6 text-white-900">
                Room Name
              </label>
              <div className="mt-2">
                <input
                  id="roomName"
                  value={roomName}
                  type="text"
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => buttonEvt(roomName,name)}
                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

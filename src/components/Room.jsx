import  {useState} from "react";


function Room({ buttonEvt, title,socket }) {

  const [roomName, setRoomName] = useState('');
  const [name,setName] = useState('')
  

  return (
    <>
      <div className=" grid col-span-6 bg-[#eef4f4] p-5 rounded-[12px] bg-#1B1B23 ">
        <div className="">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-[#008489]">
            {title} Quiz Room
          </h2>
          <form className="space-y-6" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className=" text-[#008489] block text-sm font-medium leading-6">
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
                
                  className="block w-full px-2  rounded-md border-[#008489] border bg-white p-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="roomName" className="block text-sm font-medium leading-6 text-[#008489]">
                Room Name
              </label>
              <div className="mt-2">
                <input
                  id="roomName"
                  value={roomName}
                  type="text"
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                  className="block w-full rounded-md border-[#008489] border p-1.5  bg-white text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => buttonEvt(roomName,name)}
                className="flex w-full justify-center bg-[#008489] rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]"
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

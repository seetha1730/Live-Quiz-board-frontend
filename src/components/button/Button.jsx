import  {useContext} from "react";
import { ThemeContext } from '../../context/theme.context';
function Button({clickFunction,text,color1,color2,width}) {
  const { theme } = useContext(ThemeContext);
  return (
    
    <button
    onClick={clickFunction}
      className={` ${theme === 'dark' ? ' bg-gray-800 border-white' : `${color1} ${color2} border-light-purple `}  w-full flex mx-auto mt-2  md:w-full rounded-3xl  text-white text-gray-200 justify-center px-3  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#01C1C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01C1C2]`}
  >
    {text}
  </button>
   
  )
}

export default Button
import React from 'react'

function Button({clickFunction,text,color1,color2,width}) {
  return (
    <button
    onClick={clickFunction}
    className={`relative inline-flex items-center w-full justify-center h-12 mt-4 p-4 px-6 py-3 overflow-hidden  ${color1} font-medium text-white transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group`}
  >
    <span className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${color2}  group-hover:translate-x-0 ease`}>
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full text-white-500 transition-all duration-300 transform group-hover:translate-x-full ease">
    {text}
    </span>
    <span className="relative invisible">{text}</span>
  </button>
  )
}

export default Button
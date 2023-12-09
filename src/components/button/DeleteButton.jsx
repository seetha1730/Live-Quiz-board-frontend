import {  useContext } from "react";
import { ThemeContext } from '../../context/theme.context';
import PropTypes from 'prop-types';
function DeleteButton({onDelete,span}) {
  const { theme } = useContext(ThemeContext);
  
  return (
      <button onClick={onDelete} className={`${theme === 'dark' ? ' bg-gray-700 border-white' :' border-red-500 bg-base-purple '} flex items-center justify-center p-2.5  h-10 w-full    rounded-3xl hover:rounded-3xl hover:bg-red-800 transition-all duration-300 text-white ${span}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    </button>
  
  )
}

DeleteButton.propTypes = {

  onDelete: PropTypes.func,
  span: PropTypes.string,

};

export default DeleteButton
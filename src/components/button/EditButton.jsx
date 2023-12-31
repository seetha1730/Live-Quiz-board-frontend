import {  useContext } from "react";

import { ThemeContext } from '../../context/theme.context';
import PropTypes from 'prop-types';
function EditButton({ onEdit }) {
  const { theme } = useContext(ThemeContext);
  return (
 
    <button  onClick={onEdit} type="button" data-modal-target="select-modal" data-modal-toggle="select-modal" className={`${theme === 'dark' ? ' bg-gray-700 border-white' :' border-gray-100 bg-base-purple '} flex items-center  justify-center p-2.5 h-10 w-full rounded-3xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    </button>
  
  )
}
EditButton.propTypes = {

  onEdit: PropTypes.func,


};


export default EditButton;
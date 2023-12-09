import React from 'react'
import "./FancyButton.css"
import PropTypes from 'prop-types';
function FancyButton({ text, option, answerClick }) {
  return (
    <div className='w-100 ' onClick={() => answerClick(option)}>
      <a className=" rounded-lg animated-button text-center" href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {<div className='flex '><p>{option}</p><p className='ml-5'>{text} </p></div>}
      </a>
    </div>
  )
}
FancyButton.propTypes = {

  answerClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,

};


export default FancyButton
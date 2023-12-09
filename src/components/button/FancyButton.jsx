
import "./FancyButton.css"
import PropTypes from 'prop-types';
function FancyButton({ text, option, answerClick }) {
  return (
    <div className='w-100 ' onClick={() => answerClick(option)}>
      <span className=" rounded-lg animated-button text-center cursor-pointer" >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {<div className='flex '><p>{option}</p><p className='ml-5'>{text} </p></div>}
      </span>
    </div>
  )
}
FancyButton.propTypes = {

  answerClick: PropTypes.func,
  text: PropTypes.string,
  option: PropTypes.string,

};


export default FancyButton
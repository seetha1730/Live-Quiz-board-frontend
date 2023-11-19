import React from 'react'
import "./FancyButton.css"
function FancyButton({text,option, answerClick}) {
  return (
 
<div className='w-100 ' onClick={() => answerClick(option)}>
   

    <a className=" rounded-lg animated-button" href="#">
    
    <span></span>
  <span></span>
  <span></span>
<span></span>


      
 {<div className='flex '><p>{option}</p><p className='ml-5'>{text} </p></div>} 
 </a>
    </div>
  
  )
}

export default FancyButton
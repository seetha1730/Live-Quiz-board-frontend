import React, { useState } from 'react';
import "./AnimatedButton.css"

function AnimatedButton() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = () => {
    setIsSuccess(true);

    // Remove success class after 3000 milliseconds (3 seconds)
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <a
      className={`animatedButton ${isSuccess ? 'success' : ''}`}
      onClick={handleClick}
      href="#"
      role="button"
    >
      <span>Remove</span>
      <div className="icon">
        <i className="fa fa-remove"></i>
        <i className="fa fa-check"></i>
      </div>
    </a>
  );
}

export default AnimatedButton;
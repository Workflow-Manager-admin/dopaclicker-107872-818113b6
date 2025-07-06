import React, { useState } from 'react';

// PUBLIC_INTERFACE
const GameButton = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <button 
      className={`game-button ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
      aria-label="Click to earn points"
    >
      Click Me!
    </button>
  );
};

export default GameButton;

import React from 'react';

// PUBLIC_INTERFACE
const ProgressBar = ({ current, max, level }) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="level">Level {level}</span>
        <span className="xp">{current}/{max} XP</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

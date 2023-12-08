// components/Star.js

// components/Star.js
import React from 'react';

const Star = ({ filled }) => {
  return (
    <span role="img" aria-label="star" style={{ fontSize:"10px", color: filled ? '#FFD700' : 'transparent' }}>
      ⭐
    </span>
  );
};

export default Star;

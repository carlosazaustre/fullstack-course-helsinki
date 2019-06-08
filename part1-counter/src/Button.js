import React from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      { text }
    </button>
  );
}

export default Button;
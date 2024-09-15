import React from 'react';

const Button = ({ children, onClick, className, type = 'button' }) => {
  return (
    <button 
      onClick={onClick} 
      className={`button ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
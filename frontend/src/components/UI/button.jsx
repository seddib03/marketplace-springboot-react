// src/components/ui/button.jsx
import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

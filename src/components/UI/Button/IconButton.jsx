// IconButton.js
import React from "react";

const IconButton = ({ icon: IconComponent, onClick, label }) => {
  return (
    <button
      className="text-gray-600 hover:text-gray-800 focus:outline-none"
      onClick={onClick}
      aria-label={label}
    >
      {IconComponent && <IconComponent className="text-xl" />}
    </button>
  );
};

export default IconButton;

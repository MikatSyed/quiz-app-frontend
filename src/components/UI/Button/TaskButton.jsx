// TaskButton.js
import React from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TaskButton = ({ type, onClick }) => {
  const renderButton = () => {
    switch (type) {
      case "edit":
        return (
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClick}
          >
            <FaEdit className="text-xl" />
          </button>
        );
      case "complete":
        return (
          <button
            className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
            onClick={onClick}
          >
            Complete
          </button>
        );
      case "incomplete":
        return (
          <button
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full"
            onClick={onClick}
          >
            Incomplete
          </button>
        );
      case "delete":
        return (
          <button
            className="text-red-600 hover:text-red-800 focus:outline-none"
            onClick={onClick}
          >
            <MdDelete className="text-xl" />
          </button>
        );
      default:
        return null;
    }
  };

  return renderButton();
};

export default TaskButton;

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen"> {/* Use h-screen for full height */}
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-800"></div>
     
    </div>
  );
};

export default LoadingSpinner;

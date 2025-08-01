"use client";

import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white bg-opacity-80 flex items-center justify-center backdrop-blur-sm">
      <p className="text-gray-600 text-xl font-medium">...loading</p>
    </div>
  );
};

export default LoadingOverlay;

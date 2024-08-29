import React from 'react';
import './Loading.css'; // You'll create this file for styling

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-text">QuickHire</div>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loading;
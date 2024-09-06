import React from 'react';
import './Loading.css'; // Your styling

function Loading() {
  return (
    <div className="loading-container">
      <div className="logo-wrapper">
        <img src="/logo2.svg" alt="Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default Loading;

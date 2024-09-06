import React, { useEffect } from 'react';
import './Loading.css'; // Your styling

function Loading() {

  useEffect(() => {
    // Set visibility to visible once the component has mounted
    const loadingContainer = document.querySelector('.loading-container');
    loadingContainer.style.visibility = 'visible';
  }, []);

  return (
    <div className="loading-container" style={{ visibility: 'hidden' }}>
      <div className="logo-wrapper">
        <img src="/logo2.svg" alt="Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default Loading;

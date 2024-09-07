import React, { useEffect } from 'react';
import './Loading.css';

function Loading() {
  useEffect(() => {
    const loadingContainer = document.querySelector('.loading-container');
    loadingContainer.classList.remove('hidden');
  }, []);

  return (
    <div className="loading-container hidden">
      <div className="logo-wrapper">
        <img src="/logo2.svg" alt="Logoo" className="loading-logo" />
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default Loading;

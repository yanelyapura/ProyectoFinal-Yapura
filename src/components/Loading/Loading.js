import React from 'react';
import './Loading.css';

const Loading = ({ message = "Cargando productos..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;


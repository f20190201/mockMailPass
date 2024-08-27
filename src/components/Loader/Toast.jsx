import React, { useState, useEffect } from 'react';
import './Toast.css'; // Import the CSS file for styling

function Toast({ message, onClose }) {

  return (
    <div className="toast">
      {message}
    </div>
  );
}

export default Toast;

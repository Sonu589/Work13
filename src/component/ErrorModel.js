// ErrorModal.js
import React from "react";
import "./css/ErrorModel.css";

function ErrorModel({ message, onClose }) {
  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
}

export default ErrorModel;

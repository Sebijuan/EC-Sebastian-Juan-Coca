import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>SI</button>
        <button onClick={onCancel}>NO</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
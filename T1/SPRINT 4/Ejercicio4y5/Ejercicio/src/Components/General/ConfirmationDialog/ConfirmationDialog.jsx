import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="dialog-actions">
          <button onClick={onConfirm}>SI</button>
          <button onClick={onCancel}>NO</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
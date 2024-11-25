import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content confirmation-dialog">
        <p>{message}</p>
        <div className="dialog-actions">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

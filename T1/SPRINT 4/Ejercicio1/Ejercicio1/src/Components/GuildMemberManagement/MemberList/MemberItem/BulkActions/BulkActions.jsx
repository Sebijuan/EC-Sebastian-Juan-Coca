import React from 'react';
import './BulkActions.css';

const BulkActions = ({ selectedMembers, onAction }) => {
  if (selectedMembers.length === 0) {
    return null;
  }

  const handleAction = (action) => {
    onAction(action);
  };

  return (
    <div className="bulk-actions">
      <button onClick={() => handleAction('sendMessage')}>Enviar Mensaje</button>
      <button onClick={() => handleAction('changeRole')}>
        Cambiar Rol del Gremio
      </button>
      <button onClick={() => handleAction('delete')}>
        Eliminar Miembros
      </button>
    </div>
  );
};

export default BulkActions;

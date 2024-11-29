import React, { useState } from 'react';
import './BulkActions.css';

const BulkActions = ({ selectedMembers, onAction }) => {
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  if (selectedMembers.length === 0) {
    return null;
  }

  const handleAction = (action) => {
    try {
      onAction(action);
      setNotification(`Acción '${action}' aplicada con éxito a los miembros seleccionados.`);
      setError('');
    } catch (err) {
      setError(`Error al aplicar la acción '${action}': ${err.message}`);
      setNotification('');
    }
  };

  return (
    <div className="bulk-actions">
      {notification && <div className="notification">{notification}</div>}
      {error && <div className="error">{error}</div>}
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

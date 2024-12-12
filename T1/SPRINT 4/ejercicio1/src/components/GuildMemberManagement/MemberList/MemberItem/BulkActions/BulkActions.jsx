import React, { useState, useEffect } from 'react';
import './BulkActions.css';
import ConfirmationDialog from '../../../../general/ConfirmationDialog/ConfirmationDialog';
import NotificationSystem from '../../../../general/NotificationSystem/NotificationSystem';

const BulkActions = ({ selectedMembers, onApplyRoleChange, onDeleteMembers }) => {
  const [guildRole, setGuildRole] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogRole, setShowDialogRole] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!selectedMembers.length) {
      setGuildRole('');
    }
  }, [selectedMembers]);

  const handleCancel = () => {
    setShowDialogDelete(false);
    setShowDialogRole(false);
  };

  const handleRoleChange = async () => {
    setShowDialogRole(true);
  };

  const handleDeleteMembers = async () => {
   setShowDialogDelete(true);
  };

  const handleConfirmRoleChange = async () => {
    setShowDialogRole(false);
    if (!selectedMembers.length) {
      alert('No hay miembros seleccionados.');
      return;
    }

    setIsProcessing(true);

    try {
      for (const memberId of selectedMembers) {
        await fetch(`http://localhost:3000/guildmembers/${memberId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guild_role: guildRole,
          }),
        });
      }

      setNotification({ message: 'Roles actualizados exitosamente.', type: 'success' });
    } catch (error) {
      console.error('Error:', error);
     setNotification({ message: 'No se pudo actualizar los roles. Intentalo nuevamente', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  }

  const handleConfirmDelete = async () => {
    setShowDialogDelete(false);
    if (!selectedMembers.length) {
      alert('No hay miembros seleccionados.');
      return;
    }

    setIsProcessing(true);

    try {
      for (const memberId of selectedMembers) {
        const response = await fetch(`http://localhost:3000/guildmembers/${memberId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar los miembros.');
        }

        const data = await response.json();
        console.log('Miembro eliminado exitosamente:', data);
      }

      setNotification({ message: 'Miembros eliminados exitosamente.', type: 'success' });
    } catch (error) {
      console.error('Error:', error);
     setNotification({ message: 'No se pudo eliminar los miembros. Intentalo nuevamente', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="bulk-actions">
      <select
        name='bulk-actions'
        value={guildRole}
        onChange={(e) => setGuildRole(e.target.value)}
        required
        disabled={isProcessing}
      >
        <option value="">Selecciona un rol</option>
        <option value="LIDER">LIDER</option>
        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
        <option value="GERENTE">GERENTE</option>
        <option value="GERENTE A2">GERENTE A2</option>
        <option value="ALPHA 2">ALPHA 2</option>
        <option value="MEMBER">MEMBER</option>
      </select>
      <button onClick={handleRoleChange} disabled={!guildRole || isProcessing}>
        {isProcessing ? 'Procesando...' : 'Aplicar Cambio de Rol'}
      </button>
      <button onClick={handleDeleteMembers} disabled={isProcessing}>
        {isProcessing ? 'Procesando...' : 'Eliminar Miembros'}
      </button>
      {showDialogDelete && (
        <ConfirmationDialog
          message= '¿Estás seguro de que deseas eliminar a los miembros seleccionados?'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}

      {showDialogRole && (
        <ConfirmationDialog
          message= '¿Estás seguro de que deseas editar a los miembros seleccionados?'
          onConfirm={handleConfirmRoleChange}
          onCancel={handleCancel}
        />
      )}
      {notification && (
        <NotificationSystem
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default BulkActions;

import React, { useState } from 'react';
import './MemberItem.css';
import MemberDetailsModal from './MemberDetailsModal/MemberDetailsModal';
import MemberEditModal from './MemberEditModal/MemberEditModal';
import ConfirmationDialog from '../../../general/ConfirmationDialog/ConfirmationDialog';
import NotificationSystem from '../../../general/NotificationSystem/NotificationSystem';

const MemberItem = ({ member, isSelected, onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleConfirm = async () => {
    setShowDialog(false);
    try {
      console.log('Eliminando miembro con ID:', member.user_id);
  
      const response = await fetch(`http://localhost:3000/guildmembers/${member.user_id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el miembro: ${response.statusText}`);
      }
  
      setNotification({ message: 'Miembro eliminado exitosamente.', type: 'success' });
      
      // Opcional: Notificar al usuario y actualizar la lista
    } catch (error) {
      console.error('Error al eliminar el miembro:', error);
      setNotification({ message: 'No se pudo eliminar el miembro. Intentalo nuevamente', type: 'error' });
    }
  };

  const handleDelete = () => {
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleUsernameClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSave = (updatedMember) => {
    // Actualizar el miembro con los datos editados
    setIsEditModalOpen(false);
    setNotification({ message: 'Miembro actualizado con éxito', type: 'success' });
    // Aquí puedes actualizar el estado del miembro si es necesario
  };

  return (
    <>
    <tr>
    <td>
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={() => onSelect(member.user_id)} 
          />
        </td>
      <td>{member.user_id}</td>
      <td onClick={handleUsernameClick} style={{ cursor: 'pointer', color: 'blue' }}>
        {member.username}
      </td>
      <td>{member.level}</td>
      <td>{member.ilvl}</td>
      <td>{member.guild_role}</td>
      <td>{member.character_role}</td>
      <td>{member.main_archetype}</td>
      <td>{member.secondary_archetype}</td>
      <td>{member.grandmaster_profession_one}</td>
      <td>{member.grandmaster_profession_two}</td>
      <td>
        <button className='Editar' onClick={handleEditClick}>Editar</button>
        <button className='Eliminar' onClick={handleDelete}>Eliminar</button>
      </td>
    </tr>
    {isModalOpen && (
      <MemberDetailsModal member={member} onClose={handleCloseModal} />
    )}
    {isEditModalOpen && (
      <MemberEditModal member={member} onSave={handleEditSave} onClose={handleCloseEditModal} />
    )}
    {showDialog && (
        <ConfirmationDialog
          message="¿Estás seguro que quieres eliminar este miembro?"
          onConfirm={handleConfirm}
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
  </>
  );
};

export default MemberItem;

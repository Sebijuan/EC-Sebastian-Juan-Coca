import React from 'react';
import './MemberDetailsModal.css';

const MemberDetailsModal = ({ member, onClose }) => {
  if (!member) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles del Miembro</h2>
        <p><strong>Username:</strong> {member.username}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Nivel:</strong> {member.level}</p>
        <p><strong>Última Actividad:</strong> {member.lastActivity}</p>
        {/* Agregar más detalles según el esquema */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default MemberDetailsModal;

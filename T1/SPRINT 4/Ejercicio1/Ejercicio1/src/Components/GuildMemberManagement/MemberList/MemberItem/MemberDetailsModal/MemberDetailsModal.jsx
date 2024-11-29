import React, { useState } from 'react';
import './MemberDetailsModal.css';

const MemberDetailsModal = ({ member }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!member) {
    return null;
  }

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span onClick={handleOpen} className="username-link">{member.username}</span>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalles del Miembro</h2>
            <p><strong>Username:</strong> {member.username}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Nivel:</strong> {member.level}</p>
            <p><strong>Última Actividad:</strong> {member.lastActivity}</p>
            {/* Agregar más detalles según el esquema */}
            <button onClick={handleClose}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberDetailsModal;

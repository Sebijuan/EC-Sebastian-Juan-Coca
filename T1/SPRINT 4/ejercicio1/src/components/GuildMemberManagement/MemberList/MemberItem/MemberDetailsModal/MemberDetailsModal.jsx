import React from 'react';
import './MemberDetailsModal.css';

const MemberDetailsModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles del Miembro</h2>
        <p><strong>ID de Usuario:</strong> {member.user_id}</p>
        <p><strong>Nombre de Usuario:</strong> {member.username}</p>
        <p><strong>Nivel:</strong> {member.level}</p>
        <p><strong>iLvl:</strong> {member.ilvl}</p>
        <p><strong>Rol en la Guild:</strong> {member.guild_role}</p>
        <p><strong>Rol del Personaje:</strong> {member.character_role}</p>
        <p><strong>Arquetipo Principal:</strong> {member.main_archetype}</p>
        <p><strong>Arquetipo Secundario:</strong> {member.secondary_archetype}</p>
        <p><strong>Profesión Gran Maestro Uno:</strong> {member.grandmaster_profession_one}</p>
        <p><strong>Profesión Gran Maestro Dos:</strong> {member.grandmaster_profession_two}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default MemberDetailsModal;
import React from 'react';
import './MemberItem.css';

const MemberItem = ({ member, onSelect, onEdit, onDelete, onToggleSelect }) => {
  return (
    <div className="member-item">
      <input type="checkbox" onChange={() => onToggleSelect(member.user_id)} />
      <span>{member.username}</span>
      <div className="member-item-buttons">
        <button onClick={() => onEdit(member.user_id)}>Editar</button>
        <button onClick={() => onDelete(member.user_id)}>Eliminar</button>
        <button onClick={() => onSelect(member.user_id)}>Seleccionar</button>
      </div>
    </div>
  );
};

export default MemberItem;

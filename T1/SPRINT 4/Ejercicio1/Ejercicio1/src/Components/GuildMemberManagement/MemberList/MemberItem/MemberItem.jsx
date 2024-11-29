import React from 'react';
import './MemberItem.css';

const MemberItem = ({ member, onSelect }) => {
  return (
    <div className="member-item">
      <span>{member.username}</span>
      <button onClick={() => onSelect(member.user_id)}>Seleccionar</button>
    </div>
  );
};

export default MemberItem;

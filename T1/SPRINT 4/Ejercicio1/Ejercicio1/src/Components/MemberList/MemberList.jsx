import React from 'react';
import './MemberList.css';
import MemberItem from '../MemberItem/MemberItem';

const MemberList = ({ members, onSelectionChange }) => {
  const handleSelection = (selectedIds) => {
    onSelectionChange(selectedIds);
  };

  return (
    <div className="member-list">
      {members.map((member) => (
        <MemberItem
          key={member.user_id}
          member={member}
          onSelect={handleSelection}
        />
      ))}
    </div>
  );
};

export default MemberList;

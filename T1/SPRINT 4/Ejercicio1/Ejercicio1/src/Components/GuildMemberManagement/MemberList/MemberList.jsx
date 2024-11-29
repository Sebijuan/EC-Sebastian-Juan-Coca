import React from 'react';
import './MemberList.css';
import MemberItem from './MemberItem/MemberItem';

const MemberList = ({
  members,
  currentPage,
  itemsPerPage,
  selectedMembers,
  onMemberClick,
  onEditClick,
  onDeleteClick,
  onSelectMember,
  onSelectAll,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = members.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="member-list">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={(e) => onSelectAll(e.target.checked)} /></th>
            <th>user_id</th>
            <th>username</th>
            <th>level</th>
            <th>ilvl</th>
            <th>character_role</th>
            <th>guild_role</th>
            <th>main_archetype</th>
            <th>secondary_archetype</th>
            <th>grandmaster_profession_one</th>
            <th>grandmaster_profession_two</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member.user_id}>
              <td><input type="checkbox" checked={selectedMembers.includes(member.user_id)} onChange={() => onSelectMember(member.user_id)} /></td>
              <td>{member.user_id}</td>
              <td onClick={() => onMemberClick(member)}>{member.username}</td>
              <td>{member.level}</td>
              <td>{member.ilvl}</td>
              <td>{member.character_role}</td>
              <td>{member.guild_role}</td>
              <td>{member.main_archetype}</td>
              <td>{member.secondary_archetype}</td>
              <td>{member.grandmaster_profession_one}</td>
              <td>{member.grandmaster_profession_two}</td>
              <td>
                <button onClick={() => onEditClick(member)}>Edit</button>
                <button onClick={() => onDeleteClick(member)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;

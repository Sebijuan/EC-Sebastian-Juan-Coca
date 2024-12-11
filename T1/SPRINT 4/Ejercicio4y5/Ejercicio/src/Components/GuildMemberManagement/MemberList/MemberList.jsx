import React, { useState } from 'react';
import './MemberList.css'; // Importa tu archivo de estilos CSS
import MemberItem from './MemberItem/MemberItem'; 
import Pagination from './Pagination/Pagination';
import BulkActions from './MemberItem/BulkActions/BulkActions';

const MemberList = ({ members }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Cálculo de índices para paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  // Función para manejar selección
  const handleSelect = (userId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((member) => member.user_id));
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="member-list-container">
      {members.length > 0 ? (
        <>
          <button onClick={handleSelectAll}>
            {selectedMembers.length === members.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
          </button>
          <Pagination
            totalItems={members.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <table className="member-list-table">
            <thead>
              <tr>
                <th>Seleccionar</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Level</th>
                <th>iLvl</th>
                <th>Guild Role</th>
                <th>Character Role</th>
                <th>Main archetype</th>
                <th>Secondary archetype</th>
                <th>GrandMaster profession one</th>
                <th>GrandMaster profession two</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member) => (
                <MemberItem
                  key={member.user_id}
                  member={member}
                  onSelect={handleSelect}
                  isSelected={selectedMembers.includes(member.user_id)}
                />
              ))}
            </tbody>
          </table>
          {/* Paginación */}
          
          {selectedMembers.length > 0 && (
            <BulkActions
              selectedMembers={selectedMembers}
            />
          )}
        </>
      ) : (
        <p>No se encontraron miembros.</p>
      )}
    </div>
  );
};

export default MemberList;
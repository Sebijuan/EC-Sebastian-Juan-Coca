import React from 'react';
// ...existing code...
import { bulkDeleteMembers } from '../../../services/guildmember_API';

const BulkActions = ({ selectedMembers, onActionComplete }) => {
  // ...existing code...

  const handleBulkDelete = async () => {
    try {
      await bulkDeleteMembers(selectedMembers);
      onActionComplete();
    } catch (error) {
      console.error("Error al eliminar los miembros:", error);
    }
  };

  // ...existing code...
};

export default BulkActions;

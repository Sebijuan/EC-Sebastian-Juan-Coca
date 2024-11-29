import React, { useState, useEffect, useMemo, useCallback } from "react";
import FilterBar from './FilterBar/FilterBar';
import SortControls from './SortControls/SortControls';
import MemberList from './MemberList/MemberList';
import BulkActions from './MemberList/MemberItem/BulkActions/BulkActions';
import MemberDetailsModal from './MemberList/MemberItem/MemberDetailsModal/MemberDetailsModal';
import MemberEditModal from './MemberList/MemberItem/MemberEditModal/MemberEditModal';
import Pagination from './MemberList/Pagination/Pagination';
import ConfirmationDialog from '../../General/ConfirmationDialog/ConfirmationDialog';
import NotificationSystem from '../../General/NotificationSystem/NotificationSystem';
import AppHeader from '../../General/AppHeader/AppHeader';

const GuildMemberManagement = () => {
  // Estados principales
  const [members, setMembers] = useState([]); // Lista completa de miembros
  const [filteredMembers, setFilteredMembers] = useState([]); // Miembros filtrados
  const [selectedMembers, setSelectedMembers] = useState([]); // Miembros seleccionados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(10); // Miembros por página
  const [sortConfig, setSortConfig] = useState(null); // Configuración de ordenamiento
  const [filters, setFilters] = useState({}); // Filtros activos
  const [modalMember, setModalMember] = useState(null); // Miembro activo en el modal de detalles
  const [editMember, setEditMember] = useState(null); // Miembro activo en el modal de edición
  const [confirmation, setConfirmation] = useState(null); // Acción de confirmación activa
  const [notifications, setNotifications] = useState([]); // Lista de notificaciones

  // Cargar datos desde la API al iniciar
  useEffect(() => {
    fetch("/localhost:3000/guildmembers")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setFilteredMembers(data);
      })
      .catch((error) => {
        addNotification("Error al cargar datos", "error");
      });
  }, []);

  // Actualizar miembros filtrados cuando cambian los filtros
  useEffect(() => {
    let filtered = [...members];
    // Aplicar filtros aquí (ej. nivel, rol, etc.)
    Object.keys(filters).forEach((key) => {
      filtered = filtered.filter((member) => member[key] === filters[key]);
    });
    setFilteredMembers(filtered);
  }, [filters, members]);

  // Notificaciones
  const addNotification = (message, type = "info") => {
    setNotifications((prev) => [...prev, { message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  // Selección múltiple
  const handleSelectMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (selectAll) => {
    if (selectAll) {
      const currentMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setSelectedMembers(currentMembers.map((member) => member.user_id));
    } else {
      setSelectedMembers([]);
    }
  };

  // Ordenamiento
  const handleSort = useCallback((column) => {
    const newSortConfig =
      sortConfig?.key === column && sortConfig.direction === "asc"
        ? { key: column, direction: "desc" }
        : { key: column, direction: "asc" };

    setSortConfig(newSortConfig);

    const sorted = [...filteredMembers].sort((a, b) => {
      if (a[column] < b[column]) return newSortConfig.direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newSortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredMembers(sorted);
  }, [filteredMembers, sortConfig]);

  // Manejo de acciones en lote
  const handleBulkAction = useCallback((action) => {
    if (action === "delete") {
      setConfirmation({
        message: `¿Eliminar ${selectedMembers.length} miembros seleccionados?`,
        onConfirm: () => {
          setMembers((prev) =>
            prev.filter((member) => !selectedMembers.includes(member.user_id))
          );
          setSelectedMembers([]);
          addNotification("Miembros eliminados con éxito", "success");
        },
      });
    } else if (action === "changeRole") {
      // Implementar lógica para cambiar el rol del gremio
    }
  }, [selectedMembers]);

  // Paginación
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((event) => {
    setItemsPerPage(Number(event.target.value));
  }, []);

  return (
    <div className="guild-management">
      <AppHeader />
      <NotificationSystem notifications={notifications} onRemove={(index) => setNotifications((prev) => prev.filter((_, i) => i !== index))} />
      <FilterBar onFilterChange={setFilters} />
      <SortControls onSortChange={handleSort} sortConfig={sortConfig} />
      <BulkActions selectedMembers={selectedMembers} onAction={handleBulkAction} />
      <MemberList
        members={filteredMembers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        selectedMembers={selectedMembers}
        onMemberClick={(member) => setModalMember(member)}
        onEditClick={(member) => setEditMember(member)}
        onDeleteClick={(member) =>
          setConfirmation({
            message: `¿Eliminar a ${member.username}?`,
            onConfirm: () => {
              setMembers((prev) =>
                prev.filter((m) => m.user_id !== member.user_id)
              );
              addNotification(`${member.username} eliminado con éxito`, "success");
            },
          })
        }
        onSelectMember={handleSelectMember}
        onSelectAll={handleSelectAll}
      />
      <div className="pagination-controls">
        <label>
          Items per page:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      <Pagination
        totalPages={Math.ceil(filteredMembers.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {modalMember && <MemberDetailsModal member={modalMember} onClose={() => setModalMember(null)} />}
      {editMember && (
        <MemberEditModal
          member={editMember}
          onSave={(updatedMember) => {
            setMembers((prev) =>
              prev.map((member) =>
                member.user_id === updatedMember.user_id ? updatedMember : member
              )
            );
            addNotification(`${updatedMember.username} actualizado`, "success");
            setEditMember(null);
          }}
          onClose={() => setEditMember(null)}
        />
      )}
      {confirmation && (
        <ConfirmationDialog
          message={confirmation.message}
          onConfirm={() => {
            confirmation.onConfirm();
            setConfirmation(null);
          }}
          onCancel={() => setConfirmation(null)}
        />
      )}
    </div>
  );
};

export default GuildMemberManagement;

import React, { useState, useEffect } from "react";
import FilterBar from "../FilterBar/FilterBar";
import SortControls from "../SortControls/SortControls";
import MemberList from "../MemberList/MemberList";
import BulkActions from "../BulkActions/BulkActions";
import MemberDetailsModal from "../MemberDetailsModal/MemberDetailsModal";
import MemberEditModal from "../MemberEditModal/MemberEditModal";
import Pagination from "../Pagination/Pagination";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import NotificationSystem from "../NotificationSystem/NotificationSystem";
import AppHeader from "../AppHeader/AppHeader";

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
    fetch("/localhost:3000/guildmenbers")
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
  const handleSort = (column) => {
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
  };

  // Manejo de acciones en lote
  const handleBulkAction = (action) => {
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
    }
    // Otras acciones como enviar mensaje o cambiar rol se implementan aquí
  };

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
      <Pagination
        totalPages={Math.ceil(filteredMembers.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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

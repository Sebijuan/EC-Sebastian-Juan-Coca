import React, { useState } from 'react';
import './MemberEditModal.css';

const MemberEditModal = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...member });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Miembro</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {/* Agregar más campos editables */}
          <button type="button" onClick={handleSubmit}>
            Guardar
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberEditModal;

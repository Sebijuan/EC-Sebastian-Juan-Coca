import React, { useState } from 'react';
import './MemberEditModal.css';

const MemberEditModal = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...member });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, email: 'Email is invalid' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = () => {
    // Final validation before save
    if (!formData.username) {
      setErrors({ ...errors, username: 'Username is required' });
      return;
    }
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }
    if (errors.email) {
      return;
    }
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
            {errors.username && <span className="error">{errors.username}</span>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
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

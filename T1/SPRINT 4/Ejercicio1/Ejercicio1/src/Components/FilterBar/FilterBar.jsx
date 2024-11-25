import React from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilter }) => {
  const handleInputChange = (e) => {
    onFilter({ [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="characterRole"
        placeholder="Rol del personaje"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="guildRole"
        placeholder="Rol en el gremio"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="minLevel"
        placeholder="Nivel mínimo"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="maxLevel"
        placeholder="Nivel máximo"
        onChange={handleInputChange}
      />
      {/* Agregar más filtros según sea necesario */}
    </div>
  );
};

export default FilterBar;

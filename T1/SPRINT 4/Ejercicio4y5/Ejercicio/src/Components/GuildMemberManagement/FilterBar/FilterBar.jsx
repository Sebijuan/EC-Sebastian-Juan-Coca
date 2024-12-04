import React from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilter }) => {
  const handleInputChange = (e) => {
    onFilter({ [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <input type="text" name="character_role" placeholder="Rol del personaje" onChange={handleInputChange} />
      <input type="text" name="guild_role" placeholder="Rol en el gremio" onChange={handleInputChange} />
      <input type="text" name="main_archetype" placeholder="Arquetipo Principal" onChange={handleInputChange} />
      <input type="text" name="secondary_archetype" placeholder="Arquetipo Secundario" onChange={handleInputChange} />
      <input type="text" name="grandmaster_profession_one" placeholder="Profesión 1" onChange={handleInputChange} />
      <input type="text" name="grandmaster_profession_two" placeholder="Profesión 2" onChange={handleInputChange} />
      <input type="number" name="minLevel" placeholder="Nivel mínimo" onChange={handleInputChange} />
      <input type="number" name="maxLevel" placeholder="Nivel máximo" onChange={handleInputChange} />
      <input type="number" name="minIlvl" placeholder="Item Level mínimo" onChange={handleInputChange} />
      <input type="number" name="maxIlvl" placeholder="Item Level máximo" onChange={handleInputChange} />
      <select name="status" onChange={handleInputChange}>
        <option value="">Estado</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
      <input type="range" name="experience" min="0" max="100" onChange={handleInputChange} />
    </div>
  );
};

export default FilterBar;

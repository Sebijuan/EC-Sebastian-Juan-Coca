import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filters, onFilterChange }) => {
  // Función para manejar los cambios en los campos de filtro
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  // Función que se ejecuta al hacer clic en el botón de filtro
 

  return (
    <div className="filter-bar">
      {/* Filtro por Username */}
      <input
        type="text"
        name="username"
        placeholder="Buscar por username"
        value={filters.username || ""}
        onChange={handleChange}
      />
      
      {/* Filtro por Character Role */}
      <select
        name="character_role"
        value={filters.character_role || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un rol de personaje</option>
        <option value="TANK">TANK</option>
        <option value="HEALER">HEALER</option>
        <option value="DAMAGE">DAMAGE</option>
        <option value="SUPPORT">SUPPORT</option>
      </select>

      {/* Filtro por Guild Role */}
      <select
        name="guild_role"
        value={filters.guild_role || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un rol de Guild</option>
        <option value="LIDER">LIDER</option>
        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
        <option value="GERENTE">GERENTE</option>
        <option value="ALPHA 2">ALPHA 2</option>
        <option value="MEMBER">MEMBER</option>
      </select>

      {/* Filtro por Main Archetype */}
      <select
        name="main_archetype"
        value={filters.main_archetype || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un Main Archetype</option>
        <option value="BARD">BARD</option>
        <option value="CLERIC">CLERIC</option>
        <option value="FIGHTER">FIGHTER</option>
        <option value="MAGE">MAGE</option>
        <option value="RANGER">RANGER</option>
        <option value="ROGUE">ROGUE</option>
        <option value="SUMMONER">SUMMONER</option>
        <option value="TANK">TANK</option>
      </select>

      {/* Filtro por Secondary Archetype */}
      <select
        name="secondary_archetype"
        value={filters.secondary_archetype || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un Secondary Archetype</option>
        <option value="BARD">BARD</option>
        <option value="CLERIC">CLERIC</option>
        <option value="FIGHTER">FIGHTER</option>
        <option value="MAGE">MAGE</option>
        <option value="RANGER">RANGER</option>
        <option value="ROGUE">ROGUE</option>
        <option value="SUMMONER">SUMMONER</option>
        <option value="TANK">TANK</option>
      </select>

      {/* Filtro por Grandmaster Profession One */}
      <select
        name="grandmaster_profession_one"
        value={filters.grandmaster_profession_one || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona una Grandmaster Profession 1</option>
        <option value="FISHING">FISHING</option>
        <option value="HERBALISM">HERBALISM</option>
        <option value="HUNTING">HUNTING</option>
        <option value="MINING">MINING</option>
      </select>

      {/* Filtro por Grandmaster Profession Two */}
      <select
        name="grandmaster_profession_two"
        value={filters.grandmaster_profession_two || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona una Grandmaster Profession 2</option>
        <option value="FISHING">FISHING</option>
        <option value="HERBALISM">HERBALISM</option>
        <option value="HUNTING">HUNTING</option>
        <option value="MINING">MINING</option>
      </select>

      {/* Filtro por Nivel mínimo */}
      <input
        type="number"
        name="min_level"
        placeholder="Nivel mínimo"
        value={filters.min_level || ""}
        onChange={handleChange}
      />

      {/* Filtro por Nivel máximo */}
      <input
        type="number"
        name="max_level"
        placeholder="Nivel máximo"
        value={filters.max_level || ""}
        onChange={handleChange}
      />

      {/* Botón para aplicar el filtro */}
      
    </div>
  );
};

export default FilterBar;

import React from 'react';
import './SortControls.css';

const SortControls = ({ onSort }) => {
  return (
    <div className="sort-controls">
      <button onClick={() => onSort('user_id')}>Ordenar por ID</button>
      <button onClick={() => onSort('username')}>Ordenar por Nombre</button>
      <button onClick={() => onSort('level')}>Ordenar por Nivel</button>
      <button onClick={() => onSort('ilvl')}>Ordenar por Item Level</button>
      <button onClick={() => onSort('character_role')}>Ordenar por Rol de Personaje</button>
      <button onClick={() => onSort('guild_role')}>Ordenar por Rol en Gremio</button>
      <button onClick={() => onSort('main_archetype')}>Ordenar por Arquetipo Principal</button>
      <button onClick={() => onSort('secondary_archetype')}>Ordenar por Arquetipo Secundario</button>
      <button onClick={() => onSort('grandmaster_profession_one')}>Ordenar por Profesión 1</button>
      <button onClick={() => onSort('grandmaster_profession_two')}>Ordenar por Profesión 2</button>
      <button onClick={() => onSort(null)}>Quitar Orden</button>
    </div>
  );
};

export default SortControls;

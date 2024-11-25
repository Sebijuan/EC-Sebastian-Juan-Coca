import React from 'react';
import './SortControls.css';

const SortControls = ({ onSort }) => {
  return (
    <div className="sort-controls">
      <button onClick={() => onSort('level', 'asc')}>Ordenar por Nivel ↑</button>
      <button onClick={() => onSort('level', 'desc')}>Ordenar por Nivel ↓</button>
      {/* Agregar más opciones de ordenamiento */}
    </div>
  );
};

export default SortControls;

import React, { useState } from 'react';
import './ProductFilter.css'; // Archivo para los estilos del filtro.

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    brand: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="product-filter">
      <select name="category" onChange={handleChange}>
        <option value="">Categoría</option>
        <option value="deportivos">Deportivos</option>
        <option value="clásicos">Clásicos</option>
      </select>
      <select name="price" onChange={handleChange}>
        <option value="">Precio</option>
        <option value="low">Menor a Mayor</option>
        <option value="high">Mayor a Menor</option>
      </select>
      <select name="brand" onChange={handleChange}>
        <option value="">Marca</option>
        <option value="bmw">BMW</option>
        <option value="audi">Audi</option>
      </select>
      <select name="rating" onChange={handleChange}>
        <option value="">Valoración</option>
        <option value="4">4 estrellas o más</option>
        <option value="3">3 estrellas o más</option>
      </select>
    </div>
  );
};

export default ProductFilter;

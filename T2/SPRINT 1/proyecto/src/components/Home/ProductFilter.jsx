import React, { useState, useEffect } from 'react';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API'; // Import fetchProducts

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    categoria: '',
    precio: '',
    marca: '',
    rating: '',
    color: '', 
  });

  useEffect(() => {
    fetchProducts().then((products) => {
      // Handle fetched products if needed
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="product-filter">
      <select name="categoria" onChange={handleChange}>
        <option value="">Categoría</option>
        <option value="deportivos">Deportivos</option>
        <option value="clásicos">Clásicos</option>
      </select>
      <select name="precio" onChange={handleChange}> {/* Fixed typo here */}
        <option value="">Precio</option>
        <option value="low">Menor a Mayor</option>
        <option value="high">Mayor a Menor</option>
      </select>
      <select name="marca" onChange={handleChange}>
        <option value="">Marca</option>
        <option value="bmw">BMW</option>
        <option value="audi">Audi</option>
        <option value="seat">Seat</option>
        <option value="volkswagen">Volkswagen</option>
      </select>
      <select name="rating" onChange={handleChange}>
        <option value="">Valoración</option>
        <option value="5">5 estrellas</option>
        <option value="4">4 estrellas</option>
        <option value="3">3 estrellas</option>
      </select>
      <select name="color" onChange={handleChange}> {/* Added color filter dropdown */}
        <option value="">Color</option>
        <option value="rojo">Rojo</option>
        <option value="azul">Azul</option>
        <option value="negro">Negro</option>
        <option value="blanco">Blanco</option>
      </select>
    </div>
  );
};

export default ProductFilter;

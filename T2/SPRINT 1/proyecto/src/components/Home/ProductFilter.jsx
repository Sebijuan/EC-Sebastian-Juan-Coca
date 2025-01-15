import React, { useState, useEffect } from 'react';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API';

const ProductFilter = () => {
  const [filters, setFilters] = useState({
    categoria: '',
    precio: '',
    marca: '',
    rating: '',
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((products) => {
      setProducts(products);
      setFilteredProducts(products);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    filterProducts(newFilters);
  };

  const filterProducts = (filters) => {
    let filtered = products;

    if (filters.categoria) {
      filtered = filtered.filter((product) => product.category === filters.categoria);
    }
    if (filters.marca) {
      filtered = filtered.filter((product) => product.brand === filters.marca);
    }
    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating === parseInt(filters.rating));
    }
    if (filters.precio) {
      filtered = filtered.sort((a, b) => (filters.precio === 'low' ? a.price - b.price : b.price - a.price));
    }

    setFilteredProducts(filtered);
  };

  const uniqueCategories = [...new Set(products.map((product) => product.category))];
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  return (
    <div>
      <div className="product-filter">
        <select name="categoria" onChange={handleChange}>
          <option value="">Categoría</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select name="precio" onChange={handleChange}>
          <option value="">Precio</option>
          <option value="low">Menor a Mayor</option>
          <option value="high">Mayor a Menor</option>
        </select>
        <select name="marca" onChange={handleChange}>
          <option value="">Marca</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select name="rating" onChange={handleChange}>
          <option value="">Valoración</option>
          <option value="5">5 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="3">3 estrellas</option>
        </select>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Marca</th>
            <th>Valoración</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.brand}</td>
              <td>{product.rating} estrellas</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductFilter;

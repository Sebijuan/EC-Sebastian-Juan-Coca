import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API';

const Productos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="productos-container">
      <h1>Productos</h1>
      <div className="productos-list">
        {products.map((product) => (
          <div key={product.id} className="productos-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Precio: ${product.precio}</p>
            <p>Rating: {product.rating} stars</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;

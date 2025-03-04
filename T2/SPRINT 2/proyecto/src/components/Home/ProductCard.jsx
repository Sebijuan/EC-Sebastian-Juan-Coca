import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/products.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleConfigureClick = () => {
    navigate('/cart-preview', { state: { from: 'productCard', product } });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0); // Scroll to top after navigation
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Precio: ${product.precio}</p>
      <div className="card-buttons">
        <button onClick={handleConfigureClick}>Configurar</button>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/products.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleConfigureClick = () => {
    // Navegar a cart-preview con los datos del producto
    navigate('/cart-preview', { state: { from: 'productCard', product } });
  };

  return (
    <div className="content-card">
      <img src={product.image} alt={product.name} className="card-image" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="card-buttons">
        <button onClick={() => alert('Añadido al carrito')}>Añadir al carrito</button>
        <button onClick={() => alert('Abrir chat')}>Abrir Chat</button>
        <button onClick={handleConfigureClick}>Configurar</button>
      </div>
    </div>
  );
};

export default ProductCard;

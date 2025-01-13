import React from 'react';
import './contentCard.css'; // Archivo para los estilos.

const ContentCard = ({ product }) => {
  return (
    <div className="content-card">
      <img src={product.image} alt={product.name} className="card-image" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="card-buttons">
        <button onClick={() => alert('Añadido al carrito')}>Añadir al carrito</button>
        <button onClick={() => alert('Abrir chat')}>Abrir Chat</button>
        <button onClick={() => alert('Configurar coche')}>Configurar</button>
      </div>
    </div>
  );
};

export default ContentCard;

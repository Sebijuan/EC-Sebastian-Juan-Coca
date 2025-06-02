import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});
  const [configCounts, setConfigCounts] = useState({});
  const navigate = useNavigate();

  

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
      setLikes(savedLikes);
      const savedConfigCounts = JSON.parse(localStorage.getItem('configCounts')) || {};
      setConfigCounts(savedConfigCounts);
    });
  }, []);

  const handleLike = (id) => {
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    setLikes(newLikes);
    localStorage.setItem('likes', JSON.stringify(newLikes));
  };

  const handleConfigureClick = (product) => {
    navigate('/cart-preview', { state: { from: 'productCard', product } });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const sortedProducts = [...products].sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));

  const bestSellerId = Object.keys(configCounts).reduce((a, b) => (configCounts[a] > configCounts[b] ? a : b), null);

  return (
    <div className="productos-container">
      <h1>Catálogo de Coches</h1>
      <p className="highlighted-text">Los más destacados en función a los usuarios</p>
      <div className="productos-list">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Precio: ${product.precio}</p>
            <p>Rating: {product.rating} stars</p>
            <button onClick={() => handleLike(product.id)}>Favorito</button>
            <p>Me gusta: {likes[product.id] || 0}</p>
            <div className="card-buttons">
              <button onClick={() => handleConfigureClick(product)}>Configurar</button>
            </div>
            {bestSellerId === product.id && <p className="best-seller">El más vendido</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
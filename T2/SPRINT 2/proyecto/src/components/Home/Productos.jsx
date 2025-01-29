import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
      setLikes(savedLikes);
    });
  }, []);

  const handleLike = (id) => {
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    setLikes(newLikes);
    localStorage.setItem('likes', JSON.stringify(newLikes));
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const sortedProducts = [...products].sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));

  const selectedProductDetails = products.filter((product) => selectedProducts.includes(product.id));

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="productos-container">
      <h1>Productos</h1>
      <div className="productos-list">
        {sortedProducts.map((product) => (
          <div key={product.id} className="productos-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Precio: ${product.precio}</p>
            <p>Rating: {product.rating} stars</p>
            <button onClick={() => handleLike(product.id)}>Favorito</button>
            <p>Me gusta: {likes[product.id] || 0}</p>
            <button onClick={() => handleSelectProduct(product.id)}>
              {selectedProducts.includes(product.id) ? 'Quitar de Comparación' : 'Comparar'}
            </button>
          </div>
        ))}
      </div>
      {selectedProducts.length > 0 && (
        <>
          <button onClick={handleModalOpen}>Ver Comparación</button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>&times;</span>
                <h2>Comparación de Productos</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProductDetails.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.precio}</td>
                        <td>{product.rating} stars</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Productos;

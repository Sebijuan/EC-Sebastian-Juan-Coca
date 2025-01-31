import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configCounts, setConfigCounts] = useState({});

  const options = {
    Motor: {
      1: ['Motor Gasolina 3.0L(340cv)', 'Motor Diesel 3.0L(265cv)','Motor Hibrido Enchufable(489cv)','Motor V8 4.4L(555cv)'],
      2: ['Motor Diesel 2.0 TDI(136cv)', 'Motor Diesel 3.0 TDI(347cv)','Motor Gasolina 1.5 TFSI(150cv)','Motor Gasolina 2.0 TFSI(204cv)'],
      3: ['Motor Gasolina 3.0 litros TwinPower Turbo(530cv)' ],
      4: ['Motor Gasolina 2.0(476cv)'],
      5: ['Motor Gasolina 2.0 TSI(265cv)', 'Motor Gasolina 2.0 TSI(300cv)'],
      6: ['Motor Gasolina 1.5 TSI(150cv)','Motor Gasolina 1.5 TSI(115cv)', 'Motor Hibrido 1.5 eTSI(150cv)','Motor Hibrido 1.5 eTSI(115cv)','Motor Hibrido 1.5 eTSI(204cv)','Motor Diesel 2.0 TDI(150cv)',''],
      7: ['Motor Gasolina 1.0 TSI(115cv)', 'Motor Gasolina 1.5 TSI(150cv)'],
      8: ['Motor Gasolina 1.0 TFSI(110cv)', 'Motor Gasolina 1.5 TFSI(150cv)','Motor Gasolina 2.0 TFSI(207cv)'],
      9: ['Motor Gasolina 2.0 T-GDI(250cv)', 'Motor Gasolina 2.0 T-GDI(280cv)'],
      10: ['Motor Gasolina 1.6 T-GDI(204cv)'],
      11: ['Motor Gasolina 2.0(255cv)', 'Motor Gasolina 3.0(382cv)'],
      12: ['Motor Gasolina 2.3(400cv)', 'Motor Gasolina 2.3 EcoBoost(280cv)'],
      13: ['Motor Gasolina 3.5(304cv)', ],
      14: ['Motor Gasolina VTEC® 2.0L (315cv)'],
      15: ['Motor Gasolina V8 4.OL(650cv)', 'Motor Hibrido(800cv)'],
      16: ['Motor Gasolina V8 4.5L(570cv)', 'Motor Gasolina V8 GTB(670cv)'],

    }
  };

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

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

 

  const sortedProducts = [...products].sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));

  const selectedProductDetails = products.filter((product) => selectedProducts.includes(product.id)).map((product) => {
    const motorOptions = options.Motor[product.id] ? options.Motor[product.id].join(', ') : 'No configurado';
    return { ...product, motor: motorOptions };
  });

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const bestSellerId = Object.keys(configCounts).reduce((a, b) => (configCounts[a] > configCounts[b] ? a : b), null);

  return (
    <div className="productos-container">
      <h1>Productos</h1>
      <p className="highlighted-text">Los más destacados en función a los usuarios</p>
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
              {selectedProducts.includes(product.id) ? 'Quitar de Comparación' : 'Comparar'
              }
            </button>
            {bestSellerId === product.id && <p className="best-seller">El más vendido</p>}
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
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Rating</th>
                      <th>Motor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProductDetails.map((product) => (
                      <tr key={product.id}>
                        <td><img src={product.image} alt={product.name} /></td>
                        <td>{product.name}</td>
                        <td>${product.precio}</td>
                        <td>{product.rating} stars</td>
                        <td>{product.motor}</td>
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

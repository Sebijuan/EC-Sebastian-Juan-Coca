import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/compra.css';

const ResumenCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedOptions } = location.state;

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/comprar', { state: { product, selectedOptions } });
  };

  const calculateTotalPrice = () => {
    const basePrice = product.precio;
    const interiorExteriorColorCount = selectedOptions.Interior.length + selectedOptions.Exterior.length + selectedOptions.Color.length;
    const extrasCount = selectedOptions.Extras.length;
    const motorCount = selectedOptions.Motor.length;
    return basePrice + interiorExteriorColorCount * 250 + extrasCount * 750 + motorCount * 1000;
  };

  return (
    <div className="resumen-compra">
      <h2>Resumen de Compra</h2>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Precio Base: ${product.precio}</p>
        {selectedOptions.Interior.length > 0 && <p>Interior: {selectedOptions.Interior.join(', ')}</p>}
        {selectedOptions.Exterior.length > 0 && <p>Exterior: {selectedOptions.Exterior.join(', ')}</p>}
        {selectedOptions.Motor.length > 0 && <p>Motor: {selectedOptions.Motor.join(', ')}</p>}
        {selectedOptions.Extras.length > 0 && <p>Extras Exclusivos: {selectedOptions.Extras.join(', ')}</p>}
        {selectedOptions.Color.length > 0 && <p>Color: {selectedOptions.Color.join(', ')}</p>}
        <p>Total: ${calculateTotalPrice()}</p>
      </div>
      <button onClick={handleBackToHome}>Volver a la página de inicio</button>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default ResumenCompra;

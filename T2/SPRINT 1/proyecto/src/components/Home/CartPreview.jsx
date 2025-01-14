import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/home.css';

const CartPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from;
  const product = location.state?.product;

  const [selectedOptions, setSelectedOptions] = useState({
    Interior: [],
    Exterior: []
  });

  const interiorOptions = ['Asientos Deportivos', 'Pack de luces LED de interior', 'Pack de Altavoces Supreme'];
  const exteriorOptions = ['Pintura Cromada', 'Paquete Deportivo', 'Llantas de aleación de 18"'];

  useEffect(() => {
    if (!from || !product) {
      navigate('/'); // Si no tenemos los datos, redirigimos a la página de inicio
    }
  }, [from, product, navigate]);

  const handleConfigChange = (event) => {
    const { name, value, checked } = event.target;
    setSelectedOptions((prevOptions) => {
      const options = prevOptions[name];
      if (checked) {
        return {
          ...prevOptions,
          [name]: [...options, value]
        };
      } else {
        return {
          ...prevOptions,
          [name]: options.filter(option => option !== value)
        };
      }
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleAccept = () => {
    console.log('Accepted options:', selectedOptions);
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="car-tuning-preview">
      <h2>Personalizar</h2>
      <ul>
        <li key={product.id}>
          <img src={product.image} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </li>
      </ul>
      <div className="car-tuning-menu">
        <div>
          <h4>Interior:</h4>
          {interiorOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="Interior"
                value={option}
                checked={selectedOptions.Interior.includes(option)}
                onChange={handleConfigChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <h4>Exterior:</h4>
          {exteriorOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="Exterior"
                value={option}
                checked={selectedOptions.Exterior.includes(option)}
                onChange={handleConfigChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {(selectedOptions.Interior.length > 0 || selectedOptions.Exterior.length > 0) && (
        <div className="car-tuning-selected-config">
          <h3>Tu Configuracion Seleccionada</h3>
          {selectedOptions.Interior.length > 0 && <p>Interior: {selectedOptions.Interior.join(', ')}</p>}
          {selectedOptions.Exterior.length > 0 && <p>Exterior: {selectedOptions.Exterior.join(', ')}</p>}
          <div>
            <button onClick={handleBackToHome}>Volver a la página de inicio</button>
            <button onClick={handleAccept}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPreview;

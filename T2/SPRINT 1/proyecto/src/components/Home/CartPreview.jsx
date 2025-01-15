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
    Exterior: [],
    Motor: [],
    Extras: [],
    Color: []
  });

  const interiorOptions = ['Asientos Tipo Bucket', 'Pack de luces LED de interior', 'Pack de Altavoces Supreme', 'Instalación de un cielo estrellado con fibra óptica tipo Rolls-Royce','Pantallas táctiles más grandes (tipo tablet)','Portavasos iluminados','Tweeters motorizados que emergen al encender el coche','Tapizado con materiales especiales (Alcantara, microfibra)'];
  const exteriorOptions = ['Pintura Cromada', 'Faros LED', 'Llantas de aleación de 18"','Escape Akrapovic','Techo Solar','Parachoques','Faldones Laterales','Difusor Aerodinámico'];
  const motorOptions = ['Motor Gasolina 1.5', 'Motor Gasolina 2.0', 'Motor Eléctrico', 'Motor 1.5 Hibrido','Motor 2.0 Hibrido'];
  const extrasOptions = ['Sistema de Navegación Avanzado', 'Asistente de Conducción Autónoma', 'Enfriadores de bebidas', 'Detalles en oro, plata o cristales Swarovski'];
  const colorOptions = ['Rojo', 'Azul', 'Negro', 'Blanco', 'Gris'];

  useEffect(() => {
    if (!from || !product) {
      navigate('/'); // Si no tenemos los datos, redirigimos a la página de inicio
    }
  }, [from, product, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on mount
  }, []);

  const handleConfigChange = (event) => {
    const { name, value, checked, type } = event.target;
    setSelectedOptions((prevOptions) => {
      let updatedOptions;
      if (type === 'checkbox') {
        updatedOptions = checked
          ? [...prevOptions[name], value]
          : prevOptions[name].filter((option) => option !== value);
      } else if (type === 'select-one') {
        updatedOptions = [value];
      }
      return {
        ...prevOptions,
        [name]: updatedOptions
      };
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
        <li key={product.id} className="product-item">
          <img src={product.image} alt={product.name} />
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </li>
      </ul>
      <div className="car-tuning-menu">
        <div>
          <h4>Interior:</h4>
          {interiorOptions.map((option) => (
            <label key={option} className="custom-checkbox">
              <input
                type="checkbox"
                name="Interior"
                value={option}
                onChange={handleConfigChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <h4>Exterior:</h4>
          {exteriorOptions.map((option) => (
            <label key={option} className="custom-checkbox">
              <input
                type="checkbox"
                name="Exterior"
                value={option}
                onChange={handleConfigChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <h4>Motor:</h4>
          <select name="Motor" onChange={handleConfigChange}>
            <option value="">Selecciona una opción</option>
            {motorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Color:</h4>
          <select name="Color" onChange={handleConfigChange}>
            <option value="">Selecciona un color</option>
            {colorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Extras Exclusivos:</h4>
          {extrasOptions.map((option) => (
            <label key={option} className="custom-checkbox">
              <input
                type="checkbox"
                name="Extras"
                value={option}
                onChange={handleConfigChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {(selectedOptions.Interior.length > 0 || selectedOptions.Exterior.length > 0 || selectedOptions.Motor.length > 0 || selectedOptions.Extras.length > 0 || selectedOptions.Color.length > 0) && (
        <div className="car-tuning-selected-config">
          <h3>Tu Configuración Seleccionada</h3>
          {selectedOptions.Interior.length > 0 && <p>Interior: {selectedOptions.Interior.join(', ')}</p>}
          {selectedOptions.Exterior.length > 0 && <p>Exterior: {selectedOptions.Exterior.join(', ')}</p>}
          {selectedOptions.Motor.length > 0 && <p>Motor: {selectedOptions.Motor.join(', ')}</p>}
          {selectedOptions.Extras.length > 0 && <p>Extras Exclusivos: {selectedOptions.Extras.join(', ')}</p>}
          {selectedOptions.Color.length > 0 && <p>Color: {selectedOptions.Color.join(', ')}</p>}
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

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/home.css';

const CartPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, name, price } = location.state;
  const from = location.state?.from;
  const product = location.state?.product;

  const [selectedOptions, setSelectedOptions] = useState({
    Interior: [],
    Exterior: [],
    Motor: [],
    Extras: [],
    Color: []
  });
  const [options, setOptions] = useState(null);

  // Obtener opciones de configuración desde la API
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        const allMotors = Object.values(data.Motor || {}).flat();
        setOptions({
          ...data,
          Motor: allMotors
        });
      })
      .catch(() => setOptions(null));
  }, []);

  useEffect(() => {
    if (!from || !imageUrl || !name || !price) {
      navigate('/');
    }
  }, [from, imageUrl, name, price, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleAccept = async () => {
    // Construir el objeto para el endpoint
    const configToSave = {
      car: name,
      color: selectedOptions.Color[0] || "",
      interior: selectedOptions.Interior.join(', '),
      extras: selectedOptions.Extras,
      engine: selectedOptions.Motor[0] || ""
    };

    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configToSave)
      });
      // Navegar a la página de resumen con los datos seleccionados
      navigate('/resumen-compra', {
        state: {
          product: {
            name,
            image: imageUrl,
            precio: price
          },
          selectedOptions
        }
      });
    } catch (error) {
      alert('Error al guardar la configuración');
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = price;
    const interiorExteriorColorCount = selectedOptions.Interior.length + selectedOptions.Exterior.length + selectedOptions.Color.length;
    const extrasCount = selectedOptions.Extras.length;
    const motorCount = selectedOptions.Motor.length;
    return basePrice + interiorExteriorColorCount * 250 + extrasCount * 750 + motorCount * 1000;
  };

  if (!options) {
    return <div>Cargando opciones...</div>;
  }

  return (
    <div className="car-tuning-preview">
      <h2>Personalizar</h2>
      <ul>
        <li className="product-item">
          <img src={imageUrl} alt={name} />
          <div className="product-details">
            <h3>{name}</h3>
            <p>${price}</p>
          </div>
        </li>
      </ul>
      <div className="car-tuning-menu">
        <div>
          <h4>Interior:</h4>
          {options.Interior && options.Interior.map((option) => (
            <label key={option} className="custom-checkbox">
              <input
                type="checkbox"
                name="Interior"
                value={option}
                onChange={handleConfigChange}
                checked={selectedOptions.Interior.includes(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <h4>Exterior:</h4>
          {options.Exterior && options.Exterior.map((option) => (
            <label key={option} className="custom-checkbox">
              <input
                type="checkbox"
                name="Exterior"
                value={option}
                onChange={handleConfigChange}
                checked={selectedOptions.Exterior.includes(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <h4>Motor:</h4>
          <select name="Motor" onChange={handleConfigChange} value={selectedOptions.Motor[0] || ''}>
            <option value="">Selecciona una opción</option>
            {options.Motor && options.Motor.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Color:</h4>
          <select name="Color" onChange={handleConfigChange} value={selectedOptions.Color[0] || ''}>
            <option value="">Selecciona un color</option>
            {options.Color && options.Color.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Extras Exclusivos:</h4>
          {options.Extras && options.Extras.map((option) => (
            <label key={option} className="custom-checkbox">
              <input
                type="checkbox"
                name="Extras"
                value={option}
                onChange={handleConfigChange}
                checked={selectedOptions.Extras.includes(option)}
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
          <p>Total: ${calculateTotalPrice()}</p>
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
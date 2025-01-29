import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/home.css';

const CartPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from;
  const product = location.state?.product;

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = product ? localStorage.getItem(`config-${product.id}`) : null;
    return savedOptions ? JSON.parse(savedOptions) : {
      Interior: [],
      Exterior: [],
      Motor: [],
      Extras: [],
      Color: []
    };
  });

  const [customOptions, setCustomOptions] = useState({
    Interior: '',
    Exterior: '',
    Motor: '',
    Extras: '',
    Color: ''
  });

  const options = {
    Interior: ['Asientos Tipo Bucket', 'Pack de luces LED de interior', 'Pack de Altavoces Supreme', 'Instalación de un cielo estrellado con fibra óptica tipo Rolls-Royce', 'Pantallas táctiles más grandes (tipo tablet)', 'Portavasos iluminados', 'Tweeters motorizados que emergen al encender el coche', 'Tapizado con materiales especiales (Alcantara, microfibra)'],
    Exterior: ['Pintura Cromada', 'Faros LED', 'Llantas de aleación de 18"', 'Escape Akrapovic', 'Techo Solar', 'Parachoques', 'Faldones Laterales', 'Difusor Aerodinámico'],
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
    },
    Extras: ['Sistema de Navegación Avanzado', 'Asistente de Conducción Autónoma', 'Enfriadores de bebidas', 'Detalles en oro, plata o cristales Swarovski'],
    Color: ['Rojo', 'Azul', 'Negro', 'Blanco', 'Gris']
  };

  useEffect(() => {
    if (!from || !product) {
      navigate('/'); // Si no tenemos los datos, redirigimos a la página de inicio
    }
  }, [from, product, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on mount
  }, []);

  useEffect(() => {
    if (product) {
      localStorage.setItem(`config-${product.id}`, JSON.stringify(selectedOptions));
    }
  }, [selectedOptions, product]);

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

  const handleCustomOptionsChange = (event) => {
    const { name, value } = event.target;
    setCustomOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value
    }));
  };

  const handleAddCustomOption = (category) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [category]: [...prevOptions[category], customOptions[category]]
    }));
    setCustomOptions((prevOptions) => ({
      ...prevOptions,
      [category]: ''
    }));
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleAccept = () => {
    console.log('Accepted options:', selectedOptions);
  };

  const calculateTotalPrice = () => {
    const basePrice = product.precio;
    const interiorExteriorColorCount = selectedOptions.Interior.length + selectedOptions.Exterior.length + selectedOptions.Color.length;
    const extrasCount = selectedOptions.Extras.length;
    const motorCount = selectedOptions.Motor.length;
    return basePrice + interiorExteriorColorCount * 250 + extrasCount * 750 + motorCount * 1000;
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
          {options.Interior.map((option) => (
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
          <input
            type="text"
            name="Interior"
            value={customOptions.Interior}
            onChange={handleCustomOptionsChange}
            placeholder="Añadir opción personalizada"
          />
          <button onClick={() => handleAddCustomOption('Interior')}>Añadir</button>
        </div>
        <div>
          <h4>Exterior:</h4>
          {options.Exterior.map((option) => (
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
          <input
            type="text"
            name="Exterior"
            value={customOptions.Exterior}
            onChange={handleCustomOptionsChange}
            placeholder="Añadir opción personalizada"
          />
          <button onClick={() => handleAddCustomOption('Exterior')}>Añadir</button>
        </div>
        <div>
          <h4>Motor:</h4>
          <select name="Motor" onChange={handleConfigChange} value={selectedOptions.Motor[0] || ''}>
            <option value="">Selecciona una opción</option>
            {options.Motor[product.id].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="Motor"
            value={customOptions.Motor}
            onChange={handleCustomOptionsChange}
            placeholder="Añadir opción personalizada"
          />
          <button onClick={() => handleAddCustomOption('Motor')}>Añadir</button>
        </div>
        <div>
          <h4>Color:</h4>
          <select name="Color" onChange={handleConfigChange} value={selectedOptions.Color[0] || ''}>
            <option value="">Selecciona un color</option>
            {options.Color.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="Color"
            value={customOptions.Color}
            onChange={handleCustomOptionsChange}
            placeholder="Añadir opción personalizada"
          />
          <button onClick={() => handleAddCustomOption('Color')}>Añadir</button>
        </div>
        <div>
          <h4>Extras Exclusivos:</h4>
          {options.Extras.map((option) => (
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
          <input
            type="text"
            name="Extras"
            value={customOptions.Extras}
            onChange={handleCustomOptionsChange}
            placeholder="Añadir opción personalizada"
          />
          <button onClick={() => handleAddCustomOption('Extras')}>Añadir</button>
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

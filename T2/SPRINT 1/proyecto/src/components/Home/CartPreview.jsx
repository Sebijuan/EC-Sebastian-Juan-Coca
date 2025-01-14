import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/home.css';

const CartPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from;
  const product = location.state?.product;

  const [configOption, setConfigOption] = useState('Interior');
  const [subOption, setSubOption] = useState('');

  const interiorOptions = ['Leather', 'Fabric', 'Wood'];
  const exteriorOptions = ['Metal', 'Plastic', 'Glass'];

  useEffect(() => {
    if (!from || !product) {
      navigate('/'); // Si no tenemos los datos, redirigimos a la página de inicio
    }
  }, [from, product, navigate]);

  const handleConfigChange = (event) => {
    setConfigOption(event.target.value);
    setSubOption('');
  };

  const handleSubOptionChange = (event) => {
    setSubOption(event.target.value);
  };

  const options = configOption === 'Interior' ? interiorOptions : exteriorOptions;

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="cart-preview">
      <h2>Cart Summary</h2>
      <ul>
        <li key={product.id}>
          <img src={product.image} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </li>
      </ul>
      <div className="config-menu">
        <label>
          Configuration:
          <select value={configOption} onChange={handleConfigChange}>
            <option value="Interior">Interior</option>
            <option value="Exterior">Exterior</option>
          </select>
        </label>
        {configOption && (
          <label>
            Type:
            <select value={subOption} onChange={handleSubOptionChange}>
              <option value="">Select a type</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
};

export default CartPreview;

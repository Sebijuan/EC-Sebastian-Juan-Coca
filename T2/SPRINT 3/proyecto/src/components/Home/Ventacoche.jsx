import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Ventacoche.css';

const Ventacoche = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedOptions } = location.state;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'contado',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    console.log('Product:', product);
    console.log('Selected Options:', selectedOptions);
    alert('Compra completada con éxito');
    // Redirect to a confirmation page or another step
    navigate('/confirmacion', { state: { formData, product, selectedOptions } });
  };

  return (
    <div className="ventacoche">
      <h2>Datos de Compra</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Método de Pago:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="contado">Pago al Contado</option>
            <option value="financiado">Pago Financiado</option>
          </select>
        </div>
        <button type="submit">Confirmar Compra</button>
      </form>
    </div>
  );
};

export default Ventacoche;

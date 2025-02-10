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

  const [paymentOption, setPaymentOption] = useState('contado');
  const [years, setYears] = useState(4);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleYearsChange = (e) => {
    setYears(e.target.value);
  };

  const calculateFinancedPrice = (years) => {
    // Assuming a simple interest calculation for demonstration
    const interestRate = 0.02; // 2% interest rate per year
    const totalPrice = calculateTotalPrice();
    return totalPrice * (1 + interestRate * years);
  };

  const calculateMonthlyPayment = (years) => {
    const financedPrice = calculateFinancedPrice(years);
    return Math.round(financedPrice / (years * 12));
  };

  const calculateTotalPrice = () => {
    const basePrice = product.precio;
    const interiorExteriorColorCount = selectedOptions.Interior.length + selectedOptions.Exterior.length + selectedOptions.Color.length;
    const extrasCount = selectedOptions.Extras.length;
    const motorCount = selectedOptions.Motor.length;
    return basePrice + interiorExteriorColorCount * 250 + extrasCount * 750 + motorCount * 1000;
  };

  const calculateUpfrontPrice = () => {
    const totalPrice = calculateTotalPrice();
    return Math.round(totalPrice * 1.02); // Add 5% surcharge
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    console.log('Product:', product);
    console.log('Selected Options:', selectedOptions);
    alert('Compra completada con éxito');
    // Redirect to a confirmation page or another step
    navigate('/comprado', { state: { formData, product, selectedOptions, totalPrice: calculateTotalPrice() } });
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
        
        <h2>Opciones de Pago</h2>
        <label className="payment-option-label">
          <input
            type="radio"
            value="contado"
            checked={paymentOption === 'contado'}
            onChange={handlePaymentOptionChange}
          />
          Pago al contado
        </label>
        <label className="payment-option-label">
          <input
            type="radio"
            value="financiado"
            checked={paymentOption === 'financiado'}
            onChange={handlePaymentOptionChange}
          />
          Pago financiado
        </label>

        {paymentOption === 'financiado' && (
          <div>
            <label>
              Años de financiación:
              <select value={years} onChange={handleYearsChange}>
                {[4, 5, 6, 7, 8, 9, 10].map((year) => (
                  <option key={year} value={year}>
                    {year} años
                  </option>
                ))}
              </select>
            </label>
            <p>Precio financiado: {Math.round(calculateFinancedPrice(years))} €</p>
            <p>Pago mensual: {calculateMonthlyPayment(years)} €</p>
          </div>
        )}

        {paymentOption === 'contado' && (
          <p>Precio al contado: {calculateUpfrontPrice()} €</p>
        )}

        <button type="submit">Confirmar Compra</button>
      </form>
    </div>
  );
};

export default Ventacoche;

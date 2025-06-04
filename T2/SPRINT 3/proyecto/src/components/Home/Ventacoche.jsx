import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Ventacoche.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "./StripeCheckout";

const stripePromise = loadStripe("pk_test_51RWISkE6S9MYaMRgzsX6kLeKFML5uH7sWQEh8gDI5p4NoIczXMdPYNLBfU3XWYbGAHdUQmeGQVmpXviUq5Q9cFM200zkB6B0ib"); // Reemplaza con tu clave pública de Stripe

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
  const [showStripe, setShowStripe] = useState(false);

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
    const interestRate = 0.02;
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
    return Math.round(totalPrice * 1.02);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowStripe(true);
  };

  return (
    <div className="ventacoche">
      <h2>Datos de Compra</h2>
      {!showStripe ? (
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
      ) : (
        <Elements stripe={stripePromise}>
          <StripeCheckout
            amount={paymentOption === "contado" ? calculateUpfrontPrice() : Math.round(calculateFinancedPrice(years))}
            onSuccess={() => navigate("/payments/options")}
          />
        </Elements>
      )}
    </div>
  );
};

export default Ventacoche;
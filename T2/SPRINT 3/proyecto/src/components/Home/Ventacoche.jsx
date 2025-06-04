import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Ventacoche.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "./StripeCheckout";
import { API_BASE_URL } from '../services/auth_API.js';

const stripePromise = loadStripe("pk_test_51RWISkE6S9MYaMRgzsX6kLeKFML5uH7sWQEh8gDI5p4NoIczXMdPYNLBfU3XWYbGAHdUQmeGQVmpXviUq5Q9cFM200zkB6B0ib");

const Ventacoche = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);

  const [paymentOption, setPaymentOption] = useState('contado');
  const [years, setYears] = useState(4);

  useEffect(() => {
    let prod = null, opts = null;
    if (location.state && location.state.product && location.state.selectedOptions) {
      prod = location.state.product;
      opts = location.state.selectedOptions;
      localStorage.setItem("product", JSON.stringify(prod));
      localStorage.setItem("selectedOptions", JSON.stringify(opts));
    } else {
      prod = JSON.parse(localStorage.getItem("product"));
      opts = JSON.parse(localStorage.getItem("selectedOptions"));
    }
    setProduct(prod);
    setSelectedOptions(opts);
  }, [location.state]);

  if (!product || !selectedOptions) {
    return <div>No hay datos de compra. Vuelve al resumen.</div>;
  }

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleYearsChange = (e) => {
    setYears(Number(e.target.value));
  };

  const calculateTotalPrice = () => {
    const basePrice = product.precio;
    const interiorExteriorColorCount = (selectedOptions.Interior?.length || 0) + (selectedOptions.Exterior?.length || 0) + (selectedOptions.Color?.length || 0);
    const extrasCount = (selectedOptions.Extras?.length || 0);
    const motorCount = (selectedOptions.Motor?.length || 0);
    return basePrice + interiorExteriorColorCount * 250 + extrasCount * 750 + motorCount * 1000;
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

  const calculateUpfrontPrice = () => {
    const totalPrice = calculateTotalPrice();
    return Math.round(totalPrice * 1.02);
  };

  // --- FUNCIÓN PARA ENVIAR EL CORREO AL BACKEND ---
  const sendPurchaseEmail = async () => {
    await fetch(`${API_BASE_URL}/purchase/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carName: product.name,
        imageUrl: product.image,
        config: selectedOptions,
        price: paymentOption === "contado" ? calculateUpfrontPrice() : Math.round(calculateFinancedPrice(years)),
        paymentType: paymentOption,
      }),
    });
  };

  return (
    <div className="ventacoche">
      <h2>Datos de Compra</h2>
      <div className="car-summary">
        <h3>{product.name}</h3>
        <img src={product.image} alt={product.name} style={{maxWidth: 300}} />
        <p>Precio base: {product.precio} €</p>
        {selectedOptions.Interior?.length > 0 && <p>Interior: {selectedOptions.Interior.join(', ')}</p>}
        {selectedOptions.Exterior?.length > 0 && <p>Exterior: {selectedOptions.Exterior.join(', ')}</p>}
        {selectedOptions.Motor?.length > 0 && <p>Motor: {selectedOptions.Motor.join(', ')}</p>}
        {selectedOptions.Extras?.length > 0 && <p>Extras: {selectedOptions.Extras.join(', ')}</p>}
        {selectedOptions.Color?.length > 0 && <p>Color: {selectedOptions.Color.join(', ')}</p>}
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

      <h2>Pago con tarjeta</h2>
      <Elements stripe={stripePromise}>
        <StripeCheckout
          amount={paymentOption === "contado" ? calculateUpfrontPrice() : Math.round(calculateFinancedPrice(years))}
          onSuccess={async () => {
            await sendPurchaseEmail();
            navigate("/finalizado");
          }}
          apiUrl={`${API_BASE_URL}/payments/pay`}
        />
      </Elements>
    </div>
  );
};

export default Ventacoche;
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeCheckout = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Llama a tu backend para procesar el pago
    const response = await fetch("/api/payments/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        paymentMethodId: paymentMethod.id,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Pago realizado con éxito");
      onSuccess && onSuccess();
    } else {
      alert(data.message || "Error en el pago");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
    </form>
  );
};

export default StripeCheckout;
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#fff", // Texto blanco
      fontSize: "16px",
      '::placeholder': {
        color: "#ccc", // Placeholder gris claro
      },
      iconColor: "#fff"
    },
    invalid: {
      color: "#ff5252",
      iconColor: "#ff5252"
    }
  }
};

const StripeCheckout = ({ amount, onSuccess, apiUrl }) => {
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

    // Usa la apiUrl que recibes por props
    const response = await fetch(apiUrl, {
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
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button
        type="submit"
        disabled={!stripe}
        style={{
          background: "red",
          color: "#fff",
          width: "100%",
          marginTop: "20px",
          border: "none",
          borderRadius: "6px",
          padding: "12px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Pagar
      </button>
    </form>
  );
};

export default StripeCheckout;
import React from 'react';
import '../styles/home.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <div className="contacto-info">
        <p><strong>Dirección:</strong> Calle Falsa 123, Ciudad, País</p>
        <p><strong>Teléfono:</strong> +123 456 7890</p>
        <p><strong>Email:</strong> info@sjcustoms.com</p>
      </div>
      <form className="contacto-form">
        <h2>Envíanos un mensaje</h2>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;

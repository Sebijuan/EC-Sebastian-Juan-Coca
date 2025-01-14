import React from 'react';
import '../styles/home.css';


const HeroSection = () => {
  return (
    <div className="hero-section">
      <img
        src="/assets/images/banner.jpg" // Verifica que esta ruta sea correcta.
        alt="Promoción destacada"
        className="hero-image"
      />
      <div className="hero-content">
        <h1>¡Grandes ofertas en coches personalizados!</h1>
        <p>Explora nuestra gama de coches únicos y empieza a personalizar el tuyo hoy.</p>
        <button className="hero-button">Comprar ahora</button>
      </div>
    </div>
  );
};

export default HeroSection;

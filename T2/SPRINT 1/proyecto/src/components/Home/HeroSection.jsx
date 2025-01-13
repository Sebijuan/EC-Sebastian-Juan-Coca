import React from 'react';
import './hero.css'; // Puedes crear este archivo para los estilos específicos del HeroSection.

const HeroSection = () => {
  return (
    <div className="hero-section">
      <img
        src="/assets/images/banner.jpg" // Cambia esto por la ruta de tu imagen promocional.
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

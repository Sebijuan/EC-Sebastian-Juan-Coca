import React from 'react';
import '../styles/home.css';


const HeroSection = () => {
  return (
    <div className="hero-section">
      <img
        src="/assests/icons/Logo.webp" // Verifica que esta ruta sea correcta.
        alt="Promoción destacada"
        className="hero-image"
      />
      <div className="hero-content">
        
      </div>
    </div>
  );
};

export default HeroSection;

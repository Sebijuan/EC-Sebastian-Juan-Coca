import React from 'react';
import '../styles/layout.css';

const Navbar = () => {
  const handleHomeClick = (event) => {
    event.preventDefault();
    // Add logic here if needed to handle the click event
  };

  const handleAboutClick = (event) => {
    event.preventDefault();
    // Add logic here if needed to handle the click event
  };

  const handleProductsClick = (event) => {
    event.preventDefault();
    // Add logic here if needed to handle the click event
  };

  const handleContactClick = (event) => {
    event.preventDefault();
    // Add logic here if needed to handle the click event
  };

  return (
    <nav className="navbar">
      <h1>SJ XTREMEMODS</h1>
      <ul>
        <li><a href="#home" onClick={handleHomeClick}>Inicio</a></li>
        <li><a href="#about" onClick={handleAboutClick}>Sobre Nosotros</a></li>
        <li><a href="#products" onClick={handleProductsClick}>Productos</a></li>
        <li><a href="#contact" onClick={handleContactClick}>Contacto</a></li>
      </ul>
      <div className="navbar-cart">
        <img src="src/components/assets/icons/icon.jpg" alt="Carrito" />
        <span>3</span>
      </div>
    </nav>
  );
};

export default Navbar;

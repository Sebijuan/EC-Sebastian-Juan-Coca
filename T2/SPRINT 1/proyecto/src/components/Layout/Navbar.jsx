import React from 'react';
import '../styles/layout.css';

const Navbar = () => {
  const handleHomeClick = (event) => {
    event.preventDefault();
    window.location.href = '#home';
  };

  const handleAboutClick = (event) => {
    event.preventDefault();
    window.location.href = '#about';
  };

  const handleProductsClick = (event) => {
    event.preventDefault();
    window.location.href = '#products';
  };

  const handleContactClick = (event) => {
    event.preventDefault();
    window.location.href = '#contact';
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    window.location.href = '/login-page';
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    window.location.href = '/register-page';
  };

  return (
    <nav className="navbar navbar-visible">
      <h1>SJ CUSTOMS</h1>
      <ul>
        <li><a href="#home" onClick={handleHomeClick} className="navbar-link">Inicio</a></li>
        <li><a href="#about" onClick={handleAboutClick} className="navbar-link">Sobre Nosotros</a></li>
        <li><a href="#products" onClick={handleProductsClick} className="navbar-link">Productos</a></li>
        <li><a href="#contact" onClick={handleContactClick} className="navbar-link">Contacto</a></li>
        <li><a href="/login-page" onClick={handleLoginClick} className="navbar-link">Iniciar Sesión</a></li>
        <li><a href="/register-page" onClick={handleRegisterClick} className="navbar-link">Registrate</a></li>
      </ul>
      <div className="navbar-icon">
        <img src="/assests/icons/Logo.webp" alt="Icono" />
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;

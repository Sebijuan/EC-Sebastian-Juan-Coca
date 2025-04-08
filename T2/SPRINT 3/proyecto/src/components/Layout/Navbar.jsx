import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/layout.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleAboutClick = (event) => {
    event.preventDefault();
    window.location.href = '/sobrenosotros-page';
  };

  const handleProductsClick = (event) => {
    event.preventDefault();
    window.location.href = '/products-page';
  };

  const handleContactClick = (event) => {
    event.preventDefault();
    window.location.href = '/contacts-page';
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
      <h1 className="navbar-title">SJ CUSTOMS</h1>
      <ul>
        <li><a href="#home" onClick={handleHomeClick} className="navbar-link">Inicio</a></li>
        <li><a href="/sobrenosotros-page" onClick={handleAboutClick} className="navbar-link">Sobre Nosotros</a></li>
        <li><a href="/products-page" onClick={handleProductsClick} className="navbar-link">Productos</a></li>
        <li><a href="/contacts-page" onClick={handleContactClick} className="navbar-link">Contacto</a></li>
        <li><a href="/login-page" onClick={handleLoginClick} className="navbar-link">Iniciar Sesión</a></li>
        <li><a href="/register-page" onClick={handleRegisterClick} className="navbar-link">Registrate</a></li>
      </ul>
      <div className="navbar-icon">
        <img src="/assests/icons/icon.jpg" alt="Icono" />
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;

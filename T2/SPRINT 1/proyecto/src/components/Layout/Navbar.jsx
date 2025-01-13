import React from 'react';
import './navbar.css'; // Archivo para los estilos.

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>SJ XTREMEMODS</h1>
      <ul>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#about">Sobre Nosotros</a></li>
        <li><a href="#products">Productos</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
      <div className="navbar-cart">
        <img src="/assets/icons/cart.svg" alt="Carrito" />
        <span>3</span>
      </div>
    </nav>
  );
};

export default Navbar;

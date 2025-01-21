import React from 'react';
import '../styles/layout.css'; // Archivo para los estilos.

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 SJ CUSTOMS. Todos los derechos reservados.</p>
      <p>Desarrollado por Sebi Juan Coca</p>
      <div className="footer-links">
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com/seebijuaan">Twitter</a>
        <a href="https://instagram.com/seebiijuaan_">Instagram</a>
      </div>
      <p>Contacto: info@sjcustoms.com</p>
    </footer>
  );
};

export default Footer;

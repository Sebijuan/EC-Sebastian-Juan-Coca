import React from 'react';
import '../styles/home.css';

const servicios = [
  {
    titulo: "Reprogramación de centralita (ECU)",
    descripcion: "Optimización del software del motor para mejorar potencia, respuesta y eficiencia, adaptando el rendimiento a tus necesidades.",
    imagen: "/assests/images/reprogramacion.jpg"
  },
  {
    titulo: "Instalación de kits de carrocería y aerodinámica",
    descripcion: "Añadimos spoilers, faldones, difusores y otros elementos para un look más deportivo y personalizado.",
    imagen: "/assests/images/kit.jpg"
  },
  {
    titulo: "Mejoras en suspensión y frenos",
    descripcion: "Montaje de suspensiones deportivas, coilovers, frenos de alto rendimiento y sistemas de frenado personalizados.",
    imagen: "/assests/images/suspension.jpeg"
  },
  {
    titulo: "Modificaciones de escape y admisión",
    descripcion: "Instalación de sistemas de escape deportivos, filtros de alto flujo y tomas de aire para un sonido y rendimiento únicos.",
    imagen: "/assests/images/escape.jpg"
  },
  {
    titulo: "Personalización interior",
    descripcion: "Tapizados exclusivos, iluminación LED, sistemas multimedia y detalles a medida para el habitáculo.",
    imagen: "/assests/images/interior.jpg"
  },
  {
    titulo: "Asesoría y homologación",
    descripcion: "Te ayudamos a legalizar y homologar todas las modificaciones para que tu coche cumpla con la normativa vigente.",
    imagen: "/assests/images/itv.webp"
  },
  {
    titulo: "Tuneos integrales",
    descripcion: "Realizamos proyectos completos de tuneo, desde el diseño hasta la entrega final, adaptándonos a cualquier tipo de vehículo y estilo.",
    imagen: "/assests/images/cochet.webp"
  }
];

const Servicios = () => (
  <section className="servicios-section">
    <h2>Servicios Especializados en SJ CUSTOMS</h2>
    <p>
      En nuestro taller no solo nos dedicamos a la personalización estética de vehículos, sino que también ofrecemos una amplia gama de servicios técnicos y de mejora de rendimiento para tu coche.
    </p>
    <ul className="servicios-list">
      {servicios.map((servicio, idx) => (
        <li key={idx} style={{ marginBottom: '40px', listStyle: 'none' }}>
          <img
            src={servicio.imagen}
            alt={servicio.titulo}
            className="servicio-image"
            style={{
              maxWidth: '400px',
              width: '100%',
              borderRadius: '12px',
              margin: '20px auto 10px auto',
              display: 'block',
              boxShadow: '0 4px 24px #0008'
            }}
          />
          <b>{servicio.titulo}:</b> {servicio.descripcion}
        </li>
      ))}
    </ul>
    <p>
      Si tienes una idea o proyecto especial, ¡consúltanos! Nuestro equipo está preparado para hacer realidad cualquier reto de personalización y mejora de tu coche.
    </p>
  </section>
);

export default Servicios;
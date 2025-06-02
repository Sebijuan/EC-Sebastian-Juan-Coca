import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';


const frases = [
  "¡Personaliza tu coche a tu estilo!",
  "El mejor tuneo, solo aquí.",
  "Haz de tu coche una obra única.",
  "Descubre accesorios exclusivos.",
  "¡Dale vida a tu pasión por los autos!"
];

const Portada = () => {
  const [fraseIndex, setFraseIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [imgTranslate, setImgTranslate] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Fade-in effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('portada-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setFadeIn(true);
        }
      }
      // Parallax effect for image
      if (imgRef.current) {
        const scrollY = window.scrollY;
        setImgTranslate(scrollY * 0.2); // Adjust speed here
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="portada-section"
  className="portada-gradient-bg"
  style={{
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity 1s, transform 1s'
  }}
    >
      <div style={{ width: '100vw', overflow: 'hidden', marginLeft: 'calc(-50vw + 50%)' }}>
        <img
          ref={imgRef}
          src="/assets/icons/Logo.webp"
          alt="Logo TuneaTuCoche"
          style={{
            width: '100vw',
            height: 'auto',
            maxHeight: '600px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto',
            boxShadow: '0 0 40px #ff000088',
            transition: 'transform 0.3s',
            transform: `translateY(${imgTranslate}px) scale(1.05)`
          }}
        />
      </div>
      <h1 style={{ fontWeight: 700, fontSize: '2.5rem', marginBottom: 10 }}>
        Bienvenido a SJ CUSTOMS
      </h1>
      <p className="hero-intro" style={{ fontSize: '1.3rem', marginBottom: 18 }}>
        En <b>SJ CUSTOMS</b> nos especializamos en la personalización integral de vehículos, ayudando a cada cliente a transformar su coche en una auténtica obra de arte sobre ruedas. Descubre accesorios exclusivos, opciones de tuneo, colores, motores y extras de alta calidad. ¡Exprésate y vive tu pasión por los autos con nosotros!
      </p>
      <div className="hero-dynamic">
        <span className="dynamic-text">{frases[fraseIndex]}</span>
      </div>
      <button className="hero-video-btn" onClick={() => setShowVideo(!showVideo)}>
        {showVideo ? "Ocultar Video" : "Ver Video Promocional"}
      </button>
      {showVideo && (
        <div className="hero-video-container" style={{ animation: 'fadeIn 1s' }}>
          <video width="480" controls autoPlay loop>
            <source src="/assests/images/videoaudi.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
      )}

      {/* SOBRE NOSOTROS */}
      <div className="sobrenosotros-container">
        {/* Imagen 1 */}
        <img
          src="/assests/images/sobrenosotros.jpg"
          alt="Nosotros"
          className="sobrenosotros-image"
        />
        <h2>Sobre Nosotros</h2>
        <p>
          Nos especializamos en transformar vehículos ordinarios en obras maestras únicas y personalizadas.
          Con años de experiencia en la industria automotriz, nuestro equipo de expertos está dedicado a ofrecer servicios de la más alta calidad para satisfacer las necesidades y deseos de nuestros clientes.
        </p>
        {/* Imagen 2 */}
        <img
          src="/assests/images/sobrenosotros2.webp"
          alt="Servicio 1"
          className="sobrenosotros-image"
        />
        <p>
          Ofrecemos una amplia gama de servicios que incluyen modificaciones de rendimiento, mejoras estéticas, instalación de sistemas de audio de alta fidelidad, y mucho más.
          Utilizamos solo los mejores materiales y las últimas tecnologías para asegurar que cada proyecto sea un éxito.
        </p>
        {/* Imagen 3 */}
        <img
          src="/assests/images/sobrenosotros3.webp"
          alt="Servicio 2"
          className="sobrenosotros-image"
        />
        <p>
          Nuestro compromiso es proporcionar un servicio excepcional y resultados que superen las expectativas. Ya sea que desees mejorar el rendimiento de tu coche, darle un nuevo aspecto, o ambos, estamos aquí para ayudarte a hacer realidad tu visión.
        </p>
        {/* Imagen 4 */}
        <img
          src="/assests/images/cocheopel.jpg"
          alt="Taller y equipo"
          className="sobrenosotros-image"
        />
        <p>
          Contamos con un taller equipado con tecnología de última generación y un equipo multidisciplinar formado por ingenieros, diseñadores y técnicos especializados.
          Nos mantenemos en constante formación y actualización para estar a la vanguardia de las tendencias y técnicas más innovadoras del sector.
        </p>
        {/* Imagen 5 */}
        <img
          src="/assests/images/motor.jpg"
          alt="Proyectos personalizados"
          className="sobrenosotros-image"
        />
        <p>
          Nos enorgullece colaborar estrechamente con cada cliente, escuchando sus ideas y asesorando en cada etapa del proceso para lograr resultados totalmente personalizados.
          Nuestra pasión por el motor y la excelencia nos impulsa a superar cualquier reto, garantizando acabados impecables y la máxima satisfacción.
        </p>
        <p>
          Gracias por confiar en nosotros para todas tus necesidades de tuneo y personalización de coches. ¡Esperamos trabajar contigo y llevar tu vehículo al siguiente nivel!
        </p>
      </div>
    </section>
  );
};

export default Portada;
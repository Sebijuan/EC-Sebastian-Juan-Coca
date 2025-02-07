import React from 'react';
import '../styles/SobreNosotros.css';

const Sobrenosotros = () => {
    return (
        <div className="sobrenosotros-container">
            {/* Imagen 1 */}
            <img
                src="/assests/images/sobrenosotros.jpg" 
                alt="Nosotros"
                className="sobrenosotros-image"
            />
            <h2>Sobre Nosotros</h2>
            <p>
                Bienvenidos a nuestra empresa de tuneo y personalización de coches. Nos especializamos en transformar vehículos ordinarios en obras maestras únicas y personalizadas. 
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
            <p>
                Gracias por confiar en nosotros para todas tus necesidades de tuneo y personalización de coches. ¡Esperamos trabajar contigo y llevar tu vehículo al siguiente nivel!
            </p>
        </div>
    );
};

export default Sobrenosotros;

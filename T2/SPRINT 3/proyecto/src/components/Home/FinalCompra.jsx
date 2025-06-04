import React from 'react';

const FinalCompra = () => {
  return (
    <div className="final-compra" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ color: '#ffffff' }}>¡Enhorabuena por tu compra!</h2>
      <p>
        Gracias por confiar en nosotros para la adquisición de tu nuevo vehículo.<br />
        Estamos seguros de que disfrutarás de cada kilómetro al volante de tu coche personalizado.
      </p>
      <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <img
          src="/assests/images/cochereg.png"
          alt="Coche felicitación"
          style={{ width: 350, height: 233, objectFit: 'cover', borderRadius: 10 }}
        />
        <img
          src="/assests/images/esosi.avif"
          alt="Coche entrega"
          style={{ width: 350, height: 233, objectFit: 'cover', borderRadius: 10 }}
        />
      </div>
      <p>
        Si tienes cualquier consulta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo.<br />
        ¡Te deseamos muchos éxitos y aventuras con tu nuevo coche!
      </p>
      <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
        Atentamente,<br />
        El equipo de SJ CUSTOMS
      </p>
    </div>
  );
};

export default FinalCompra;
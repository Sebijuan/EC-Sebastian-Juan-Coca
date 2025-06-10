import React from 'react';
import emailjs from 'emailjs-com';
import '../styles/home.css';

const Contacto = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    const form = e.target; // Get the form element
    const formData = new FormData(form);
    formData.append('to_email', 'sebipro2607@gmail.com'); // Add recipient email

    emailjs.sendForm('sjcustoms', 'template_e1duxsb', form, 'VPuozFkbn0FGT85oH')
      .then((result) => {
          console.log('EmailJS result:', result.text);
          alert('Mensaje enviado con éxito');
      }, (error) => {
          console.error('EmailJS error:', error);
          alert(`Hubo un error al enviar el mensaje: ${error.text}`);
      });

    form.reset();
  };

  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <div className="contacto-info">
        <p><strong>Dirección:</strong>Avenida de las Ciencias N33, Sevilla, 41020</p>
        <p><strong>Teléfono:</strong> +34 640 52 45 49</p>
        <p><strong>Email:</strong> info@sjcustoms.com</p>
      </div>
      <form className="contacto-form" onSubmit={sendEmail}>
        <h2>Envíanos un mensaje</h2>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;

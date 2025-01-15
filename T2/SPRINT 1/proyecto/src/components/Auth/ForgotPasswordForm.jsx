import React, { useState } from 'react';
import '../styles/forgotpassword.css';
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateEmail(email)) {
            setError('El correo debe tener un formato válido.');
            return;
        }

        // Simulate API request
        console.log(`Sending recovery link to: ${email}`);
        if (email === 'registered@example.com') {
            setSuccess('Enlace de recuperación enviado con éxito.');
        } else {
            setError('El correo no está registrado.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="submit">Enviar Enlace de Recuperación</button>
            <button type="button" onClick={() => window.location.href = '/login'}>
                Volver al Inicio de Sesión
            </button>
        </form>
    );
};

export default ForgotPasswordForm;

import React, { useState } from 'react';
import '../styles/forgotpassword.css';
import { validateEmail } from '../Shared/ValidationSystem';
import { showSuccessNotification, showErrorNotification } from '../Shared/NotificationSystem';
import { recoverPassword } from '../services/auth_API';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateEmail(email)) {
            setError('El correo debe tener un formato válido.');
            return;
        }

        try {
            console.log(`Sending recovery link to: ${email}`);
            const response = await recoverPassword(email);
            if (response.success) {
                showSuccessNotification('Enlace de recuperación enviado con éxito.');
                setSuccess('Enlace de recuperación enviado con éxito.');
            }
        } catch (err) {
            showErrorNotification('El correo no está registrado.');
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
            <button type="button" onClick={() => window.location.href = '/login-page'}>
                Volver al Inicio de Sesión
            </button>
        </form>
    );
};

export default ForgotPasswordForm;

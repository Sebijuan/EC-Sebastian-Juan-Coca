import React, { useState, useEffect } from 'react';
import { validateEmail, validatePassword, validatePasswordMatch } from '../Shared/ValidationSystem';
import { showErrorNotification, showSuccessNotification } from '../Shared/NotificationSystem';
import { registerUser } from '../services/auth_API';
import '../styles/register.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const newErrors = {};
        if (email && !validateEmail(email)) {
            newErrors.email = 'El correo debe tener un formato válido.';
        }
        if (password && !validatePassword(password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo.';
        }
        if (confirmPassword && !validatePasswordMatch(password, confirmPassword)) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
        }
        setErrors(newErrors);
    }, [email, password, confirmPassword]);

    const handleRegister = async (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!validateEmail(email)) {
            newErrors.email = 'El correo debe tener un formato válido.';
        }
        if (!validatePassword(password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo.';
        }
        if (!validatePasswordMatch(password, confirmPassword)) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await registerUser(username, email, password);
                showSuccessNotification('Registro exitoso');
                window.location.href = '/login-page';
            } catch (error) {
                showErrorNotification(error.message || 'Error en el registro');
            }
        } else {
            showErrorNotification('Por favor, corrija los errores en el formulario');
        }
    };

    return (
        <form className="register-form" onSubmit={handleRegister}>
            <h2>Registrarse</h2>
            <label>
                Nombre de Usuario:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            {errors.username && <p className="error">{errors.username}</p>}
            <label>
                Correo Electrónico:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}
            <label>
                Contraseña:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {errors.password && <p className="error">{errors.password}</p>}
            <label>
                Confirmar Contraseña:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            <button type="submit">Registrarse</button>
            <button type="button" onClick={() => window.location.href = '/login-page'}>
                ¿Ya tienes una cuenta? Inicia Sesión
            </button>
        </form>
    );
};

export default RegisterForm;
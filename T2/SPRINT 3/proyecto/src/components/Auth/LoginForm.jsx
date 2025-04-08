import React, { useState, useEffect } from 'react';
import { validateEmail, validatePassword } from '../Shared/ValidationSystem';
import { showErrorNotification, showSuccessNotification } from '../Shared/NotificationSystem';
import { loginUser } from '../services/auth_API';
import '../Layout/Navbar.jsx';
import '../styles/login.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const newErrors = {};
        if (email && !validateEmail(email)) {
            newErrors.email = 'El correo debe tener un formato válido.';
        }
        if (password && !validatePassword(password)) {
            newErrors.password = 'La contraseña no puede estar vacía.';
        }
        setErrors(newErrors);
    }, [email, password]);

    const handleLogin = async () => {
        const newErrors = {};
        if (!validateEmail(email)) {
            newErrors.email = 'El correo debe tener un formato válido.';
        }
        if (!validatePassword(password)) {
            newErrors.password = 'La contraseña no puede estar vacía.';
        }
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await loginUser(email, password);
    
                // Verificar si la respuesta del backend indica éxito
                if (response.success) {
                    // Guardar el token o datos del usuario si es necesario
                    localStorage.setItem('user', JSON.stringify(response.user));
                    showSuccessNotification('Inicio de sesión exitoso');
                    // Redirigir al usuario a la página principal
                    window.location.href = '/';
                } else {
                    // Mostrar mensaje de error si el inicio de sesión no fue exitoso
                    showErrorNotification(response.message || 'Credenciales inválidas');
                }
            } catch (err) {
                // Manejar errores de red o del backend
                showErrorNotification(err.response?.data?.message || 'Error al iniciar sesión');
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group remember-me">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Recordarme
                    </label>
                </div>
                <button type="button" onClick={handleLogin} className="login-button">Iniciar Sesión</button>
                <button type="button" onClick={() => window.location.href = '/forgot-password'} className="forgot-password-button">
                    ¿Olvidaste tu contraseña?
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
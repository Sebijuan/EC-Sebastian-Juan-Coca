import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../Shared/ValidationSystem';
import { showErrorNotification } from '../Shared/NotificationSystem';
import '../Layout/Navbar.jsx';
import '../styles/login.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        const newErrors = {};
        if (!validateEmail(email)) {
            newErrors.email = 'El correo debe tener un formato válido.';
        }
        if (!validatePassword(password)) {
            newErrors.password = 'La contraseña no puede estar vacía.';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (password === '4dA1Ts_2425') {
                // Redirigir al panel principal
                window.location.href = '/main-panel';
            } else {
                showErrorNotification('Credenciales inválidas');
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

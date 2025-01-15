import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../Shared/ValidationSystem';
import { showNotification } from '../Shared/NotificationSystem';
import '../Layout/Navbar.jsx';

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
                showNotification('Credenciales inválidas', 'error');
            }
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Recordarme
                    </label>
                </div>
                <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
                <button type="button" onClick={() => window.location.href = '/forgot-password'}>
                    ¿Olvidaste tu contraseña?
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

import React, { useState, useEffect } from 'react';
import '../styles/register.css';
import { validateEmail, validatePassword, validatePasswordMatch } from '../Shared/ValidationSystem';
import { showSuccessNotification, showErrorNotification } from '../Shared/NotificationSystem';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

 

  const handleRegister = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        // Simulate API call for user registration
        const response = await fakeApiCall({ username, email, password });
        if (response.success) {
          showSuccessNotification('Registro exitoso');
          handleLoginRedirect();
        } else {
          showErrorNotification('Error en el registro');
        }
      } catch (error) {
        showErrorNotification('Error en el registro');
      }
    } else {
      showErrorNotification('Por favor, corrija los errores en el formulario');
    }
  };

  const fakeApiCall = async (data) => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login-page';
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
      <button type="button" onClick={handleLoginRedirect}>
        ¿Ya tienes una cuenta? Inicia Sesión
      </button>
    </form>
  );
};

export default RegisterForm;

import React, { useState } from 'react';
import '../styles/auth.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle registration logic here
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
      <label>
        Correo Electrónico:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirmar Contraseña:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Registrarse</button>
      <button type="button" onClick={handleLoginRedirect}>
        ¿Ya tienes una cuenta? Inicia Sesión
      </button>
    </form>
  );
};

export default RegisterForm;

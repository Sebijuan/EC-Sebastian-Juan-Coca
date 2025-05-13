import axios from 'axios';

const API_BASE_URL = 'https://backend-1ddh.onrender.com';

async function registerUser(username, email, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            email,
            password,
        });
        console.log("Registro exitoso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al registrar el usuario:", error.response?.data || error.message);
        throw error.response?.data || { message: 'Error al registrar el usuario' };
    }
}

async function loginUser(email, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });
        return response.data; // Asegúrate de devolver los datos de la respuesta
    } catch (error) {
        throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
}

async function recoverPassword(email) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
            email,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al recuperar la contraseña' };
    }
}

export { registerUser, loginUser, recoverPassword };
import{API_BASE_URL} from './auth_API.js';
export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/car`);
  if (!response.ok) throw new Error('Error al obtener los productos');
  return await response.json();
};
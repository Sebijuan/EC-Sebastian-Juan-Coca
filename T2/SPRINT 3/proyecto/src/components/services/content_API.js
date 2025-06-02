export const fetchProducts = async () => {
  const response = await fetch('/api/car');
  if (!response.ok) throw new Error('Error al obtener los productos');
  return await response.json();
};
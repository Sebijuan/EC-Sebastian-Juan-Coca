import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Aemetpage.css';

const AemetPage = () => {
  const [province, setProvince] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [theme, setTheme] = useState('light');

  const fetchWeatherData = async (province) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching weather data for province: ${province}`);
      const response = await axios.get(`/api/prediccion/especifica/municipio/diaria/${province}`);
      console.log('Weather data response:', response.data);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchForecastData = async (province) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching forecast data for province: ${province}`);
      const response = await axios.get(`/api/prediccion/especifica/municipio/horaria/${province}`);
      console.log('Forecast data response:', response.data);
      setForecastData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!province) {
      setError(new Error('Please enter a valid province code.'));
      return;
    }
    fetchWeatherData(province);
    fetchForecastData(province);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'soleado':
        return '☀️';
      case 'nublado':
        return '☁️';
      case 'lluvia':
        return '🌧️';
      default:
        return '❓';
    }
  };

  return (
    <div className={`aemet-page ${theme}`}>
      <h1>Consulta del Tiempo</h1>
      <input
        type="text"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        placeholder="Introduce una provincia"
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={toggleUnit}>Cambiar a °{unit === 'C' ? 'F' : 'C'}</button>
      <button onClick={toggleTheme}>Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}</button>

      {loading && <div>Cargando...</div>}
      {error && <div>Error: {error.message}</div>}

      {weatherData && (
        <div>
          <h2>Estado Actual</h2>
          <p>Temperatura: {convertTemperature(weatherData.temperatura)}°{unit}</p>
          <p>Condición: {weatherData.estadoCielo} {getWeatherIcon(weatherData.estadoCielo)}</p>
          <p>Viento: {weatherData.viento} km/h</p>
        </div>
      )}

      {forecastData && (
        <div>
          <h2>Pronóstico Detallado</h2>
          <h3>Por Horas</h3>
          {forecastData.horas.map((hora, index) => (
            <div key={index}>
              <p>{hora.fecha}: {convertTemperature(hora.temperatura)}°{unit}, {hora.estadoCielo} {getWeatherIcon(hora.estadoCielo)}</p>
            </div>
          ))}
          <h3>Por Días</h3>
          {forecastData.dias.map((dia, index) => (
            <div key={index}>
              <p>{dia.fecha}</p>
              <p>Mañana: {convertTemperature(dia.manana.temperatura)}°{unit}, {dia.manana.estadoCielo} {getWeatherIcon(dia.manana.estadoCielo)}</p>
              <p>Tarde: {convertTemperature(dia.tarde.temperatura)}°{unit}, {dia.tarde.estadoCielo} {getWeatherIcon(dia.tarde.estadoCielo)}</p>
              <p>Noche: {convertTemperature(dia.noche.temperatura)}°{unit}, {dia.noche.estadoCielo} {getWeatherIcon(dia.noche.estadoCielo)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AemetPage;

import React from 'react';
import './WeatherCard.css';


const WeatherCard = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const temperature = unit === 'C' ? weatherData.tempC : weatherData.tempF;

  return (
    <div className="weather-card">
      <h2>{weatherData.city}</h2>
      <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather icon" />
      <p>{weatherData.description}</p>
      <p>Temperature: {temperature}°{unit}</p>
      <p>Min Temp : {weatherData.tempMin}°{unit}, Max Temp: {weatherData.tempMax}°{unit}</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Wind: {weatherData.windSpeed} m/s {weatherData.windDirection}</p>
    </div>
  );
};

export default WeatherCard;

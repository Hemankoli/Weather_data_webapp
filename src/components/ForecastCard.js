import React from 'react';
import './ForecastCard.css';


const ForecastCard = ({ forecastData, unit }) => {
  return (
    <div className="forecast-card">
      {forecastData.map((day, index) => (
        <div key={index} className="forecast-day">
          <h3>{day.date}</h3>
          <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="weather icon" />
          <p>{day.description}</p>
          <p>Avg Temperature: {unit === 'C' ? day.tempC : day.tempF}°{unit}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;

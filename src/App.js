import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';

//Key Api
const API_KEY = '43be1426e31b507dd3c409f47402935e';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    try {
      // weather api
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      // forecast api
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeatherData({
        city: weatherResponse.data.name,
        tempC: weatherResponse.data.main.temp,
        tempF: (weatherResponse.data.main.temp * 9/5) + 32,
        tempMin: weatherResponse.data.main.temp_min,
        tempMax: weatherResponse.data.main.temp_max,
        humidity: weatherResponse.data.main.humidity,
        windSpeed: weatherResponse.data.wind.speed,
        windDirection: weatherResponse.data.wind.deg,
        description: weatherResponse.data.weather[0].description,
        icon: weatherResponse.data.weather[0].icon,
      });

      const forecast = forecastResponse.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      ).map(item => ({
        date: item.dt_txt.split(' ')[0],
        tempC: item.main.temp,
        tempF: (item.main.temp * 9/5) + 32,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

      setForecastData(forecast);
      setError('');
    } catch (error) {
      setError('City not found, please try again.');
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div className="unit-toggle">
        <button onClick={() => setUnit('C')}>Celsius</button>
        <button onClick={() => setUnit('F')}>Fahrenheit</button>
      </div>
      {error && <p className="error">{error}</p>}
      <WeatherCard weatherData={weatherData} unit={unit} />
      <ForecastCard forecastData={forecastData} unit={unit} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const API_KEY = "15396982da803478c26912f1999866ca";

  const getBackgroundImage = (weatherCode, isDay) => {
    const backgrounds = {
      "01d": "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "01n": "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "02d": "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "02n": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "03d": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "03n": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "04d": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "04n": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "09d": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "09n": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "10d": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "10n": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "11d": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "11n": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "13d": "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "13n": "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "50d": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "50n": "https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    };
    return backgrounds[weatherCode] || backgrounds["01d"];
  };

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )
      ]);
      
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setBackgroundImage(getBackgroundImage(weatherResponse.data.weather[0].icon, true));
      setError("");
      setShowLanding(false);
    } catch (err) {
      setError("City not found, please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "🌨️",
      "13n": "🌨️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return icons[weatherCode] || "🌡️";
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (showLanding) {
    return (
      <div className="landing-page" style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)`
      }}>
        <div className="landing-overlay"></div>
        <div className="landing-content">
          <h1>Weather Dashboard</h1>
          <p>Get detailed weather information for any city around the world</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && getWeather()}
            />
            <button onClick={getWeather} className="search-button">
              Get Weather
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`
    }}>
      <div className="weather-overlay"></div>
      <div className="container">
        <div className="header">
          <h1 className="app-title">Weather Dashboard</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && getWeather()}
            />
            <button onClick={getWeather} className="search-button">
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-dashboard">
            <div className="main-weather-card">
              <h2 className="city-name">{weather.name}</h2>
              <div className="weather-icon">
                {getWeatherIcon(weather.weather[0].icon)}
              </div>
              <p className="weather-description">
                {weather.weather[0].description.toUpperCase()}
              </p>
              <h3 className="temperature">{Math.round(weather.main.temp)}°C</h3>
              <p className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div className="weather-metrics">
              <div className="metric-card temperature-card">
                <h4>Temperature</h4>
                <div className="metric-content">
                  <p>Current: {Math.round(weather.main.temp)}°C</p>
                  <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                  <p>Min: {Math.round(weather.main.temp_min)}°C</p>
                  <p>Max: {Math.round(weather.main.temp_max)}°C</p>
                </div>
              </div>

              <div className="metric-card wind-card">
                <h4>Wind</h4>
                <div className="metric-content">
                  <p>Speed: {weather.wind.speed} m/s</p>
                  <p>Direction: {getWindDirection(weather.wind.deg)}</p>
                  <p>Gust: {weather.wind.gust || 0} m/s</p>
                </div>
              </div>

              <div className="metric-card humidity-card">
                <h4>Humidity & Pressure</h4>
                <div className="metric-content">
                  <p>Humidity: {weather.main.humidity}%</p>
                  <p>Pressure: {weather.main.pressure} hPa</p>
                  <p>Sea Level: {weather.main.sea_level || 'N/A'} hPa</p>
                </div>
              </div>

              <div className="metric-card visibility-card">
                <h4>Visibility & Clouds</h4>
                <div className="metric-content">
                  <p>Visibility: {weather.visibility / 1000} km</p>
                  <p>Clouds: {weather.clouds.all}%</p>
                  <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
                  <p>Sunset: {formatTime(weather.sys.sunset)}</p>
                </div>
              </div>
            </div>

            {forecast && (
              <div className="forecast-section">
                <h3>5-Day Forecast</h3>
                <div className="forecast-cards">
                  {forecast.list.filter((item, index) => index % 8 === 0).map((item, index) => (
                    <div key={index} className="forecast-card">
                      <p className="forecast-date">
                        {new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                      </p>
                      <div className="forecast-icon">
                        {getWeatherIcon(item.weather[0].icon)}
                      </div>
                      <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
                      <p className="forecast-desc">{item.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

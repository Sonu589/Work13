import React, { useState, useEffect } from "react";
import "./css/Weather.css";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import ParticlesBg from "particles-bg";
const API_KEY = "96e71329f0c33246c9042f8e69d7ad55";

function Weather() {
  const [city, setCity] = useState("Pune");
  const [weatherData, setWeatherData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const fetchProfileImage = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 1000);
      const response = await fetch(
        `https://picsum.photos/id/${randomNumber}/info`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfileImageUrl(data.download_url);
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
    fetchProfileImage();

    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const toggleMobileMenus = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="Weather">
      <ParticlesBg type="circle" bg={true} />
      <div className="menu-bar">
        <span className="menu-text">Weather</span>
        <div className="menu-options">
          <Link to="/task">
            <h2 className="Backed">TasksBoard</h2>
          </Link>
          <Link to="/task/Calculator">
            <h2 className="Backed">Calculator</h2>
          </Link>
          <Link to="/task">
            <h2 className="Backed">Back</h2>
          </Link>

          <div
            className="mobile-menu-icons"
            style={{ color: "white" }}
            onClick={toggleMobileMenus}
          >
            <AiOutlineMenu />
          </div>
          <div className="profile-logos">
            {profileImageUrl && (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="profile-images"
              />
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menus">
          <Link to="/task">
            <h2>Back</h2>
          </Link>
          <Link to="/task">
            <h2>TaskBoard</h2>
          </Link>

          <Link to="/task/Calculator">
            <h2>Calculator</h2>
          </Link>
        </div>
      )}

      <div className="titles">5-Day Weather Forecast 
       (Enter Your City)</div>
      <div className="city-input">
        <input
          type="text"
          id="city"
          placeholder="Enter City Name"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      {weatherData && (
        <div className="weather-container">
          <div className="weather">
            {weatherData.list.map((item) => (
              <div key={item.dt} className="weather-card">
                <h2 id="dates">
                  Date: {new Date(item.dt * 1000).toLocaleDateString()}
                </h2>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <p>{item.weather[0].description}</p>
                <p>Temp: {item.main.temp}°C</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Wind Speed: {item.wind.speed} m/s</p>
                <p>High Temp: {item.main.temp_max}°C</p>
                <p>Low Temp: {item.main.temp_min}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;

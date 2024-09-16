import React, { useState } from 'react';
import './WeatherWidget.css';
import clear from '../assets/images/clear.png';
import cloud from '../assets/images/cloud.png';
import mist from '../assets/images/mist.png';
import rain from '../assets/images/rain.png';
import snow from '../assets/images/snow.png';
import errorImg from '../assets/images/404.png';
import { FaSearch, FaWater, FaWind } from 'react-icons/fa';

const WeatherWidget = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091'; // Replace with your API key

    const fetchWeather = async () => {
        if (city === '') return;

        setLoading(true);
        setError(false);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`);
            const data = await response.json();
            console.log('Weather data:', data); // Log data to inspect response

            if (data.cod === '404') {
                setError(true);
                setWeatherData(null);
            } else {
                setWeatherData(data);
                setError(false);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Clear':
                return <img src={clear} alt="Clear" className="w-22 h-20 mx-auto" />;
            case 'Rain':
                return <img src={rain} alt="Rain" className="w-22 h-20 mx-auto" />;
            case 'Snow':
                return <img src={snow} alt="Snow" className="w-22 h-20 mx-auto" />;
            case 'Clouds':
                return <img src={cloud} alt="Clouds" className="w-22 h-20 mx-auto" />;
            case 'Mist':
                return <img src={mist} alt="Clouds" className="w-22 h-20 mx-auto" />;    
            default:
                return <img src={cloud} alt="Unknown" className="w-22 h-20 mx-auto" />;
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-extrabold text-blue-800 mb-4 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                Weather Checker
            </h1>
            <div className="w-80 h-96 p-6 bg-blue-800 rounded-lg shadow-lg flex flex-col items-center text-white overflow-hidden transition-transform duration-500 ease-in-out transform scale-100 hover:scale-105">
                <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4 w-full">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value.toUpperCase())} // Automatically capitalize input
                        placeholder="Enter your city"
                        className="flex-grow p-2 border border-gray-300 rounded-lg text-gray-800 capitalize"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        <FaSearch className="text-2xl" />
                    </button>
                </form>

                {loading && <p className="text-gray-300">Loading...</p>}

                {error && (
                    <div className="text-red-300 text-center flex flex-col items-center">
                        <img src={errorImg} alt="Error" className="w-30 h-30 mb-2" />
                        <p>Oops! Location not found!</p>
                    </div>
                )}

                {weatherData && (
                    <div className="flex flex-col items-center w-full opacity-0 transition-opacity duration-500 ease-in-out animate-drop-in">
                        <div className="flex flex-col items-center mb-4">
                            {getWeatherIcon(weatherData.weather[0].main)}
                            <p className="text-5xl font-bold mt-2">
                                {Math.round(weatherData.main.temp)}<span className="text-xl">°F</span>
                            </p>
                            <p className="text-lg">{weatherData.weather[0].description}</p>
                        </div>

                        <div className="flex justify-between w-full mt-4 space-x-4">
                            <div className="flex flex-col items-center">
                                <FaWater className="text-blue-300 text-3xl mb-1" />
                                <span className="text-xl font-bold">{weatherData.main.humidity}%</span>
                                <span className="text-sm">Humidity</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaWind className="text-gray-300 text-3xl mb-1" />
                                <span className="text-xl font-bold">{Math.round(weatherData.wind.speed)} Km/h</span>
                                <span className="text-sm">Wind Speed</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherWidget;


    
    //APIKey = 98740f4ebc0d63bc0f8ba70090e5a091
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [err, setErr] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${city}`);
      setWeatherData(response.data.result);
      console.log(response.data.result);
      setErr('');
    } catch (err) {
      setErr(err.message);
    }
  };

  const parseWeatherData = (weatherData) => {
    if (!weatherData) {
      return {};
    }

    const [weather, temperature, wind, moon] = weatherData.split(' ');
    return { weather, temperature, wind, moon };
  };

  const parsedWeatherData = parseWeatherData(weatherData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex items-start justify-center h-screen">
      <div className="w-full max-w-md mt-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
          <div className="mb-4 flex flex-col items-center">
            <h1 className="text-center text-xl font-bold text-blue-500 mb-6">Weather App</h1>
            <div className="flex w-full">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => fetchWeather()}
              >
                Enter
              </button>
            </div>
          </div>

          {err && <p className="text-red-500">{err}</p>}

          {parsedWeatherData.weather && (
            <div>
              <p>
                <label>Cloud : </label> <span>{parsedWeatherData.weather}</span>
              </p>
              <p>
                <label>Temp : </label> <span>{parsedWeatherData.temperature}</span>
              </p>
              <p>
                <label>Wind : </label> <span>{parsedWeatherData.wind}</span>
              </p>
              <p>
                <label>Moon : </label> <span>{parsedWeatherData.moon}</span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
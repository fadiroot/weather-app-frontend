import React from 'react';
import TemperatureChart from './TemperatureChart';

const WeatherCard = ({ weather, isCurrentDay, forecastData }) => {
  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-4xl mb-2">❓</div>
          <p className="text-gray-500 text-center">No weather data available</p>
        </div>
      </div>
    );
  }

  // Format the date to be more readable
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className={`rounded-lg shadow-lg p-4 h-full transition-all duration-300 ${
      isCurrentDay 
        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
        : 'bg-white'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header with city and date */}
        <div className="mb-4">
          <h2 className={`text-xl font-bold truncate ${isCurrentDay ? 'text-white' : 'text-gray-800'}`} title={weather.city}>
            {weather.city}
          </h2>
          <p className={`text-sm ${isCurrentDay ? 'text-blue-100' : 'text-gray-600'}`}>
            {formatDate(weather.date)}
          </p>
        </div>

        {/* Temperature and weather icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`text-3xl font-bold ${isCurrentDay ? 'text-white' : 'text-blue-600'}`}>
            {weather.temperature}°C
          </div>
          <div className="flex items-center">
            <img
              src={weather.icon}
              alt={weather.description}
              className="w-12 h-12"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
              }}
            />
            <span className={`ml-2 text-sm truncate max-w-[120px] ${isCurrentDay ? 'text-white' : 'text-gray-700'}`} title={weather.description}>
              {weather.description}
            </span>
          </div>
        </div>

        {/* Temperature Chart - Only show for current day */}
        {isCurrentDay && forecastData && (
          <div className="mb-4">
            <TemperatureChart data={[weather, ...forecastData]} isCurrentDay={isCurrentDay} />
          </div>
        )}

        {/* Weather details */}
        <div className={`mt-auto grid grid-cols-2 gap-3 pt-3 border-t ${isCurrentDay ? 'border-blue-400' : 'border-gray-100'}`}>
          <div className="flex flex-col">
            <span className={`text-xs ${isCurrentDay ? 'text-blue-100' : 'text-gray-500'}`}>Humidity</span>
            <span className={`font-semibold ${isCurrentDay ? 'text-white' : 'text-gray-700'}`}>{weather.humidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-xs ${isCurrentDay ? 'text-blue-100' : 'text-gray-500'}`}>Wind Speed</span>
            <span className={`font-semibold ${isCurrentDay ? 'text-white' : 'text-gray-700'}`}>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 
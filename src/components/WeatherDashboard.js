import React, { useState, useEffect } from 'react';
import { 
  useGetCurrentWeatherQuery, 
  useGetForecastQuery,
  useGetWeatherHistoryQuery,
  useAddWeatherHistoryMutation
} from '../store/weatherApi';
import WeatherCard from './WeatherCard';
import SearchHistory from './SearchHistory';

const WeatherDashboard = () => {
  const [city, setCity] = useState('London');
  const [searchCity, setSearchCity] = useState('London');
  const [error, setError] = useState(null);

  // Get weather history
  const { data: historyData, refetch: refetchHistory } = useGetWeatherHistoryQuery();
  const [addToHistory] = useAddWeatherHistoryMutation();

  const { 
    data: currentWeather, 
    isLoading: currentLoading,
  
  } = useGetCurrentWeatherQuery(searchCity, {
    skip: !searchCity,
    onError: (error) => {
      if (error.status === 404) {
        setError('City not found');
      } else {
        setError('Error loading weather data');
      }
    }
  });

  const { 
    data: forecast, 
    isLoading: forecastLoading,
  } = useGetForecastQuery(searchCity, {
    skip: !searchCity
  });

  useEffect(() => {
    if (currentWeather && forecast) {
      setError(null);
      console.log('Current Weather:', currentWeather);
      console.log('Forecast:', forecast);
    }
  }, [currentWeather, forecast]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setError(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      const trimmedCity = city.trim();
      setSearchCity(trimmedCity);
      
      // Add to history
      try {
        await addToHistory(trimmedCity).unwrap();
        // Refresh history after adding
        await refetchHistory();
      } catch (error) {
        console.error('Failed to add to history:', error);
      }
    }
  };

  const handleHistorySelect = (selectedCity) => {
    setCity(selectedCity);
    setSearchCity(selectedCity);
    setError(null);
  };

  if (currentLoading || forecastLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city name"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">City Not Found</h2>
          <p className="text-gray-600">We couldn't find weather data for "{city}"</p>
          <p className="text-gray-500 text-sm mt-2">Please try searching for another city</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Form */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Main Content and History */}
      <div className="flex gap-6">
        {/* Weather Cards */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentWeather && (
              <div className="col-span-full sm:col-span-2 lg:col-span-1">
                <WeatherCard 
                  weather={currentWeather} 
                  isCurrentDay={true}
                  forecastData={forecast}
                />
              </div>
            )}
            {forecast && forecast.map((day, index) => (
              <div key={index} className="col-span-1">
                <WeatherCard weather={day} isCurrentDay={false} />
              </div>
            ))}
          </div>
        </div>

        {/* History Sidebar */}
        <div className="w-72 hidden lg:block flex-shrink-0">
          <SearchHistory 
            history={historyData || []} 
            onSelectCity={handleHistorySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard; 
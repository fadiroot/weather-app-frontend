import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '90890357e84b4b85a2e95802250806';
const BASE_URL = 'http://api.weatherapi.com/v1';
const HISTORY_BASE_URL = 'http://localhost:5186';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city) => ({
        url: '/current.json',
        params: {
          key: API_KEY,
          q: city,
          aqi: 'no'
        }
      }),
      transformResponse: (response) => ({
        city: response.location.name,
        date: response.location.localtime,
        temperature: Math.round(response.current.temp_c),
        description: response.current.condition.text,
        icon: `https:${response.current.condition.icon}`,
        humidity: response.current.humidity,
        windSpeed: Math.round(response.current.wind_kph)
      })
    }),
    getForecast: builder.query({
      query: (city) => ({
        url: '/forecast.json',
        params: {
          key: API_KEY,
          q: city,
          days: 3,
          aqi: 'no'
        }
      }),
      transformResponse: (response) => {
        return response.forecast.forecastday.map(day => ({
          city: response.location.name,
          date: day.date,
          temperature: Math.round(day.day.avgtemp_c),
          description: day.day.condition.text,
          icon: `https:${day.day.condition.icon}`,
          humidity: day.day.avghumidity,
          windSpeed: Math.round(day.day.maxwind_kph)
        }));
      }
    }),
    getWeatherHistory: builder.query({
      query: () => ({
        url: `${HISTORY_BASE_URL}/weatherhistory`,
        method: 'GET'
      })
    }),
    addWeatherHistory: builder.mutation({
      query: (city) => ({
        url: `${HISTORY_BASE_URL}/weatherhistory`,
        method: 'POST',
        body: {
          name: city,
          searchTime: new Date().toISOString()
        }
      })
    })
  }),
});

export const { 
  useGetCurrentWeatherQuery, 
  useGetForecastQuery,
  useGetWeatherHistoryQuery,
  useAddWeatherHistoryMutation
} = weatherApi; 
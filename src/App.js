import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold text-center">Weather Dashboard</h1>
        </header>
        <main>
          <WeatherDashboard />
        </main>
      </div>
    </Provider>
  );
}

export default App; 
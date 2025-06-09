import React from 'react';

const SearchHistory = ({ history, onSelectCity }) => {
  // Format time function
  const formatTime = (timeString) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  if (!history || !Array.isArray(history) || history.length === 0) {
    return (
      <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Recent Searches
          </h3>
        </div>
        <div className="p-4 text-center text-gray-500">
          No search history yet
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          Recent Searches
        </h3>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <ul className="divide-y divide-gray-100">
          {history.map((item) => {
            // Ensure we have the correct properties from the API response
            const cityName = item.name || item.titleofcountry || '';
            const searchTime = formatTime(item.searchTime);

            if (!cityName) return null;

            return (
              <li 
                key={item.id}
                className="group"
              >
                <button
                  onClick={() => onSelectCity(cityName)}
                  className="w-full px-4 py-3 flex items-center hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-gray-700 font-medium truncate group-hover:text-blue-600 transition-colors duration-200">
                      {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-xs ml-2 whitespace-nowrap group-hover:text-blue-500 transition-colors duration-200">
                      {searchTime}
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {history.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {history.length} recent {history.length === 1 ? 'search' : 'searches'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchHistory; 
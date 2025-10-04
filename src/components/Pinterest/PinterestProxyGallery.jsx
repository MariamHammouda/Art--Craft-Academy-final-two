import React, { useState } from 'react';
import { usePinterestBoards, useBoardPins, usePinterestSearch, useProxyHealth } from '../../hooks/usePinterestProxy';

const PinterestProxyGallery = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAvailable: proxyAvailable, loading: proxyLoading, checkHealth } = useProxyHealth();
  const { boards, loading: boardsLoading, error: boardsError } = usePinterestBoards();
  const { pins: boardPins, loading: pinsLoading, error: pinsError } = useBoardPins(selectedBoard?.id, 20);
  const { pins: searchPins, loading: searchLoading, search } = usePinterestSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      search(searchQuery);
    }
  };

  if (proxyLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking proxy server...</p>
        </div>
      </div>
    );
  }

  if (!proxyAvailable) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">🚫 Proxy Server Not Available</h2>
          <p className="text-red-700 mb-4">
            The Pinterest proxy server is not running. Please start it to access Pinterest API.
          </p>
          <div className="bg-gray-100 p-4 rounded text-left text-sm font-mono mb-4">
            <p className="mb-2"><strong>To start the proxy server:</strong></p>
            <p>1. cd to your project directory</p>
            <p>2. npm install express cors node-fetch dotenv</p>
            <p>3. node pinterest-proxy-server.js</p>
            <p>4. Server will run on http://localhost:3001</p>
          </div>
          <button 
            onClick={checkHealth}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Check Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎨 Art & Craft Academy - Pinterest Gallery (Full API)
        </h1>
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Proxy Server Connected
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Pinterest pins..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={searchLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          >
            {searchLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchPins.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchPins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Boards List */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Your Pinterest Boards</h2>
          
          {boardsLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <span className="ml-2">Loading boards...</span>
            </div>
          )}
          
          {boardsError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {boardsError}
            </div>
          )}
          
          {boards.length > 0 && (
            <div className="space-y-2">
              {boards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setSelectedBoard(board)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedBoard?.id === board.id
                      ? 'bg-red-50 border-red-300 text-red-800'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-semibold">{board.name}</h3>
                  <p className="text-sm text-gray-600">{board.pin_count || 0} pins</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Board Pins */}
        <div className="lg:col-span-2">
          {selectedBoard ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Pins from "{selectedBoard.name}"
              </h2>
              
              {pinsLoading && (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  <span className="ml-2">Loading pins...</span>
                </div>
              )}
              
              {pinsError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <strong>Error:</strong> {pinsError}
                </div>
              )}
              
              {boardPins.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {boardPins.map((pin) => (
                    <PinCard key={pin.id} pin={pin} />
                  ))}
                </div>
              )}
              
              {!pinsLoading && !pinsError && boardPins.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  No pins found in this board.
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-8 text-gray-500">
              <h2 className="text-2xl font-semibold mb-4">Select a Board</h2>
              <p>Choose a Pinterest board from the left to view its pins.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Pin Card Component
const PinCard = ({ pin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-200">
        <img
          src={pin.thumbnailUrl || pin.imageUrl}
          alt={pin.altText}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle" dy=".3em">Pinterest Image</text></svg>`)}`;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2">
          {pin.title}
        </h3>
        {pin.description && (
          <p className="text-xs text-gray-600 line-clamp-3 mb-3">
            {pin.description}
          </p>
        )}
        {pin.link && (
          <a
            href={pin.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-red-600 hover:text-red-800"
          >
            <span className="mr-1">📌</span>
            View on Pinterest
          </a>
        )}
      </div>
    </div>
  );
};

export default PinterestProxyGallery;

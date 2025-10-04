import React, { useState, useEffect } from 'react';
import { useCategoryPins, usePinterestBoards } from '../../hooks/usePinterestPins';
import { fetchUserProfile, fetchUserBoards } from '../../services/pinterestApi';

const PinterestDebug = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [directTestResult, setDirectTestResult] = useState(null);
  const [directTestLoading, setDirectTestLoading] = useState(false);
  const { boards, loading: boardsLoading, error: boardsError } = usePinterestBoards();
  const { pins, loading: pinsLoading, error: pinsError } = useCategoryPins(selectedCategory, 10);

  const testDirectAPI = async () => {
    setDirectTestLoading(true);
    setDirectTestResult(null);
    
    try {
      console.log('🧪 Testing direct Pinterest API calls...');
      
      // Test 1: User Profile
      console.log('📋 Testing user profile...');
      const profile = await fetchUserProfile();
      console.log('Profile result:', profile);
      
      // Test 2: User Boards
      console.log('📋 Testing user boards...');
      const boardsData = await fetchUserBoards();
      console.log('Boards result:', boardsData);
      
      setDirectTestResult({
        success: true,
        profile,
        boards: boardsData,
        message: `✅ API working! Found ${boardsData?.length || 0} boards`
      });
      
    } catch (error) {
      console.error('❌ Direct API test failed:', error);
      setDirectTestResult({
        success: false,
        error: error.message,
        message: `❌ API failed: ${error.message}`
      });
    } finally {
      setDirectTestLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔍 PinterestDebug component mounted');
    console.log('Boards:', boards);
    console.log('Pins for category', selectedCategory, ':', pins);
  }, [boards, pins, selectedCategory]);

  const categories = [
    { id: 1, name: 'Origami & Paper Crafts' },
    { id: 2, name: 'Drawing' },
    { id: 3, name: 'Recycling Art' },
    { id: 4, name: 'Beads & Accessories' },
    { id: 5, name: 'Clay Creations' },
    { id: 6, name: 'Preschool Crafts' },
    { id: 7, name: 'Perler Beads' },
    { id: 8, name: '3D Pen Fun' },
    { id: 9, name: 'Miniature Wonders' },
    { id: 10, name: 'Science & DIY Experiments' },
    { id: 11, name: 'Tips & Tricks' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🔍 Pinterest Integration Debug</h1>
        
        {/* Pinterest Token Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Pinterest Token Status</h2>
          <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-4">
            Token: {import.meta.env.VITE_PINTEREST_TOKEN ? 
              `${import.meta.env.VITE_PINTEREST_TOKEN.substring(0, 20)}...` : 
              'NOT FOUND'
            }
          </div>
          
          {/* Direct API Test */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Direct API Test</h3>
            <button 
              onClick={testDirectAPI}
              disabled={directTestLoading}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
            >
              {directTestLoading ? 'Testing...' : 'Test Pinterest API'}
            </button>
            
            {directTestResult && (
              <div className={`mt-4 p-3 rounded ${directTestResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="font-semibold">{directTestResult.message}</p>
                {directTestResult.success && directTestResult.boards && (
                  <p className="text-sm mt-2">
                    Boards found: {directTestResult.boards.map(b => b.name).join(', ')}
                  </p>
                )}
                {!directTestResult.success && (
                  <p className="text-sm mt-2">Error: {directTestResult.error}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Boards Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Pinterest Boards</h2>
          
          {boardsLoading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Loading boards...</span>
            </div>
          )}
          
          {boardsError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {boardsError}
            </div>
          )}
          
          {boards && boards.length > 0 && (
            <div>
              <p className="mb-4 text-green-600 font-semibold">✅ Found {boards.length} boards:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map(board => (
                  <div key={board.id} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800">{board.name}</h3>
                    <p className="text-sm text-gray-600">ID: {board.id}</p>
                    <p className="text-sm text-gray-600">Pins: {board.pin_count || 0}</p>
                    <p className="text-sm text-gray-600">Privacy: {board.privacy || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!boardsLoading && !boardsError && (!boards || boards.length === 0) && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No boards found. Check your Pinterest token and permissions.
            </div>
          )}
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Category Pins</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category:
            </label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.id}. {cat.name}
                </option>
              ))}
            </select>
          </div>

          {pinsLoading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Loading pins for category {selectedCategory}...</span>
            </div>
          )}
          
          {pinsError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {pinsError}
            </div>
          )}
          
          {pins && pins.length > 0 && (
            <div>
              <p className="mb-4 text-green-600 font-semibold">✅ Found {pins.length} pins for category {selectedCategory}:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pins.slice(0, 8).map(pin => (
                  <div key={pin.id} className="border rounded-lg overflow-hidden bg-white">
                    {pin.thumbnailUrl && (
                      <img 
                        src={pin.thumbnailUrl} 
                        alt={pin.title}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY5NzU4ZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    )}
                    <div className="p-3">
                      <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                        {pin.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {pin.description}
                      </p>
                      {pin.link && (
                        <a 
                          href={pin.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline mt-2 block"
                        >
                          View on Pinterest
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!pinsLoading && !pinsError && (!pins || pins.length === 0) && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No pins found for category {selectedCategory}. Check the board mapping and ensure the board exists.
            </div>
          )}
        </div>

        {/* Console Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Debug Instructions</h2>
          <div className="text-blue-700">
            <p className="mb-2">1. Open browser Developer Tools (F12)</p>
            <p className="mb-2">2. Go to Console tab</p>
            <p className="mb-2">3. Look for Pinterest API logs with 📌 emoji</p>
            <p className="mb-2">4. Check for any error messages</p>
            <p className="mb-2">5. Verify API calls are being made</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinterestDebug;

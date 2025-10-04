import React, { useState } from 'react';

const QuickPinterestTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testPinterestAPI = async () => {
    setLoading(true);
    setResult('Testing Pinterest API...\n');
    
    const PINTEREST_TOKEN = import.meta.env.VITE_PINTEREST_TOKEN;
    const PINTEREST_API_BASE_URL = 'https://api.pinterest.com/v5';
    
    try {
      // Test 1: Check token
      setResult(prev => prev + `Token: ${PINTEREST_TOKEN ? 'Found' : 'Missing'}\n`);
      
      if (!PINTEREST_TOKEN) {
        setResult(prev => prev + 'ERROR: No Pinterest token found!\n');
        setLoading(false);
        return;
      }

      // Test 2: Fetch boards
      setResult(prev => prev + 'Fetching boards...\n');
      
      const response = await fetch(`${PINTEREST_API_BASE_URL}/boards?page_size=25`, {
        headers: {
          'Authorization': `Bearer ${PINTEREST_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      setResult(prev => prev + `API Response: ${response.status} ${response.statusText}\n`);

      if (!response.ok) {
        const errorText = await response.text();
        setResult(prev => prev + `ERROR: ${errorText}\n`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      const boards = data.items || [];
      
      setResult(prev => prev + `SUCCESS: Found ${boards.length} boards\n`);
      
      boards.forEach((board, index) => {
        setResult(prev => prev + `${index + 1}. "${board.name}" (${board.pin_count || 0} pins)\n`);
      });

      // Test 3: Try to fetch pins from first board
      if (boards.length > 0) {
        const firstBoard = boards[0];
        setResult(prev => prev + `\nTesting pins from "${firstBoard.name}"...\n`);
        
        const pinsResponse = await fetch(`${PINTEREST_API_BASE_URL}/boards/${firstBoard.id}/pins?page_size=5`, {
          headers: {
            'Authorization': `Bearer ${PINTEREST_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (pinsResponse.ok) {
          const pinsData = await pinsResponse.json();
          const pins = pinsData.items || [];
          setResult(prev => prev + `SUCCESS: Found ${pins.length} pins in "${firstBoard.name}"\n`);
          
          pins.forEach((pin, index) => {
            const imageUrl = pin.media?.images?.['236x']?.url || 'No image';
            setResult(prev => prev + `  Pin ${index + 1}: "${pin.title || 'Untitled'}" - ${imageUrl !== 'No image' ? 'Has image' : 'No image'}\n`);
          });
        } else {
          setResult(prev => prev + `ERROR fetching pins: ${pinsResponse.status}\n`);
        }
      }

    } catch (error) {
      setResult(prev => prev + `ERROR: ${error.message}\n`);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed top-4 right-4 bg-white border-2 border-red-500 rounded-lg p-4 max-w-md z-50 shadow-lg">
      <h3 className="font-bold text-lg mb-2">🔍 Quick Pinterest Test</h3>
      
      <button 
        onClick={testPinterestAPI}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400 mb-2"
      >
        {loading ? 'Testing...' : 'Test Pinterest API'}
      </button>
      
      {result && (
        <div className="bg-gray-100 p-2 rounded text-xs font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
          {result}
        </div>
      )}
    </div>
  );
};

export default QuickPinterestTest;

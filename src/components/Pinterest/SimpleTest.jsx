import React from 'react';
import { getCuratedImages, PINTEREST_BOARDS } from '../../services/pinterestEmbedAPI';

const SimpleTest = () => {
  console.log('🧪 SimpleTest component loaded');
  
  const origamiImages = getCuratedImages('origami', 3);
  const drawingImages = getCuratedImages('drawing', 3);
  
  console.log('🧪 Origami images:', origamiImages);
  console.log('🧪 Drawing images:', drawingImages);
  console.log('🧪 Pinterest boards:', PINTEREST_BOARDS);

  return (
    <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 m-4">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">🧪 Pinterest Test Component</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold text-yellow-700">Origami Images ({origamiImages?.length || 0}):</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {origamiImages?.slice(0, 3).map((img, index) => (
            <div key={index} className="bg-white p-2 rounded border">
              <img 
                src={img.imageUrl} 
                alt={img.title}
                className="w-full h-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <p className="text-xs mt-1 truncate">{img.title}</p>
            </div>
          )) || <p className="text-red-600">No images found</p>}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-yellow-700">Drawing Images ({drawingImages?.length || 0}):</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {drawingImages?.slice(0, 3).map((img, index) => (
            <div key={index} className="bg-white p-2 rounded border">
              <img 
                src={img.imageUrl} 
                alt={img.title}
                className="w-full h-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <p className="text-xs mt-1 truncate">{img.title}</p>
            </div>
          )) || <p className="text-red-600">No images found</p>}
        </div>
      </div>

      <div className="bg-white p-3 rounded border">
        <h3 className="font-semibold text-yellow-700 mb-2">Pinterest Boards:</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(PINTEREST_BOARDS).map(([key, url]) => (
            <li key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <span className="text-blue-600 truncate ml-2">{url}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <p className="text-yellow-700 text-sm">
          Check the browser console for detailed logs
        </p>
      </div>
    </div>
  );
};

export default SimpleTest;

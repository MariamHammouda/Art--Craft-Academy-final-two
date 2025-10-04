import React, { useEffect, useRef, useState } from 'react';
import { 
  fetchPinterestBoardEmbed, 
  generatePinterestWidget, 
  loadPinterestScript,
  getCuratedImages 
} from '../../services/pinterestEmbedAPI';

const PinterestBoard = ({ 
  boardUrl, 
  category, 
  width = 400, 
  height = 400, 
  cols = 2,
  showFallback = true 
}) => {
  const [embedData, setEmbedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useWidget, setUseWidget] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try oEmbed API first
        const data = await fetchPinterestBoardEmbed(boardUrl);
        
        if (data) {
          setEmbedData(data);
        } else {
          // Fallback to widget
          setUseWidget(true);
          await loadPinterestScript();
        }
      } catch (err) {
        console.error('Pinterest embed error:', err);
        setError(err.message);
        if (showFallback) {
          setUseWidget(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (boardUrl) {
      fetchEmbed();
    }
  }, [boardUrl, showFallback]);

  useEffect(() => {
    if (useWidget && widgetRef.current && window.PinUtils) {
      // Initialize Pinterest widget
      window.PinUtils.build();
    }
  }, [useWidget]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-2 text-gray-600">Loading Pinterest board...</span>
      </div>
    );
  }

  if (error && !showFallback) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p><strong>Pinterest Error:</strong> {error}</p>
      </div>
    );
  }

  // Show Pinterest widget
  if (useWidget) {
    return (
      <div className="pinterest-widget-container">
        <div 
          ref={widgetRef}
          dangerouslySetInnerHTML={{ 
            __html: generatePinterestWidget(boardUrl, width, height, cols) 
          }}
        />
        {showFallback && (
          <PinterestFallback category={category} boardUrl={boardUrl} />
        )}
      </div>
    );
  }

  // Show oEmbed data
  if (embedData) {
    return (
      <div className="pinterest-embed-container">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{embedData.title}</h3>
          <p className="text-sm text-gray-600">by {embedData.author_name}</p>
        </div>
        
        {embedData.thumbnail_url && (
          <div className="mb-4">
            <img 
              src={embedData.thumbnail_url} 
              alt={embedData.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <a 
          href={boardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <span className="mr-2">📌</span>
          View Full Board on Pinterest
        </a>
      </div>
    );
  }

  // Fallback to curated images
  return showFallback ? (
    <PinterestFallback category={category} boardUrl={boardUrl} />
  ) : null;
};

// Fallback component with curated images
const PinterestFallback = ({ category, boardUrl }) => {
  const images = getCuratedImages(category, 6);

  if (images.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No Pinterest content available for this category.</p>
        <a 
          href={boardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <span className="mr-2">📌</span>
          Visit Pinterest Board
        </a>
      </div>
    );
  }

  return (
    <div className="pinterest-fallback">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {category.charAt(0).toUpperCase() + category.slice(1)} Inspiration
        </h3>
        <p className="text-sm text-gray-600">Curated from Pinterest</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((image) => (
          <div key={image.id} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle" dy=".3em">Pinterest Image</text></svg>`)}`;
                }}
              />
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                {image.title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <a 
          href={boardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <span className="mr-2">📌</span>
          View Full Board on Pinterest
        </a>
      </div>
    </div>
  );
};

export default PinterestBoard;

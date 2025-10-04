import React, { useEffect, useRef } from 'react';

const PinterestRealWidget = ({ boardUrl, title, width = 400, height = 400, cols = 2 }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Load Pinterest script
    const loadPinterestScript = () => {
      if (window.PinUtils) {
        window.PinUtils.build();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://assets.pinterest.com/js/pinit.js';
      script.onload = () => {
        if (window.PinUtils) {
          window.PinUtils.build();
        }
      };
      document.head.appendChild(script);
    };

    loadPinterestScript();
  }, []);

  const extractBoardId = (url) => {
    const match = url.match(/pinterest\.com\/([^\/]+)\/([^\/]+)/);
    return match ? `${match[1]}/${match[2]}` : null;
  };

  const boardId = extractBoardId(boardUrl);

  return (
    <div className="pinterest-real-widget">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-red-50 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{title || 'Pinterest Board'}</h3>
              <p className="text-sm text-gray-600">Real Pinterest Content</p>
            </div>
          </div>
        </div>

        {/* Pinterest Widget */}
        <div className="p-4">
          <div
            ref={widgetRef}
            dangerouslySetInnerHTML={{
              __html: `
                <a data-pin-do="embedBoard" 
                   data-pin-board-width="${width}" 
                   data-pin-scale-height="${height}" 
                   data-pin-scale-width="${width}"
                   data-pin-board-cols="${cols}"
                   href="${boardUrl}">
                </a>
              `
            }}
          />
          
          {/* Fallback if widget doesn't load */}
          <div className="mt-4 text-center">
            <a
              href={boardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <span className="mr-2">📌</span>
              View on Pinterest
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinterestRealWidget;

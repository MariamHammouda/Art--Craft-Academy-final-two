import React, { useEffect, useRef } from 'react';

const PinterestRealWidget = ({ boardUrl, title, width = 800, height = 600, cols = 3 }) => {
  const widgetRef = useRef(null);

  // Ensure the Pinterest script is present and builds widgets
  useEffect(() => {
    const ensurePinterestScript = () => {
      if (window.PinUtils && typeof window.PinUtils.build === 'function') {
        // Build widgets for current DOM
        window.PinUtils.build();
        return;
      }

      // Inject script once and build on load
      const existing = document.querySelector('script[src="https://assets.pinterest.com/js/pinit.js"]');
      if (!existing) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://assets.pinterest.com/js/pinit.js';
        script.onload = () => {
          if (window.PinUtils && typeof window.PinUtils.build === 'function') {
            window.PinUtils.build();
          }
        };
        document.head.appendChild(script);
      }
    };

    ensurePinterestScript();
  }, []);

  // Rebuild widget whenever inputs change (e.g., tab switch, category change)
  useEffect(() => {
    if (!widgetRef.current) return;

    // Re-inject the anchor so PinUtils can pick it up
  widgetRef.current.innerHTML = `
  <a data-pin-do="embedBoard" 
     data-pin-board-width="${width}" 
     data-pin-scale-height="${height}" 
     data-pin-scale-width="${width}"
     data-pin-board-cols="${cols}"
     href="${boardUrl}">
  </a>
`;


    // If script is ready, rebuild immediately
    if (window.PinUtils && typeof window.PinUtils.build === 'function') {
      window.PinUtils.build();
    }
  }, [boardUrl, width, height, cols]);

  const extractBoardId = (url) => {
    const match = url.match(/pinterest\.com\/([^\/]+)\/([^\/]+)/);
    return match ? `${match[1]}/${match[2]}` : null;
  };

  const boardId = extractBoardId(boardUrl);

  return (
    <div className="pinterest-real-widget">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-3 sm:p-4 bg-red-50 border-b">
          <div className="flex items-center">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <span className="text-white text-xs sm:text-sm font-bold">P</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{title || 'Pinterest Board'}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Real Pinterest Content</p>
            </div>
          </div>
        </div>

        {/* Pinterest Widget */}
        <div className="p-2 sm:p-4">
          <div ref={widgetRef} className="w-full overflow-hidden" />

          
          {/* Fallback if widget doesn't load */}
          <div className="mt-3 sm:mt-4 text-center">
            <a
              href={boardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 touch-manipulation"
            >
              <span className="mr-2 text-base sm:text-lg">📌</span>
              View on Pinterest
            </a>
          </div>
        </div>
      </div>

          {/* Force Pinterest iframe to take full width */}
<style>
  {`
    .pinterest-real-widget {
      width: 100% !important;
    }
    .pinterest-real-widget > div,
    .pinterest-real-widget iframe,
    .pinterest-real-widget .PinterestWidget,
    .pinterest-real-widget .PinBoard {
      width: 100% !important;
      max-width: none !important;
    }
  `}
</style>

    </div>
  );
};

export default PinterestRealWidget;

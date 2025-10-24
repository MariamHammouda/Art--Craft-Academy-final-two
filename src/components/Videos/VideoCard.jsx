import React, { memo, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VideoCard = ({ id, url, titleKey, categoryTitleKey, title, categoryTitle, thumbnail, isMobile }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showIframe, setShowIframe] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Suppress YouTube CORS errors (they're harmless and expected)
  useEffect(() => {
    const handleError = (event) => {
      // Suppress SecurityError from YouTube iframe
      if (event.message && event.message.includes('cross-origin')) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };
    
    window.addEventListener('error', handleError, true);
    return () => window.removeEventListener('error', handleError, true);
  }, []);
  
  // Safety checks for props
  if (!id || !url) {
    console.warn('VideoCard: Missing required props', { id, url });
    return null;
  }
  
  // Use translation key if available, otherwise fallback to direct title
  const displayTitle = titleKey ? t(titleKey) : (title || 'Untitled Video');
  const displayCategoryTitle = categoryTitleKey ? t(categoryTitleKey) : (categoryTitle || '');
  
  // Extract video ID from URL for thumbnail with error handling
  const getVideoId = (url) => {
    try {
      if (!url || typeof url !== 'string') return null;
      const match = url.match(/embed\/([^?]+)/);
      return match ? match[1] : null;
    } catch (err) {
      console.warn('Error extracting video ID:', err);
      return null;
    }
  };
  
  const videoId = getVideoId(url);
  const thumbnailUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null);
  
  // Memoized event handlers to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎬 VideoCard clicked:', { id, title: displayTitle });
    }
    
    // Use React Router navigate for proper HashRouter navigation
    navigate(`/video/${id}`);
  }, [id, displayTitle, navigate]);
  
  const handleYouTubeClick = useCallback((e) => {
    e.stopPropagation(); // Prevent card click
    try {
      const videoId = getVideoId(url);
      if (videoId) {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(youtubeUrl, '_blank');
      }
    } catch (err) {
      console.error('Error opening YouTube link:', err);
    }
  }, [url]);
  
  const handleMouseEnter = useCallback(() => {
    // Lazy load iframe on hover for better performance (desktop only)
    if (!isMobile) {
      setShowIframe(true);
    }
  }, [isMobile]);
  
  const handlePlayClick = useCallback((e) => {
    e.stopPropagation(); // Prevent card click
    // Load iframe and start playing
    setShowIframe(true);
    setIsPlaying(true);
  }, []);
  
  return (
    <div 
      className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow group optimize-scroll"
      onMouseEnter={handleMouseEnter}
      style={{ willChange: 'auto' }}
    >
      <div className="aspect-video relative bg-gray-100" style={{ transform: 'translateZ(0)' }}>
        {showIframe ? (
          <iframe
            className="w-full h-full"
            src={`${url}${isPlaying ? '?autoplay=1&mute=0' : ''}`}
            title={displayTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-presentation allow-forms"
            referrerPolicy="no-referrer-when-downgrade"
            onError={(e) => {
              console.log('Iframe load event (this is normal)');
            }}
          />
        ) : (
          <>
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={displayTitle}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <button
                onClick={handlePlayClick}
                className="w-10 h-10 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 hover:scale-110 transition-all touch-manipulation"
                aria-label="Play video"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </>
        )}
        {/* Click overlay for desktop - navigate to detail page on thumbnail click */}
        {!showIframe && !isMobile && (
          <div 
            className="absolute inset-0 cursor-pointer bg-transparent hover:bg-black hover:bg-opacity-10 transition-all z-10"
            onClick={handleClick}
            title="Click to view video details"
            style={{ pointerEvents: 'auto' }}
          />
        )}
      </div>
      <div className="p-2 sm:p-4">
        <div 
          className="cursor-pointer"
          onClick={handleClick}
        >
          <h4 className="font-semibold text-xs sm:text-base text-gray-800 mb-1 line-clamp-2 group-hover:text-[#59ACBE] transition-colors">{displayTitle}</h4>
          {displayCategoryTitle && (
            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 line-clamp-1">{displayCategoryTitle}</p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
          {/* View Details Button - visible on mobile */}
          <button
            onClick={handleClick}
            className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs sm:text-sm text-[#59ACBE] hover:text-white bg-[#59ACBE]/10 hover:bg-[#59ACBE] border border-[#59ACBE] rounded-full font-medium transition-all sm:border-0 sm:bg-transparent sm:hover:bg-transparent sm:hover:text-[#4a9bb0] sm:px-0 sm:py-0 touch-manipulation"
          >
            <span>View Details</span>
            <span className="hidden sm:inline">→</span>
          </button>
          
          {/* YouTube External Link Button */}
          <button
            onClick={handleYouTubeClick}
            className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors w-full sm:w-auto touch-manipulation"
            title="Watch on YouTube"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="hidden sm:inline">YouTube</span>
            <span className="sm:hidden">Open in App</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Memoized component with custom comparison for better performance
export default memo(VideoCard, (prevProps, nextProps) => {
  // Only re-render if essential props change
  return (
    prevProps.id === nextProps.id &&
    prevProps.url === nextProps.url &&
    prevProps.title === nextProps.title &&
    prevProps.titleKey === nextProps.titleKey &&
    prevProps.categoryTitle === nextProps.categoryTitle &&
    prevProps.categoryTitleKey === nextProps.categoryTitleKey &&
    prevProps.thumbnail === nextProps.thumbnail
  );
})
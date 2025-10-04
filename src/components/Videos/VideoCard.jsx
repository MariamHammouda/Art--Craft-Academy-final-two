import React, { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VideoCard = ({ id, url, titleKey, categoryTitleKey, title, categoryTitle, thumbnail }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showIframe, setShowIframe] = useState(false);
  
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
    // Lazy load iframe on hover for better performance
    setShowIframe(true);
  }, []);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
      onMouseEnter={handleMouseEnter}
    >
      <div className="aspect-video relative bg-gray-100">
        {showIframe ? (
          <iframe
            className="w-full h-full"
            src={url}
            title={displayTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
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
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </>
        )}
        {/* Click overlay - only show when iframe is not loaded */}
        {!showIframe && (
          <div 
            className="absolute inset-0 cursor-pointer bg-transparent hover:bg-black hover:bg-opacity-10 transition-all"
            onClick={handleClick}
            title="Click to view video details"
          />
        )}
      </div>
      <div className="p-4">
        <div 
          className="cursor-pointer"
          onClick={handleClick}
        >
          <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#59ACBE] transition-colors">{displayTitle}</h4>
          {displayCategoryTitle && (
            <p className="text-sm text-gray-500 mb-3">{displayCategoryTitle}</p>
          )}
        </div>
        
        {/* YouTube Link Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleClick}
            className="text-sm text-[#59ACBE] hover:text-[#4a9bb0] font-medium transition-colors"
          >
            View Details →
          </button>
          <button
            onClick={handleYouTubeClick}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors"
            title="Watch on YouTube"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
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
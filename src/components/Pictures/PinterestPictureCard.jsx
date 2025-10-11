import React, { memo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Heart, ExternalLink } from 'lucide-react';

const PinterestPictureCard = ({ 
  id, 
  imageUrl, 
  title, 
  description,
  link,
  isPinterest = true
}) => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-[#E60023]"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#E60023] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.log('📌 Image failed to load:', imageUrl);
            // Try alternative image sources
            const fallbackImages = [
              'https://via.placeholder.com/400x500/E60023/FFFFFF?text=Art+%26+Craft',
              'https://picsum.photos/400/500?random=' + Math.floor(Math.random() * 1000),
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iNDAiIGZpbGw9IiNFNjAwMjMiLz4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNFNjAwMjMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+QXJ0ICYgQ3JhZnQ8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRTYwMDIzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkFjYWRlbXk8L3RleHQ+Cjwvc3ZnPg=='
            ];
            
            // Try the first fallback
            if (!e.target.dataset.fallbackTried) {
              e.target.dataset.fallbackTried = '1';
              e.target.src = fallbackImages[0];
            } else if (e.target.dataset.fallbackTried === '1') {
              e.target.dataset.fallbackTried = '2';
              e.target.src = fallbackImages[1];
            } else {
              // Final fallback
              e.target.src = fallbackImages[2];
              setImageLoaded(true);
            }
          }}
        />
        
        {/* Overlay with Pinterest branding and like button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          {/* Pinterest Icon */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 bg-[#E60023] rounded-full shadow-md">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c6.628 0 12-5.372 12-12S18.628 0 12 0zm1.586 19.414c-.828-.828-.828-2.172 0-3l1.414-1.414c.828-.828 2.172-.828 3 0 .828.828.828 2.172 0 3l-1.414 1.414c-.828.828-2.172.828-3 0z"/>
              </svg>
            </div>
          </div>

          {/* Like Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleLikeClick}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* External Link Icon */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 bg-white rounded-full shadow-md">
              <ExternalLink className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#E60023] transition-colors duration-200 text-sm">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-xs line-clamp-2 mb-3">
            {description}
          </p>
        )}

        {/* Pinterest Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#E60023] rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c6.628 0 12-5.372 12-12S18.628 0 12 0zm1.586 19.414c-.828-.828-.828-2.172 0-3l1.414-1.414c.828-.828 2.172-.828 3 0 .828.828.828 2.172 0 3l-1.414 1.414c-.828.828-2.172.828-3 0z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">Pinterest</span>
          </div>
          
          {/* View on Pinterest indicator */}
          <span className="text-xs text-[#E60023] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {t('common.viewOnPinterest', 'View on Pinterest')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(PinterestPictureCard);

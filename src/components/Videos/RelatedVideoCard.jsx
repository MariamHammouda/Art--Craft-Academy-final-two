import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatViewCount } from '../../services/youtubeApi';

const RelatedVideoCard = ({ video, onVideoClick, isActive = false }) => {
  const { t } = useTranslation();

  if (!video || !video.id || !video.url) {
    return null;
  }

  const displayTitle = video.titleKey ? t(video.titleKey) : video.title;
  const displayCategoryTitle = video.categoryTitleKey ? t(video.categoryTitleKey) : video.categoryTitle;
  
  // Extract video ID for thumbnail
  const videoId = video.url.match(/embed\/([^?]+)/)?.[1];
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;

  return (
    <div
      onClick={() => onVideoClick(video)}
      className={`cursor-pointer group p-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-[#59ACBE]/10 border border-[#59ACBE]/20' 
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-32 aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
          {thumbnailUrl ? (
            <>
              <img
                src={thumbnailUrl}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              {/* Duration badge (if available) */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium transition-colors line-clamp-2 text-sm leading-tight ${
            isActive 
              ? 'text-[#59ACBE]' 
              : 'text-gray-900 group-hover:text-[#59ACBE]'
          }`}>
            {displayTitle}
          </h4>
          
          {displayCategoryTitle && (
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {displayCategoryTitle}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-gray-500">
              {formatViewCount(video.views || Math.floor(Math.random() * 10000))} {t('videos.views')}
            </p>
            {video.publishedAt && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <p className="text-xs text-gray-500">
                  {new Date(video.publishedAt).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
          
          {/* Quality indicator */}
          <div className="flex items-center gap-1 mt-1">
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400">HD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize component for better performance
export default memo(RelatedVideoCard, (prevProps, nextProps) => {
  return (
    prevProps.video?.id === nextProps.video?.id &&
    prevProps.isActive === nextProps.isActive
  );
});

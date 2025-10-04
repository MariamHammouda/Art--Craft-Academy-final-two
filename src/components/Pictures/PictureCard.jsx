import React, { memo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Heart, Eye } from 'lucide-react';

const PictureCard = ({ 
  id, 
  image, 
  titleKey, 
  title, 
  categoryTitleKey, 
  categoryTitle, 
  description,
  likes = 0,
  difficulty = "beginner",
  tags = []
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    navigate(`/pictures/detail/${id}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const displayTitle = titleKey ? t(titleKey) : title || 'Untitled Picture';
  const displayCategoryTitle = categoryTitleKey ? t(categoryTitleKey) : categoryTitle || 'Unknown Category';

  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-[#59ACBE]"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#59ACBE] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={image}
          alt={displayTitle}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'; // Fallback image
            setImageLoaded(true);
          }}
        />
        
        {/* Overlay with like button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleLikeClick}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(difficulty)}`}>
            {t(`common.difficulty.${difficulty}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#59ACBE] group-hover:text-[#FCD11A] transition-colors duration-200">
            {displayCategoryTitle}
          </span>
          <div className="flex items-center gap-1 text-gray-500">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{currentLikes}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#59ACBE] transition-colors duration-200">
          {displayTitle}
        </h3>


        {/* View Button */}
        <button className="w-full px-4 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200 font-medium text-sm">
          {t('common.viewDetails')}
        </button>
      </div>
    </div>
  );
};

export default memo(PictureCard);

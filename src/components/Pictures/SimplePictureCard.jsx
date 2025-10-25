import React, { memo, useState } from "react";
import { useTranslation } from 'react-i18next';

const SimplePictureCard = ({ 
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const displayTitle = titleKey ? t(titleKey) : title || 'Untitled Picture';

  return (
    <div className="group bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#59ACBE]">
      {/* Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-gray-100">
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
      </div>

      {/* Content - Simplified without View Details button */}
      <div className="p-2 sm:p-4">
        {/* Title */}
        <h3 className="font-semibold text-xs sm:text-base text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#59ACBE] transition-colors duration-200">
          {displayTitle}
        </h3>
      </div>
    </div>
  );
};

export default memo(SimplePictureCard);

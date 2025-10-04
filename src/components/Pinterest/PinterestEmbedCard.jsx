import React, { useState } from 'react';
import { getCuratedImages, PINTEREST_BOARDS } from '../../services/pinterestEmbedAPI';
import ImageActionSelector from './ImageActionSelector';

const PinterestEmbedCard = ({ category, categoryName, limit = 3 }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showActionSelector, setShowActionSelector] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  console.log('📌 PinterestEmbedCard loading:', { category, categoryName, limit });
  
  const images = getCuratedImages(category, limit);
  const boardUrl = PINTEREST_BOARDS[category];
  
  console.log('📌 Images loaded:', images?.length || 0, 'images for', category);
  console.log('📌 Board URL:', boardUrl);

  const handleImageError = (imageId) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  const handleImageClick = (image, index) => {
    console.log('🖼️ Image clicked:', image.title, 'Index:', index);
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setShowActionSelector(true);
  };

  const closeActionSelector = () => {
    setShowActionSelector(false);
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="pinterest-embed-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{categoryName}</h3>
              <p className="text-sm text-gray-600">من Pinterest</p>
            </div>
          </div>
          <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            Pinterest
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="p-4">
        <div className={`grid gap-3 ${
          images.length === 1 ? 'grid-cols-1' : 
          images.length === 2 ? 'grid-cols-2' : 
          'grid-cols-3'
        }`}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer relative overflow-hidden rounded-lg bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleImageClick(image, index);
              }}
            >
              <div className="aspect-square">
                {!imageErrors[image.id] ? (
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(image.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl mb-2">📌</div>
                      <p className="text-xs">Pinterest Image</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-2 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium">Click to view</p>
                </div>
              </div>
              
              {/* Pinterest Badge */}
              <div className="absolute top-2 right-2 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                📌
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {boardUrl && (
          <div className="mt-4 text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(boardUrl, '_blank', 'noopener,noreferrer');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium min-h-[44px] touch-manipulation"
            >
              <span className="mr-2">📌</span>
              <span className="text-center">عرض المزيد على Pinterest</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t">
        <p className="text-xs text-gray-500 text-center">
          اضغط على الصور لعرضها • {images.length} صور متاحة
        </p>
      </div>

      {/* Image Action Selector */}
      {showActionSelector && (
        <ImageActionSelector
          image={selectedImage}
          images={images}
          currentIndex={selectedImageIndex}
          category={category}
          onClose={closeActionSelector}
        />
      )}
    </div>
  );
};

export default PinterestEmbedCard;

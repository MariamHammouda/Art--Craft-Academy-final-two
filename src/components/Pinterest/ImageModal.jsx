import React, { useState, useEffect } from 'react';

const ImageModal = ({ isOpen, onClose, image, images = [], currentIndex = 0 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentImageIndex]);

  const currentImage = images[currentImageIndex] || image;

  const goToNext = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsLoading(true);
      setImageError(false);
    }
  };

  const goToPrevious = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsLoading(true);
      setImageError(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openInPinterest = () => {
    if (currentImage?.boardUrl) {
      window.open(currentImage.boardUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center max-w-full max-h-full">
          
          {/* Image Container */}
          <div className="relative mb-4 max-w-full max-h-[calc(100vh-200px)] flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {imageError ? (
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-8 text-white">
                <div className="text-4xl mb-4">📌</div>
                <p className="text-lg mb-2">Image not available</p>
                <p className="text-sm text-gray-300 mb-4">This Pinterest image couldn't be loaded</p>
                <button
                  onClick={openInPinterest}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  View on Pinterest
                </button>
              </div>
            ) : (
              <img
                src={currentImage.imageUrl}
                alt={currentImage.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            )}
          </div>

          {/* Image Info */}
          <div className="bg-black bg-opacity-50 text-white rounded-lg p-4 max-w-2xl text-center">
            <h3 className="text-xl font-bold mb-2">{currentImage.title}</h3>
            {currentImage.description && (
              <p className="text-gray-300 mb-3">{currentImage.description}</p>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentImage.isPinterest && (
                <button
                  onClick={openInPinterest}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <span className="mr-2">📌</span>
                  View on Pinterest
                </button>
              )}
              
              {images.length > 1 && (
                <div className="text-sm text-gray-300">
                  {currentImageIndex + 1} of {images.length}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && images.length <= 10 && (
            <div className="flex gap-2 mt-4 max-w-full overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsLoading(true);
                    setImageError(false);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-white shadow-lg' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#374151"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle" dy=".3em">📌</text></svg>`)}`;
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

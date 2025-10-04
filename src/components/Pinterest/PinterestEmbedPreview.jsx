import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCuratedImages } from '../../services/pinterestEmbedAPI';

const PinterestEmbedPreview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get sample images from different categories
  const origamiImages = getCuratedImages('origami', 2);
  const drawingImages = getCuratedImages('drawing', 2);
  const recyclingImages = getCuratedImages('recycling', 1);
  const beadsImages = getCuratedImages('beads', 1);

  const allImages = [...origamiImages, ...drawingImages, ...recyclingImages, ...beadsImages];

  const handleImageClick = (image) => {
    if (image.boardUrl) {
      window.open(image.boardUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleViewGallery = () => {
    navigate('/pictures');
  };

  return (
    <div className="pinterest-embed-preview bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
          <span className="text-white text-2xl font-bold">P</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎨 معرض Pinterest الإبداعي
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          اكتشف مجموعتنا المتنوعة من الأفكار الفنية والحرفية المستوحاة من Pinterest
        </p>
      </div>

      {/* Images Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {allImages.slice(0, 6).map((image, index) => (
          <div
            key={image.id}
            className="group cursor-pointer relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => handleImageClick(image)}
          >
            <div className="aspect-square">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle" dy=".3em">Pinterest</text></svg>`)}`;
                }}
                loading="lazy"
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600 px-2 py-1 rounded text-xs font-medium">
                  📌 Pinterest
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-white rounded-lg border border-red-100">
          <div className="text-2xl mb-1">🎭</div>
          <p className="text-sm font-medium text-gray-700">Origami</p>
          <p className="text-xs text-gray-500">{origamiImages.length}+ صور</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-red-100">
          <div className="text-2xl mb-1">✏️</div>
          <p className="text-sm font-medium text-gray-700">Drawing</p>
          <p className="text-xs text-gray-500">{drawingImages.length}+ صور</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-red-100">
          <div className="text-2xl mb-1">♻️</div>
          <p className="text-sm font-medium text-gray-700">Recycling</p>
          <p className="text-xs text-gray-500">{recyclingImages.length}+ صور</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-red-100">
          <div className="text-2xl mb-1">💎</div>
          <p className="text-sm font-medium text-gray-700">Beads</p>
          <p className="text-xs text-gray-500">{beadsImages.length}+ صور</p>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="text-center space-y-3">
        <button
          onClick={handleViewGallery}
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
        >
          <span className="mr-2">🖼️</span>
          عرض المعرض الكامل
        </button>
        
        <div className="flex justify-center space-x-4 space-x-reverse">
          <button
            onClick={() => window.open('https://www.pinterest.com/ArtCraftAcademy1/', '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm"
          >
            <span className="mr-2">📌</span>
            تابعنا على Pinterest
          </button>
          
          <button
            onClick={() => navigate('/pictures/category/1')}
            className="inline-flex items-center px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm"
          >
            <span className="mr-2">🎭</span>
            ابدأ بالـ Origami
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-red-200">
        <p className="text-center text-xs text-gray-500">
          جميع الصور من مجموعاتنا على Pinterest • اضغط للزيارة المباشرة
        </p>
      </div>
    </div>
  );
};

export default PinterestEmbedPreview;

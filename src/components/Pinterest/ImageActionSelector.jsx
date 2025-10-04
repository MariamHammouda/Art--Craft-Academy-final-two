import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal';

const ImageActionSelector = ({ image, images, currentIndex, category, onClose }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleViewInSite = () => {
    onClose?.();
    navigate(`/pictures/image/${category}/${image.id}`);
  };

  const handleViewInModal = () => {
    onClose?.();
    setShowModal(true);
  };

  const handleViewInPinterest = () => {
    onClose?.();
    if (image.boardUrl) {
      window.open(image.boardUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!image) return null;

  return (
    <>
      {/* Action Selector Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" text-anchor="middle" dy=".3em">📷</text></svg>`)}`;
                }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{image.title}</h3>
            <p className="text-gray-600 text-sm">اختر طريقة المشاهدة</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            
            {/* View in Site */}
            <button
              onClick={handleViewInSite}
              className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🖼️</span>
                <div className="text-right">
                  <div className="font-semibold">عرض في الموقع</div>
                  <div className="text-sm opacity-90">صفحة تفاصيل كاملة مع معلومات الصورة</div>
                </div>
              </div>
            </button>

            {/* View in Modal */}
            <button
              onClick={handleViewInModal}
              className="w-full flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">👁️</span>
                <div className="text-right">
                  <div className="font-semibold">عرض سريع</div>
                  <div className="text-sm opacity-90">مشاهدة مكبرة مع إمكانية التنقل</div>
                </div>
              </div>
            </button>

            {/* View in Pinterest */}
            {image.isPinterest && (
              <button
                onClick={handleViewInPinterest}
                className="w-full flex items-center justify-center px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📌</span>
                  <div className="text-right">
                    <div className="font-semibold">فتح في Pinterest</div>
                    <div className="text-sm opacity-90">مشاهدة الصورة الأصلية على Pinterest</div>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={showModal}
        onClose={closeModal}
        image={image}
        images={images}
        currentIndex={currentIndex}
      />
    </>
  );
};

export default ImageActionSelector;

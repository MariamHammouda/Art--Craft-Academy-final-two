import React, { useState } from 'react';
import ImageModal from './ImageModal';

const ModalTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const testImage = {
    id: 'test_1',
    title: 'Test Pinterest Image',
    description: 'This is a test image to check if modal works',
    imageUrl: 'https://i.pinimg.com/564x/8b/9a/7c/8b9a7c4e5f6d8a9b2c3e4f5a6b7c8d9e.jpg',
    boardUrl: 'https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/',
    isPinterest: true
  };

  const openModal = () => {
    console.log('🧪 Opening test modal');
    setSelectedImage(testImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('🧪 Closing test modal');
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 m-4">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">🧪 Modal Test Component</h2>
      
      <div className="mb-4">
        <p className="text-yellow-700 mb-2">
          اضغط على الزر لاختبار modal الصور:
        </p>
        
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          اختبار Modal
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-yellow-700 mb-2">Test Image Preview:</h3>
        <div 
          className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          onClick={openModal}
        >
          <img 
            src={testImage.imageUrl}
            alt={testImage.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>
        <p className="text-xs text-yellow-600 mt-1">اضغط على الصورة لفتح modal</p>
      </div>

      <div className="text-sm text-yellow-700">
        <p><strong>Modal Status:</strong> {isModalOpen ? 'مفتوح' : 'مغلق'}</p>
        <p><strong>Selected Image:</strong> {selectedImage ? selectedImage.title : 'لا يوجد'}</p>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
        images={[testImage]}
        currentIndex={0}
      />
    </div>
  );
};

export default ModalTest;

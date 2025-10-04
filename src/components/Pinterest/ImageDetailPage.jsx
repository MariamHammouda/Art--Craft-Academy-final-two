import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCuratedImages, PINTEREST_BOARDS } from '../../services/pinterestEmbedAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const ImageDetailPage = () => {
  const { t } = useTranslation();
  const { category, imageId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImageData = () => {
      try {
        setLoading(true);
        
        // Get all images from the category
        const categoryImages = getCuratedImages(category, 20);
        
        // Find the specific image
        const foundImage = categoryImages.find(img => img.id === imageId);
        
        if (foundImage) {
          setImage(foundImage);
          // Get related images (exclude current image)
          const related = categoryImages.filter(img => img.id !== imageId).slice(0, 6);
          setRelatedImages(related);
        } else {
          console.error('Image not found:', imageId);
        }
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category && imageId) {
      loadImageData();
    }
  }, [category, imageId]);

  const handleRelatedImageClick = (relatedImage) => {
    navigate(`/pictures/image/${category}/${relatedImage.id}`);
  };

  const openInPinterest = () => {
    if (image?.boardUrl) {
      window.open(image.boardUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const shareImage = () => {
    if (navigator.share && image) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الصورة!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل تفاصيل الصورة...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">الصورة غير موجودة</h1>
          <p className="text-gray-600 mb-6">لم نتمكن من العثور على الصورة المطلوبة</p>
          <button
            onClick={() => navigate('/pictures')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            العودة إلى المعرض
          </button>
        </div>
      </div>
    );
  }

  const categoryNames = {
    origami: 'Origami & Paper Crafts',
    drawing: 'Drawing',
    recycling: 'Recycling Art',
    beads: 'Beads & Accessories',
    clay: 'Clay Creations',
    preschool: 'Preschool Crafts',
    perler: 'Perler Beads',
    '3dpen': '3D Pen Fun',
    miniature: 'Miniature Wonders',
    science: 'Science & DIY Experiments',
    tips: 'Tips & Tricks'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Breadcrumbs 
            customBreadcrumbs={[
              { label: t('nav.home'), link: '/' },
              { label: t('nav.pictures'), link: '/pictures' },
              { label: categoryNames[category] || category, link: `/pictures/category/${category}` },
              { label: image.title, link: null }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">صورة غير متاحة</text></svg>`)}`;
                  }}
                />
                
                {/* Pinterest Badge */}
                {image.isPinterest && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center">
                      📌 Pinterest
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {image.isPinterest && (
                <button
                  onClick={openInPinterest}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <span className="mr-2">📌</span>
                  عرض على Pinterest
                </button>
              )}
              
              <button
                onClick={shareImage}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <span className="mr-2">📤</span>
                مشاركة الصورة
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            
            {/* Image Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{image.title}</h1>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">الوصف</h3>
                  <p className="text-gray-600 leading-relaxed">{image.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">الفئة</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {categoryNames[category] || category}
                  </span>
                </div>
                
                {image.isPinterest && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">المصدر</h3>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">P</span>
                      </div>
                      <span className="text-gray-600">Pinterest Board</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">التنقل</h3>
              <div className="space-y-4">
                <button
                  onClick={() => navigate(`/pictures/category/${category}`)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span className="mr-2">←</span>
                  العودة إلى فئة {categoryNames[category]}
                </button>
                
                <button
                  onClick={() => navigate('/pictures')}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <span className="mr-2">🖼️</span>
                  العودة إلى المعرض الرئيسي
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Images */}
        {relatedImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">صور ذات صلة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedImages.map((relatedImage) => (
                <div
                  key={relatedImage.id}
                  onClick={() => handleRelatedImageClick(relatedImage)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group hover:scale-105"
                >
                  <div className="aspect-square relative">
                    <img
                      src={relatedImage.imageUrl}
                      alt={relatedImage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle" dy=".3em">صورة</text></svg>`)}`;
                      }}
                    />
                    
                    {relatedImage.isPinterest && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                          📌
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <h4 className="font-medium text-gray-800 text-sm line-clamp-2">{relatedImage.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDetailPage;

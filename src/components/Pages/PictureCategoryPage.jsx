import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useCategoryPins } from '../../hooks/usePinterestPins';
import { getCuratedImages } from '../../services/pinterestEmbedAPI';
import PinterestEmbedCard from '../Pinterest/PinterestEmbedCard';
import PinterestRealWidget from '../Pinterest/PinterestRealWidget';
import ImageActionSelector from '../Pinterest/ImageActionSelector';

// Import gallery images
import drawingImage from '../../assets/images/picture-gallary-images/drawing.jpg';
import origamiImage from '../../assets/images/picture-gallary-images/orgami.jpg';
import preschoolImage from '../../assets/images/picture-gallary-images/preschool.jpg';
import clayImage from '../../assets/images/picture-gallary-images/clay.jpg';
import beadsAccessoriesImage from '../../assets/images/picture-gallary-images/beads-accessories.jpg';
import recyclingImage from '../../assets/images/picture-gallary-images/recycling.jpg';
import perlerBeadsImage from '../../assets/images/picture-gallary-images/perler-beads.jpg';
import threeDPenImage from '../../assets/images/picture-gallary-images/3D-pen-letters.jpg';
import miniatureWondersImage from '../../assets/images/picture-gallary-images/miniature-wonders.jpg';
import scienceImage from '../../assets/images/picture-gallary-images/science.png';
import tipsTricksImage from '../../assets/images/picture-gallary-images/tips-and-tricks.jpg';

// Import drawing gallery images
import drawingImg1 from '../../assets/images/picture-gallary-images/drawing-images/img1.jpg';
import drawingImg2 from '../../assets/images/picture-gallary-images/drawing-images/img2.jpg';
import drawingImg3 from '../../assets/images/picture-gallary-images/drawing-images/img3.jpg';
import drawingImg4 from '../../assets/images/picture-gallary-images/drawing-images/img4.jpg';
import drawingImg5 from '../../assets/images/picture-gallary-images/drawing-images/img5.jpg';
import drawingImg6 from '../../assets/images/picture-gallary-images/drawing-images/img6.jpg';
import drawingImg7 from '../../assets/images/picture-gallary-images/drawing-images/img7.jpg';
import drawingImg8 from '../../assets/images/picture-gallary-images/drawing-images/img8.jpg';

const PictureCategoryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { pins, loading: pinterestLoading, error: pinterestError } = useCategoryPins(parseInt(categoryId), 20);
  
  // Action selector state for image viewing
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showActionSelector, setShowActionSelector] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Picture categories data (same as in PicturesPage for consistency)
  const pictureCategories = [
    { id: 1, key: 'origamiPaperCrafts', color: 'bg-pink-50', textColor: 'text-pink-800', backgroundImage: origamiImage },
    { id: 2, key: 'drawing', color: 'bg-blue-50', textColor: 'text-[#59ACBE]', backgroundImage: drawingImage },
    { id: 3, key: 'recyclingArt', color: 'bg-green-50', textColor: 'text-green-800', backgroundImage: recyclingImage },
    { id: 4, key: 'beadsAccessories', color: 'bg-purple-50', textColor: 'text-purple-800', backgroundImage: beadsAccessoriesImage },
    { id: 5, key: 'clayCreations', color: 'bg-orange-50', textColor: 'text-orange-800', backgroundImage: clayImage },
    { id: 6, key: 'preschoolCrafts', color: 'bg-yellow-50', textColor: 'text-yellow-800', backgroundImage: preschoolImage },
    { id: 7, key: 'perlerBeads', color: 'bg-indigo-50', textColor: 'text-indigo-800', backgroundImage: perlerBeadsImage },
    { id: 8, key: '3dPenFun', color: 'bg-teal-50', textColor: 'text-teal-800', backgroundImage: threeDPenImage },
    { id: 9, key: 'miniatureWonders', color: 'bg-red-50', textColor: 'text-red-800', backgroundImage: miniatureWondersImage },
    { id: 10, key: 'scienceDiyExperiments', color: 'bg-cyan-50', textColor: 'text-cyan-800', backgroundImage: scienceImage },
    { id: 11, key: 'tipsTricks', color: 'bg-gray-50', textColor: 'text-gray-800', backgroundImage: tipsTricksImage }
  ];

  // Drawing gallery images data
  const drawingGalleryImages = [
    { id: 1, title: 'Drawing Art 1', url: drawingImg1, description: 'Beautiful drawing artwork' },
    { id: 2, title: 'Drawing Art 2', url: drawingImg2, description: 'Creative drawing piece' },
    { id: 3, title: 'Drawing Art 3', url: drawingImg3, description: 'Artistic drawing creation' },
    { id: 4, title: 'Drawing Art 4', url: drawingImg4, description: 'Stunning drawing work' },
    { id: 5, title: 'Drawing Art 5', url: drawingImg5, description: 'Amazing drawing art' },
    { id: 6, title: 'Drawing Art 6', url: drawingImg6, description: 'Wonderful drawing piece' },
    { id: 7, title: 'Drawing Art 7', url: drawingImg7, description: 'Impressive drawing artwork' },
    { id: 8, title: 'Drawing Art 8', url: drawingImg8, description: 'Excellent drawing creation' }
  ];

  // Find the current category
  const currentCategory = pictureCategories.find(cat => cat.id === parseInt(categoryId));

  // If category not found, show error
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('common.categoryNotFound')}</h1>
          <button
            onClick={() => navigate("/pictures")}
            className="px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors duration-200"
          >
            {t('pictures.backToPictures')}
          </button>
        </div>
      </div>
    );
  }

  // Category to Pinterest board mapping
  const categoryToPinterestBoard = {
    1: 'origami', // Origami & Paper Crafts
    2: 'drawing', // Drawing
    3: 'recycling', // Recycling Art
    4: 'beads', // Beads & Accessories
    5: 'clay', // Clay Creations
    6: 'preschool', // Preschool Crafts
    7: 'perler', // Perler Beads
    8: '3dpen', // 3D Pen Fun
    9: 'miniature', // Miniature Wonders
    10: 'science', // Science & DIY Experiments
    11: 'tips' // Tips & Tricks
  };

  // Pinterest board URLs mapping
  const categoryToPinterestUrl = {
    1: 'https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/',
    2: 'https://www.pinterest.com/ArtCraftAcademy1/drawing/',
    3: 'https://www.pinterest.com/ArtCraftAcademy1/recycling-art/',
    4: 'https://www.pinterest.com/ArtCraftAcademy1/beads-accessories/',
    5: 'https://www.pinterest.com/ArtCraftAcademy1/clay-creations/',
    6: 'https://www.pinterest.com/ArtCraftAcademy1/preschool-crafts/',
    7: 'https://www.pinterest.com/ArtCraftAcademy1/perler-beads/',
    8: 'https://www.pinterest.com/ArtCraftAcademy1/3d-pen-fun/',
    9: 'https://www.pinterest.com/ArtCraftAcademy1/miniature-wonders/',
    10: 'https://www.pinterest.com/ArtCraftAcademy1/science-diy-experiments/',
    11: 'https://www.pinterest.com/ArtCraftAcademy1/tips-tricks/'
  };

  // Get images based on category - Pinterest first, then fallback
  const getImagesForCategory = () => {
    // If we have Pinterest pins from API, use them
    if (pins && pins.length > 0) {
      return pins.map(pin => ({
        id: pin.id,
        title: pin.title || `${t(`pictures.categories.${currentCategory.key}`)} Pin`,
        url: pin.imageUrl || pin.thumbnailUrl,
        description: pin.description || pin.note || `Beautiful ${t(`pictures.categories.${currentCategory.key}`).toLowerCase()} from Pinterest`,
        isPinterest: true,
        link: pin.link,
        altText: pin.altText
      }));
    }
    
    // Try Pinterest Embed images (CORS-free)
    const pinterestBoard = categoryToPinterestBoard[currentCategory.id];
    if (pinterestBoard) {
      const embedImages = getCuratedImages(pinterestBoard, 12);
      if (embedImages && embedImages.length > 0) {
        return embedImages;
      }
    }
    
    // Fallback for drawing category with local images
    if (currentCategory.id === 2) {
      return drawingGalleryImages.map(img => ({ ...img, isPinterest: false }));
    }
    
    // Final fallback: placeholder images
    return Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: `${t(`pictures.categories.${currentCategory.key}`)} ${index + 1}`,
      url: `data:image/svg+xml;base64,${btoa(`<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="45%" font-family="Arial, sans-serif" font-size="16" fill="#64748b" text-anchor="middle" dy=".3em">${t(`pictures.categories.${currentCategory.key}`)}</text><text x="50%" y="55%" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle" dy=".3em">#${index + 1}</text></svg>`)}`,
      description: `Beautiful example of ${t(`pictures.categories.${currentCategory.key}`).toLowerCase()}`,
      isPinterest: false
    }));
  };

  const galleryImages = getImagesForCategory();

  // Handle image click for action selector
  const handleImageClick = (image, index) => {
    console.log('🖼️ Category image clicked:', image.title, 'Index:', index);
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setShowActionSelector(true);
  };

  const closeActionSelector = () => {
    setShowActionSelector(false);
    setSelectedImage(null);
  };

  return (
    <div className={`min-h-screen ${currentCategory.color}`}>
      {/* Header */}
      <div>
        {/* Image Section */}
        {currentCategory.backgroundImage && (
          <div className="h-[50rem] w-full overflow-hidden relative">
            <img
              src={currentCategory.backgroundImage}
              alt={t(`pictures.categories.${currentCategory.key}`)}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
          </div>
        )}
        
        {/* Text Content Below Image */}
        <div className={`${currentCategory.backgroundImage ? 'bg-white' : currentCategory.color} shadow-sm`}>
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/pictures")}
                className="text-[#59ACBE] hover:text-[#FCD11A] font-medium transition-colors duration-200"
              >
                ← {t('pictures.backToPictures')}
              </button>
            </div>
            
            <div className="text-center">
              <h1 className={`text-4xl font-bold ${currentCategory.textColor} mb-4`}>
                {t(`pictures.categories.${currentCategory.key}`)}
              </h1>
              <p className="text-gray-600 text-lg">
                {t(`pictures.descriptions.${currentCategory.key}`)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          customBreadcrumbs={[
            { label: t('nav.home'), link: '/' },
            { label: t('nav.pictures'), link: '/pictures' },
            { label: t(`pictures.categories.${currentCategory.key}`), link: null }
          ]}
        />
        {/* Loading State */}
        {pinterestLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59ACBE]"></div>
              <p className="text-gray-600">Loading Pinterest images...</p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleImageClick(image, index);
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105 transform"
            >
              {/* Pinterest Badge */}
              {image.isPinterest && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    📌 Pinterest
                  </div>
                </div>
              )}
              
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={image.url}
                  alt={image.altText || image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to a solid color placeholder if Pinterest image fails to load
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                  }}
                />
                
                {/* Hover overlay for all images */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-3 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium">Click to view</p>
                  </div>
                </div>
              </div>
              
              {/* Image Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{image.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{image.description}</p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  {image.isPinterest ? 'Click to view • Pinterest image' : 'Click to view'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pinterest Integration Status */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            {pinterestError ? (
              <>
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Pinterest Connection Issue</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We're having trouble loading Pinterest images for this category. You're seeing fallback images instead.
                </p>
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded mb-6">
                  Error: {pinterestError}
                </div>
              </>
            ) : pins && pins.length > 0 ? (
              <>
                <div className="text-6xl mb-4">📌</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Pinterest Gallery Active!
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  You're viewing {pins.length} beautiful {t(`pictures.categories.${currentCategory.key}`).toLowerCase()} images 
                  directly from your Pinterest boards. Click any image to view it on Pinterest.
                </p>
              </>
            ) : currentCategory.id === 2 ? (
              <>
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Amazing Drawing Gallery!
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Explore our beautiful collection of drawing artworks. Each piece showcases creativity, skill, and artistic expression.
                </p>
              </>
            ) : categoryToPinterestBoard[currentCategory.id] ? (
              <>
                <div className="text-6xl mb-4">📌</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Pinterest Gallery Ready!
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  You're viewing curated Pinterest-style images for {t(`pictures.categories.${currentCategory.key}`).toLowerCase()}. 
                  These images are displayed using Pinterest's embed system to avoid connection issues.
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t(`pictures.categories.${currentCategory.key}`)} Gallery
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We're working on connecting to your Pinterest boards for this category. 
                  The images above are placeholders showing what the gallery will look like.
                </p>
              </>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => navigate("/pictures")}
                className="px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors duration-200"
              >
                {t('pictures.backToPictures')}
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 border-2 border-[#59ACBE] text-[#59ACBE] rounded-lg hover:bg-[#59ACBE] hover:text-white transition-colors duration-200"
              >
                {t('common.backToHome')}
              </button>
            </div>
          </div>
        </div>

        {/* Pinterest Real Widget Section */}
        {categoryToPinterestUrl[currentCategory.id] && (
          <div className="mt-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  📌 Pinterest Board الحقيقي
                </h2>
                <p className="text-gray-600">
                  شاهد المزيد من الأفكار الإبداعية من Pinterest board الخاص بنا
                </p>
              </div>
              
              <PinterestRealWidget
                boardUrl={categoryToPinterestUrl[currentCategory.id]}
                title={t(`pictures.categories.${currentCategory.key}`)}
                width={600}
                height={400}
                cols={3}
              />
            </div>
          </div>
        )}

        {/* Pinterest Embed Card Section (Fallback) */}
        {categoryToPinterestBoard[currentCategory.id] && (
          <div className="mt-12">
            <div className="max-w-3xl mx-auto">
              <PinterestEmbedCard
                category={categoryToPinterestBoard[currentCategory.id]}
                categoryName={t(`pictures.categories.${currentCategory.key}`)}
                limit={6}
              />
            </div>
          </div>
        )}

      </div>

      {/* Image Action Selector */}
      {showActionSelector && (
        <ImageActionSelector
          image={selectedImage}
          images={galleryImages}
          currentIndex={selectedImageIndex}
          category={categoryToPinterestBoard[currentCategory.id] || currentCategory.id}
          onClose={closeActionSelector}
        />
      )}
    </div>
  );
};

export default PictureCategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { picturesData } from '../../mockData/picturesData.js';
import { ArrowLeft, Heart, Share2, Tag } from 'lucide-react';

const PictureDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [picture, setPicture] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [relatedPictures, setRelatedPictures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the picture by ID
    const foundPicture = picturesData.find(p => p.id === parseInt(id));
    
    if (foundPicture) {
      setPicture(foundPicture);
      setCurrentLikes(foundPicture.likes);
      
      // Find related pictures from the same category
      const related = picturesData
        .filter(p => p.categoryId === foundPicture.categoryId && p.id !== foundPicture.id)
        .slice(0, 4);
      setRelatedPictures(related);
    }
    
    setLoading(false);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: picture.title,
          text: picture.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#59ACBE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!picture) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Picture Not Found</h2>
          <p className="text-gray-600 mb-6">The picture you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/pictures')}
            className="px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200"
          >
            {t('pictures.backToPictures')}
          </button>
        </div>
      </div>
    );
  }

  const displayTitle = picture.titleKey ? t(picture.titleKey) : picture.title;
  const displayCategoryTitle = picture.categoryTitleKey ? t(picture.categoryTitleKey) : picture.categoryTitle;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/pictures')}
            className="flex items-center gap-2 text-[#59ACBE] hover:text-[#FCD11A] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('pictures.backToPictures')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Picture Display */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img
                src={picture.image}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleLike}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Difficulty Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(picture.difficulty)}`}>
                  {t(`common.difficulty.${picture.difficulty}`)}
                </span>
              </div>
            </div>
          </div>

          {/* Picture Info */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-[#59ACBE] bg-blue-50 px-3 py-1 rounded-full">
                  {displayCategoryTitle}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {displayTitle}
              </h1>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{currentLikes} {t('videos.likes')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>{picture.tags?.length || 0} tags</span>
              </div>
            </div>

            {/* Description */}
            {picture.description && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('videos.description')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {picture.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {picture.tags && picture.tags.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {picture.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#59ACBE] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleLike}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#59ACBE] hover:text-white'
                }`}
              >
                {isLiked ? 'Liked' : t('videos.like')}
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 py-3 px-6 bg-[#59ACBE] text-white rounded-lg font-medium hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200"
              >
                {t('videos.share')}
              </button>
            </div>
          </div>
        </div>

        {/* Related Pictures */}
        {relatedPictures.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Pictures
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPictures.map((relatedPicture) => (
                <div
                  key={relatedPicture.id}
                  onClick={() => navigate(`/pictures/detail/${relatedPicture.id}`)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={relatedPicture.image}
                      alt={relatedPicture.titleKey ? t(relatedPicture.titleKey) : relatedPicture.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {relatedPicture.titleKey ? t(relatedPicture.titleKey) : relatedPicture.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-[#59ACBE]">
                        {relatedPicture.categoryTitleKey ? t(relatedPicture.categoryTitleKey) : relatedPicture.categoryTitle}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart className="w-4 h-4" />
                        <span>{relatedPicture.likes}</span>
                      </div>
                    </div>
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

export default PictureDetailPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ChevronRight, Video, Image } from 'lucide-react';
import VideoCard from "../Videos/VideoCard.jsx";
import { categoriesData } from "../../mockData/categoriesData.js";
import { videosData } from "../../mockData/videosData.js";
import { useVideosByCategory } from "../../hooks/useYouTubeVideos.js";
import perlerBeadsCategoryImage from "../../assets/images/category-page-images/perler-beads.jpg";
import recyclingArtCategoryImage from "../../assets/images/category-page-images/recycling-art.jpg";

const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id: idParam } = useParams();
  const { categoryTitle: stateTitle, videos: stateVideos } = location.state || {};
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' or 'pictures'
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [idParam]);

  // Try to get data from sessionStorage if React Router state is not available
  const sessionData = sessionStorage.getItem('categoryData');
  const parsedSessionData = sessionData ? JSON.parse(sessionData) : null;
  
  const finalTitle = stateTitle || parsedSessionData?.categoryTitle;
  const finalVideos = stateVideos || parsedSessionData?.videos;

  console.log('📂 CategoryPage loaded:', { 
    idParam, 
    stateTitle, 
    sessionTitle: parsedSessionData?.categoryTitle,
    finalTitle,
    stateVideosCount: stateVideos?.length || 0,
    sessionVideosCount: parsedSessionData?.videos?.length || 0,
    finalVideosCount: finalVideos?.length || 0
  });

  const resolvedCategory = (() => {
    // First try to find by translated title (finalTitle is now the translated title)
    if (finalTitle) {
      return categoriesData.find(c => t(c.titleKey) === finalTitle);
    }
    // Fallback to finding by ID
    const idNum = Number(idParam);
    return categoriesData.find(c => c.id === idNum);
  })();

  // Use YouTube API to fetch videos for this category
  const { videos: apiVideos, loading: videosLoading, error: videosError } = useVideosByCategory(
    resolvedCategory?.id || 1, 
    50
  );

  const resolvedVideos = finalVideos && finalVideos.length
    ? finalVideos
    : apiVideos.length > 0 
    ? apiVideos
    : (() => {
        if (!resolvedCategory) return [];
        return videosData.filter(v => v.categoryId === resolvedCategory.id);
      })();

  // Find category data for styling
  const categoryData = resolvedCategory;

  // Get the same colors used in CategoryCard component
  const getCardColors = (categoryId) => {
    const cardColors = {
      1: { bg: '#FFF4B3', circle: '#FFD93D' },
      2: { bg: '#B3E5FF', circle: '#63C8FF' },
      3: { bg: '#B3FFB3', circle: '#55e655ff' },
      4: { bg: '#FFB3E6', circle: '#e14e98ff' },
      5: { bg: '#FFF4B3', circle: '#FFD93D'  },
      6: { bg: '#B3E5FF', circle: '#63C8FF' },
      7: { bg: '#B3FFB3', circle: '#55e655ff' },
      8: { bg: '#B3E5FF', circle: '#63C8FF' },
      9: { bg: '#FFB3E6', circle: '#F0308F' },
      10: { bg: '#D9B3FF', circle: '#8B5CF6' }
    };
    return cardColors[categoryId] || { bg: '#B3E5FF', circle: '#59ACBE' };
  };

  const cardColors = getCardColors(categoryData?.id);

  // Pagination logic
  const videosPerPage = isMobile ? 8 : 12;
  const totalVideos = resolvedVideos.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = [...resolvedVideos]
    .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
    .slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to videos section
    const videosSection = document.getElementById('videos-section');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('common.categoryNotFound')}</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors"
          >
            {t('common.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#59ACBE] transition-colors"
            >
              {t('nav.home')}
            </button>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-gray-800 font-medium">{t(categoryData.titleKey)}</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-gray-500">{activeTab === 'videos' ? t('nav.videos') : t('nav.pictures')}</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
          {/* Category Title with Icon */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: cardColors.circle }}
              >
                <img src={categoryData.icon} alt={t(categoryData.titleKey)} className="w-8 h-8 sm:w-14 sm:h-14" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                {t(categoryData.titleKey)}
              </h1>
            </div>
          </div>

          {/* Image and Description Section */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8 items-start mb-6 sm:mb-8">
            {/* Category Image - Shows first on mobile */}
            <div className="w-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={
                    categoryData.id === 7 ? perlerBeadsCategoryImage :
                    categoryData.id === 3 ? recyclingArtCategoryImage :
                    categoryData.bannerImage
                  } 
                  alt={t(categoryData.titleKey)}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Description - Shows second on mobile, below image */}
            <div className="w-full">
              <div 
                className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg h-full flex flex-col justify-center"
                style={{ 
                  backgroundColor: cardColors.bg
                }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {t('videos.description')}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  {t(categoryData.descriptionKey)}
                </p>
              </div>
            </div>
          </div>

          {/* Videos/Pictures Tabs */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => {
                setActiveTab('videos');
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md ${
                activeTab === 'videos'
                  ? 'bg-[#59ACBE] text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('nav.videos')}
            </button>
            <button
              onClick={() => {
                setActiveTab('pictures');
                navigate(`/pictures/${categoryData.id}`);
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md ${
                activeTab === 'pictures'
                  ? 'bg-[#59ACBE] text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Image className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('nav.pictures')}
            </button>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div id="videos-section" className="bg-white rounded-3xl shadow-lg mx-3 sm:mx-6 lg:mx-auto max-w-7xl p-4 sm:p-8 mb-8">
        {videosLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59ACBE]"></div>
          </div>
        ) : videosError ? (
          <div className="text-center py-12 bg-red-50 rounded-2xl">
            <p className="text-red-600 mb-2 text-sm sm:text-base">Error loading videos: {videosError}</p>
            <p className="text-gray-600 text-xs sm:text-sm">Showing fallback content...</p>
          </div>
        ) : null}
        
        {/* Videos Count Info */}
        {totalVideos > 0 && (
          <div className="mb-6 text-center bg-gray-50 rounded-xl p-3 sm:p-4">
            <p className="text-gray-700 text-sm sm:text-base font-medium">
              videos showing {startIndex + 1}-{Math.min(endIndex, totalVideos)} videos of {totalVideos} videos·videos
            </p>
          </div>
        )}
        
        {/* 2-column grid on mobile, 3-4 columns on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {currentVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              url={video.url}
              titleKey={video.titleKey}
              categoryTitleKey={video.categoryTitleKey}
              title={video.title}
              categoryTitle={video.categoryTitle}
            />
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all shadow-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#59ACBE] text-white hover:bg-[#74BFD0] hover:shadow-lg'
              }`}
            >
              ← {isMobile ? '' : t('common.previous')}
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1 sm:gap-2">
              {Array.from({ length: Math.min(totalPages, isMobile ? 3 : 5) }, (_, i) => {
                let page;
                if (totalPages <= (isMobile ? 3 : 5)) {
                  page = i + 1;
                } else if (currentPage <= (isMobile ? 2 : 3)) {
                  page = i + 1;
                } else if (currentPage >= totalPages - (isMobile ? 1 : 2)) {
                  page = totalPages - (isMobile ? 2 : 4) + i;
                } else {
                  page = currentPage - (isMobile ? 1 : 2) + i;
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md ${
                      currentPage === page
                        ? 'bg-[#59ACBE] text-white scale-110'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all shadow-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#59ACBE] text-white hover:bg-[#74BFD0] hover:shadow-lg'
              }`}
            >
              {isMobile ? '' : t('common.next')} →
            </button>
          </div>
        )}
        
        {resolvedVideos.length === 0 && !videosLoading && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-600 text-base sm:text-lg">{t('videos.noVideosFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
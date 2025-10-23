import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaVideo, FaImages, FaHome } from "react-icons/fa";
import VideoCard from "../Videos/VideoCard.jsx";
import { categoriesData } from "../../mockData/categoriesData.js";
import { videosData } from "../../mockData/videosData.js";
import { useVideosByCategory } from "../../hooks/useYouTubeVideos.js";
import PinterestRealWidget from "../Pinterest/PinterestRealWidget.jsx";
import perlerBeadsCategoryImage from "../../assets/images/category-page-images/perler-beads.jpg";
import recyclingArtCategoryImage from "../../assets/images/category-page-images/recycling-art.jpg";

const CategoryPageNew = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id: idParam, type } = useParams(); // type can be 'videos' or 'pictures'
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(type || 'videos');
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Update active tab when URL changes
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);
  
  // Reset pagination when category or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [idParam, activeTab]);

  // Find category data
  const categoryId = Number(idParam);
  const categoryData = categoriesData.find(c => c.id === categoryId);

  // Fetch videos from YouTube API
  const { videos: apiVideos, loading: videosLoading, error: videosError } = useVideosByCategory(
    categoryId,
    50
  );

  // Map categoryId to Pinterest board URL (same as old project)
  const getPinterestBoardUrl = (cid) => {
    const map = {
      1: 'https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/',
      2: 'https://www.pinterest.com/ArtCraftAcademy1/drawing/',
      3: 'https://www.pinterest.com/ArtCraftAcademy1/recycling-art/',
      4: 'https://www.pinterest.com/ArtCraftAcademy1/beads-accessories/',
      5: 'https://www.pinterest.com/ArtCraftAcademy1/clay-creations/',
      6: 'https://www.pinterest.com/ArtCraftAcademy1/preschool-crafts/',
      7: 'https://www.pinterest.com/ArtCraftAcademy1/perler-beads/',
      8: 'https://www.pinterest.com/ArtCraftAcademy1/3d-pen-fun/',
      9: 'https://www.pinterest.com/ArtCraftAcademy1/miniature-wonders/',
      10: 'https://www.pinterest.com/ArtCraftAcademy1/science-diy-experiments/'
    };
    return map[cid];
  };

  const resolvedVideos = apiVideos.length > 0 
    ? apiVideos
    : videosData.filter(v => v.categoryId === categoryId);

  // Get category colors
  const getCardColors = (categoryId) => {
    const cardColors = {
      1: { bg: '#FFF4B3', circle: '#FFD93D', accent: '#FFD93D' },
      2: { bg: '#B3E5FF', circle: '#63C8FF', accent: '#63C8FF' },
      3: { bg: '#B3FFB3', circle: '#55e655ff', accent: '#55e655ff' },
      4: { bg: '#FFB3E6', circle: '#e14e98ff', accent: '#e14e98ff' },
      5: { bg: '#FFF4B3', circle: '#FFD93D', accent: '#FFD93D' },
      6: { bg: '#B3E5FF', circle: '#63C8FF', accent: '#63C8FF' },
      7: { bg: '#B3FFB3', circle: '#55e655ff', accent: '#55e655ff' },
      8: { bg: '#B3E5FF', circle: '#63C8FF', accent: '#63C8FF' },
      9: { bg: '#FFB3E6', circle: '#F0308F', accent: '#F0308F' },
      10: { bg: '#D9B3FF', circle: '#8B5CF6', accent: '#8B5CF6' }
    };
    return cardColors[categoryId] || { bg: '#B3E5FF', circle: '#59ACBE', accent: '#59ACBE' };
  };

  const cardColors = getCardColors(categoryId);

  // Pagination
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/category/${categoryId}/${tab}`);
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#74BFD0] to-[#E8A5C4]">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('common.categoryNotFound')}</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-[#74BFD0] to-[#E8A5C4] text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold"
          >
            {t('common.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74BFD0]/20 to-[#E8A5C4]/20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-[#74BFD0] hover:text-[#59ACBE] transition-colors font-medium"
            >
              <FaHome className="w-4 h-4" />
              {t('nav.home')}
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">{t(categoryData.titleKey)}</span>
            {activeTab && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800 font-semibold capitalize">{activeTab}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category Title and Icon */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: cardColors.circle }}
            >
              <img src={categoryData.icon} alt={t(categoryData.titleKey)} className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
            {t(categoryData.titleKey)}
          </h1>
        </div>

        {/* Category Image and Description Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
          {/* Category Image - Shows first on mobile (order-1), first on desktop (lg:order-1) */}
          <div className="order-1 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <img 
                src={
                  categoryData.id === 7 ? perlerBeadsCategoryImage :
                  categoryData.id === 3 ? recyclingArtCategoryImage :
                  categoryData.bannerImage
                } 
                alt={t(categoryData.titleKey)}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Description - Shows second on mobile (order-2), second on desktop (lg:order-2) */}
          <div className="order-2 lg:order-2">
            <div 
              className="p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-white/50 backdrop-blur-sm"
              style={{ 
                backgroundColor: `${cardColors.bg}dd`
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {t('videos.description')}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {t(categoryData.descriptionKey)}
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs (Videos / Pictures) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl shadow-xl p-2 gap-2">
            <button
              onClick={() => handleTabChange('videos')}
              className={`flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-[#74BFD0] to-[#59ACBE] text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t('nav.videos')}</span>
            </button>
            <button
              onClick={() => handleTabChange('pictures')}
              className={`flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                activeTab === 'pictures'
                  ? 'bg-gradient-to-r from-[#E8A5C4] to-[#F0308F] text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaImages className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t('nav.pictures')}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
          {activeTab === 'videos' ? (
            <>
              {/* Videos Section */}
              {videosLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#74BFD0]"></div>
                </div>
              ) : videosError ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4 text-lg">Error loading videos: {videosError}</p>
                  <p className="text-gray-600">Showing fallback content...</p>
                </div>
              ) : null}
              
              {/* Videos Count */}
              {totalVideos > 0 && (
                <div className="mb-6 text-center">
                  <p className="text-gray-600 text-lg">
                    {t('videos.showing')} {startIndex + 1}-{Math.min(endIndex, totalVideos)} {t('videos.of')} {totalVideos} {t('videos.videos')}
                  </p>
                </div>
              )}
              
              {/* Videos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    url={video.url}
                    titleKey={video.titleKey}
                    categoryTitleKey={video.categoryTitleKey}
                    title={video.title}
                    categoryTitle={video.categoryTitle}
                    isMobile={isMobile}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#74BFD0] to-[#59ACBE] text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    ← {t('common.previous')}
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-[#74BFD0] to-[#59ACBE] text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#74BFD0] to-[#59ACBE] text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {t('common.next')} →
                  </button>
                </div>
              )}
              
              {resolvedVideos.length === 0 && !videosLoading && (
                <div className="text-center py-20">
                  <FaVideo className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600 text-xl">{t('videos.noVideosFound')}</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Pictures Section - Real Pinterest widget (same behavior as old project) */}
              <div className="py-4">
                {getPinterestBoardUrl(categoryId) ? (
                  <div className="flex justify-center">
                    <PinterestRealWidget
                      key={`board-${categoryId}`}
                      boardUrl={getPinterestBoardUrl(categoryId)}
                      title={t(categoryData.titleKey)}
                      width={800}
                      height={800}
                      cols={4}
                    />
                  </div>





                ) : (
                  <div className="text-center py-20">
                    <FaImages className="w-20 h-20 mx-auto mb-6 text-[#E8A5C4]" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {t('pictures.noPicturesFound') || 'No Pictures Found'}
                    </h3>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                      {t('pictures.noPicturesDescription') || 'There are no pictures available for this category at the moment.'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageNew;

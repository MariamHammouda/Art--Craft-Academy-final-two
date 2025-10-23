import React, { useState, useMemo, useCallback, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import VideoCard from "../Videos/VideoCard.jsx";
import { videosData } from "../../mockData/videosData.js";
import { categoriesData } from "../../mockData/categoriesData.js";
import { useLatestVideos } from "../../hooks/useYouTubeVideos.js";

const VideosPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videosPerPage] = useState(12); // Show 12 videos per page
  const [currentPage, setCurrentPage] = useState(1);
  const filterScrollRef = useRef(null);

  // Fetch videos from YouTube API with caching
  const { videos: apiVideos, loading, error } = useLatestVideos(100);
  
  // Memoized video selection - use API videos if available, otherwise fallback to mock data
  const videosToUse = useMemo(() => {
    console.log('🎬 VideosPage: API videos count:', apiVideos.length);
    console.log('🎬 VideosPage: Using', apiVideos.length > 0 ? 'API videos' : 'mock data');
    return apiVideos.length > 0 ? apiVideos : videosData;
  }, [apiVideos]);

  // Group videos by category
  const videosByCategory = useMemo(() => {
    const grouped = {};
    categoriesData.forEach(category => {
      grouped[category.id] = videosToUse.filter(video => video.categoryId === category.id);
    });
    return grouped;
  }, [videosToUse]);

  // Filter videos by selected category
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'all') {
      return videosToUse;
    }
    return videosToUse.filter(video => video.categoryId === parseInt(selectedCategory));
  }, [videosToUse, selectedCategory]);

  // Paginated videos
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    return filteredVideos.slice(startIndex, endIndex);
  }, [filteredVideos, currentPage, videosPerPage]);

  // Total pages
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Load more videos (for mobile infinite scroll style)
  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  if (loading && videosToUse.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-transparent">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/")}
                className="text-[#59ACBE] hover:text-[#FCD11A] font-medium"
              >
                ← {t('common.backToHome')}
              </button>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('videos.allVideos')}</h1>
              <p className="text-gray-600 text-lg">{t('videos.browseAllVideos')}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm animate-pulse">
                <div className="aspect-video bg-gray-300 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <button
              onClick={() => navigate("/")}
              className="text-[#59ACBE] hover:text-[#FCD11A] font-medium text-sm sm:text-base touch-manipulation"
            >
              ← {t('common.backToHome')}
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">{t('videos.allVideos')}</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">{t('videos.browseAllVideos')}</p>
          </div>
        </div>
      </div>

      {/* Category Filter - Horizontal Scrollable */}
      <div className="bg-white/50 backdrop-blur-sm sticky top-16 sm:top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto py-3 sm:py-4">
          <div className="relative">
            {/* Gradient overlays for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none lg:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none lg:hidden" />
            
            <div 
              ref={filterScrollRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-3 sm:px-6 scroll-smooth lg:flex-wrap lg:justify-center"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <button
                onClick={() => handleCategoryChange('all')}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 touch-manipulation ${
                  selectedCategory === 'all'
                    ? 'bg-[#59ACBE] text-white shadow-md ring-2 ring-[#59ACBE] ring-offset-2'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                }`}
              >
                {t('categories.all')}
              </button>
              {categoriesData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id.toString())}
                  className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 touch-manipulation ${
                    selectedCategory === category.id.toString()
                      ? 'bg-[#59ACBE] text-white shadow-md ring-2 ring-[#59ACBE] ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                  }`}
                >
                  {t(category.titleKey)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
        {error && (
          <div className="text-center py-6 sm:py-8 mb-6 sm:mb-8 bg-red-50 rounded-lg">
            <p className="text-red-600 mb-2 text-sm sm:text-base">Error loading videos: {error}</p>
            <p className="text-gray-600 text-xs sm:text-sm">Showing fallback content...</p>
          </div>
        )}

        {/* Show all videos when "All" is selected */}
        {selectedCategory === 'all' ? (
          <div className="space-y-8 sm:space-y-12">
            {categoriesData.map((category) => {
              const categoryVideos = videosByCategory[category.id] || [];
              if (categoryVideos.length === 0) return null;
              
              return (
                <div key={category.id} className="space-y-4 sm:space-y-6">
                  {/* Category Card */}
                  <div className="bg-gradient-to-br from-[#74BFD0] to-[#59ACBE] rounded-2xl p-4 sm:p-6 shadow-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {t(category.titleKey)}
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base">
                          {categoryVideos.length} {t('videos.availableVideos')}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCategoryChange(category.id.toString())}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-[#59ACBE] rounded-xl font-semibold hover:bg-[#FCD11A] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
                      >
                        {t('common.explore')}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Category Videos Grid - 2 columns on mobile */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {categoryVideos.slice(0, 4).map((video) => (
                      <VideoCard
                        key={video.id}
                        id={video.id}
                        url={video.url || ''}
                        titleKey={video.titleKey}
                        categoryTitleKey={video.categoryTitleKey}
                        title={video.title || 'Untitled Video'}
                        categoryTitle={video.categoryTitle}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Single Category View */}
            {filteredVideos.length > 0 ? (
              <>
                {/* Videos Count */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t('videos.showingResults', { 
                      start: (currentPage - 1) * videosPerPage + 1,
                      end: Math.min(currentPage * videosPerPage, filteredVideos.length),
                      total: filteredVideos.length 
                    })}
                  </p>
                </div>

                {/* Videos Grid - 2 columns on mobile */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {paginatedVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      url={video.url || ''}
                      titleKey={video.titleKey}
                      categoryTitleKey={video.categoryTitleKey}
                      title={video.title || 'Untitled Video'}
                      categoryTitle={video.categoryTitle}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-500 text-base sm:text-lg mb-2">{t('videos.noVideosFound')}</p>
                <p className="text-gray-400 text-sm sm:text-base">{t('videos.tryDifferentCategory')}</p>
              </div>
            )}
          </div>
        )}

        {/* Load More Button - Only show for filtered views */}
        {selectedCategory !== 'all' && currentPage < totalPages && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#59ACBE] text-white text-base sm:text-lg font-semibold rounded-xl hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation w-full sm:w-auto"
            >
              <Play className="w-5 h-5" />
              {t('videos.loadMore')} 
              <span className="ml-1 text-sm opacity-90">
                ({filteredVideos.length - (currentPage * videosPerPage)} {t('videos.remaining')})
              </span>
            </button>
          </div>
        )}

        {/* Desktop Pagination - Only show for filtered views */}
        {selectedCategory !== 'all' && (
          <div className="hidden md:flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t('common.previous')}
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? 'bg-[#59ACBE] text-white shadow-md'
                        : 'text-gray-600 bg-white border hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 3 ||
                page === currentPage + 3
              ) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t('common.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosPage;

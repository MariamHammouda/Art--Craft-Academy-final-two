import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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

  // Fetch videos from YouTube API with caching
  const { videos: apiVideos, loading, error } = useLatestVideos(100);
  
  // Memoized video selection - use API videos if available, otherwise fallback to mock data
  const videosToUse = useMemo(() => {
    console.log('🎬 VideosPage: API videos count:', apiVideos.length);
    console.log('🎬 VideosPage: Using', apiVideos.length > 0 ? 'API videos' : 'mock data');
    return apiVideos.length > 0 ? apiVideos : videosData;
  }, [apiVideos]);

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

      {/* Category Filter */}
      <div className="bg-transparent">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#59ACBE] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('categories.all')}
            </button>
            {categoriesData.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id.toString()
                    ? 'bg-[#59ACBE] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(category.titleKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="text-center py-8 mb-8">
            <p className="text-red-600 mb-2">Error loading videos: {error}</p>
            <p className="text-gray-600">Showing fallback content...</p>
          </div>
        )}

        {/* Videos Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t('videos.showingResults', { 
              start: (currentPage - 1) * videosPerPage + 1,
              end: Math.min(currentPage * videosPerPage, filteredVideos.length),
              total: filteredVideos.length 
            })}
          </p>
        </div>

        {/* Videos Grid */}
        {paginatedVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">{t('videos.noVideosFound')}</p>
            <p className="text-gray-400">{t('videos.tryDifferentCategory')}</p>
          </div>
        )}

        {/* Mobile Load More Button */}
        <div className="md:hidden text-center mt-8">
          {currentPage < totalPages && (
            <button
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors duration-200 font-medium min-h-[44px] touch-manipulation"
            >
              {t('videos.loadMore')} ({filteredVideos.length - (currentPage * videosPerPage)} {t('videos.remaining')})
            </button>
          )}
        </div>

        {/* Desktop Pagination */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-[#59ACBE] text-white'
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
            className="px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('common.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;

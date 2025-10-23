import React, { useState, useMemo, useCallback, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import VideoCard from "../Videos/VideoCard.jsx";
import CategoryCard from "../Categories/CategoryCard.jsx";
import { videosData } from "../../mockData/videosData.js";
import { categoriesData } from "../../mockData/categoriesData.js";
import { useLatestVideos } from "../../hooks/useYouTubeVideos.js";

const VideosPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categoryPage, setCategoryPage] = useState(1); // Pagination for categories
  const categoriesPerPage = 4; // Show 4 categories per page

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

  // Get categories that have videos
  const categoriesWithVideos = useMemo(() => {
    return categoriesData.filter(category => {
      const videos = videosByCategory[category.id] || [];
      return videos.length > 0;
    });
  }, [videosByCategory]);

  // Pagination for categories
  const totalCategoryPages = Math.ceil(categoriesWithVideos.length / categoriesPerPage);
  const startCategoryIndex = (categoryPage - 1) * categoriesPerPage;
  const endCategoryIndex = startCategoryIndex + categoriesPerPage;
  const paginatedCategories = categoriesWithVideos.slice(startCategoryIndex, endCategoryIndex);

  // Handle category page change
  const handleCategoryPageChange = useCallback((page) => {
    setCategoryPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
            <span className="text-gray-800 font-semibold">{t('nav.categories')}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">{t('categories.title')}</h1>
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

        {/* Show all videos grouped by category */}
        <div className="space-y-8 sm:space-y-12">
          {paginatedCategories.map((category) => {
            const categoryVideos = videosByCategory[category.id] || [];
            
            return (
              <div key={category.id} className="space-y-4 sm:space-y-6">
                {/* Category Card */}
                <div className="flex flex-col items-center">
                  <CategoryCard
                    titleKey={category.titleKey}
                    icon={category.icon}
                    color={category.color}
                    id={category.id}
                    bannerImage={category.bannerImage}
                    forceNavigate={true}
                    isMobile={false}
                  />
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

        {/* Category Pagination */}
        {totalCategoryPages > 1 && (
          <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handleCategoryPageChange(categoryPage - 1)}
              disabled={categoryPage === 1}
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all shadow-md ${
                categoryPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#59ACBE] text-white hover:bg-[#74BFD0] hover:shadow-lg'
              }`}
            >
              ← {t('common.previous')}
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1 sm:gap-2">
              {Array.from({ length: totalCategoryPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handleCategoryPageChange(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md ${
                    categoryPage === page
                      ? 'bg-[#59ACBE] text-white scale-110'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={() => handleCategoryPageChange(categoryPage + 1)}
              disabled={categoryPage === totalCategoryPages}
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all shadow-md ${
                categoryPage === totalCategoryPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#59ACBE] text-white hover:bg-[#74BFD0] hover:shadow-lg'
              }`}
            >
              {t('common.next')} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosPage;

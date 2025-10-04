import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import VideoCard from "../Videos/VideoCard.jsx";
import { categoriesData } from "../../mockData/categoriesData.js";
import { videosData } from "../../mockData/videosData.js";
import { useVideosByCategory } from "../../hooks/useYouTubeVideos.js";

const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id: idParam } = useParams();
  const { categoryTitle: stateTitle, videos: stateVideos } = location.state || {};

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

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="text-[#59ACBE] hover:text-[#4a9bb0] font-medium transition-colors"
            >
              ← {t('common.back')}
            </button>
          </div>
          
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: categoryData.color }}
              >
                <img src={categoryData.icon} alt={t(categoryData.titleKey)} className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                {t(categoryData.titleKey)}
              </h1>
            </div>
          </div>

          {/* Image and Description Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            {/* Category Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={categoryData.bannerImage} 
                  alt={t(categoryData.titleKey)}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Description */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {t('videos.description')}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {t(categoryData.descriptionKey)}
                </p>
                
           
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {videosLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59ACBE]"></div>
          </div>
        ) : videosError ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading videos: {videosError}</p>
            <p className="text-gray-600">Showing fallback content...</p>
          </div>
        ) : null}
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...resolvedVideos]
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
            .map((video) => (
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
        
        {resolvedVideos.length === 0 && !videosLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t('videos.noVideosFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
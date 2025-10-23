import React, { memo, useMemo, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import VideoCard from "./VideoCard.jsx";
import CategoryCard from "../Categories/CategoryCard.jsx";
import { videosData } from "../../mockData/videosData.js";
import { categoriesData } from "../../mockData/categoriesData.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useLatestVideos } from "../../hooks/useYouTubeVideos.js";
const VideosByCategoryComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fetch videos from YouTube API with caching - increased to handle larger playlists
  const { videos: apiVideos, loading, error } = useLatestVideos(100);
  
  // Memoized video selection - use API videos if available, otherwise fallback to mock data
  const videosToUse = useMemo(() => {
    console.log('🎬 VideosByCategory: API videos count:', apiVideos.length);
    console.log('🎬 VideosByCategory: Using', apiVideos.length > 0 ? 'API videos' : 'mock data');
    if (apiVideos.length > 0) {
      console.log('📊 Videos by category from API:', apiVideos.reduce((acc, video) => {
        acc[video.categoryId] = (acc[video.categoryId] || 0) + 1;
        return acc;
      }, {}));
    }
    return apiVideos.length > 0 ? apiVideos : videosData;
  }, [apiVideos]);

  // Memoized video grouping by category for performance
  const videosByCategory = useMemo(() => {
    if (!videosToUse || videosToUse.length === 0) return {};
    
    return videosToUse.reduce((acc, video) => {
      const key = Number(video.categoryId);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(video);
      return acc;
    }, {});
  }, [videosToUse]);

  // Memoized category click handler to prevent unnecessary re-renders
  const handleCategoryClick = useCallback((categoryId, categoryTitle) => {
    const categoryVideos = videosByCategory[categoryId] || [];
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📂 Category clicked:', { categoryId, categoryTitle, videosCount: categoryVideos.length });
    }
    
    // Batch sessionStorage write to avoid blocking main thread
    requestIdleCallback(() => {
      sessionStorage.setItem('categoryData', JSON.stringify({
        categoryTitle,
        videos: categoryVideos
      }));
    });
    
    // Navigate using React Router (works with HashRouter)
    navigate(`/category/${categoryId}`, {
      state: {
        categoryTitle,
        videos: categoryVideos
      }
    });
  }, [videosByCategory, navigate]);

  return (
    <section id="video-categories" className="py-12 px-2">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        {t('videos.byCategory')}
      </h2>
      
      
      {loading && videosToUse.length === 0 && (
        <div className="flex justify-center items-center py-12 ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59ACBE]"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Error loading videos: {error}</p>
          <p className="text-gray-600">Showing fallback content...</p>
        </div>
      )}
      
      <div className="space-y-16">
        {categoriesData.map((category) => {
          // Memoized category video processing
          const categoryData = useMemo(() => {
            let categoryVideos = videosByCategory[category.id] || [];
            
            // If no API videos available, try to use mock data for this category
            if (categoryVideos.length === 0) {
              const mockVideosForCategory = videosData.filter(v => v.categoryId === category.id);
              if (mockVideosForCategory.length === 0) return null;
              categoryVideos = mockVideosForCategory.slice(0, 4);
            }
            
            const categoryVideosSorted = [...categoryVideos].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
            return {
              videos: categoryVideosSorted,
              hasMore: categoryVideosSorted.length > 4
            };
          }, [videosByCategory, category.id]);
          
          if (!categoryData) return null;
          
          const { videos: categoryVideosSorted, hasMore } = categoryData;
          
          return (
            <div key={category.id} id={`cat-${category.id}`} className="w-full px-2">
              {/* Category Card and Videos Grid */}
              <div className="flex gap-6 items-start">
                {/* Category Card */}
                <div className="flex-shrink-0">
                  <CategoryCard
                    titleKey={category.titleKey}
                    icon={category.icon}
                    color={category.color}
                    id={Number(category.id)}
                    bannerImage={category.bannerImage}
                    forceNavigate={true}
                  />
                </div>
                
                {/* Videos Grid */}
                <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryVideosSorted.slice(0, 4).map((video) => (
                    <VideoCard 
                      key={video.id} 
                      id={video.id}
                      url={video.url} 
                      titleKey={video.titleKey}
                      categoryTitleKey={video.categoryTitleKey}
                      title={video.title}
                      categoryTitle={video.categoryTitle}
                      isMobile={false}
                    />
                  ))}
                </div>
              </div>
              
              {/* Show More Button if there are more videos */}
              {hasMore && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => handleCategoryClick(category.id, t(category.titleKey))}
                    className="px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors"
                  >
                    {t('categories.viewAll')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const VideosByCategory = VideosByCategoryComponent;
import React, { memo, useMemo, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoCard from "./VideoCard.jsx";
import { videosData } from "../../mockData/videosData.js";
import { useLatestVideos } from "../../hooks/useYouTubeVideos.js";

const LatestVideos = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  
  // Determine video count based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const maxVideos = isMobile ? 20 : 50; // Fetch more, show less
  
  // Fetch videos from YouTube API with caching
  const { videos: apiVideos, loading, error } = useLatestVideos(maxVideos);
  
  // Use API videos if available, otherwise fallback to mock data
  const videos = useMemo(() => {
    console.log('LatestVideos: API videos count:', apiVideos.length);
    console.log('LatestVideos: Using', apiVideos.length > 0 ? 'API videos' : 'mock data');
    return apiVideos.length > 0 ? apiVideos : videosData;
  }, [apiVideos]);
  
  // Memoized sorting by publication date (most recent first) instead of views
  const topVideos = useMemo(() => {
    if (!videos || videos.length === 0) return [];
    
    try {
      return [...videos]
        .sort((a, b) => {
          // First try to sort by publication date
          if (a?.publishedAt && b?.publishedAt) {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          }
          // Fallback to views if dates are not available
          return (b?.views ?? 0) - (a?.views ?? 0);
        })
        .slice(0, 6);
    } catch (err) {
      console.error('Error sorting videos:', err);
      return videos.slice(0, 6); // Return unsorted if sorting fails
    }
  }, [videos]);

  // Slider navigation functions
  const scrollToSlide = (direction) => {
    if (!sliderRef.current) return;
    
    const container = sliderRef.current;
    const cardWidth = 300; // Approximate card width including gap
    const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
    
    if (direction === 'next') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePrevClick = () => {
    scrollToSlide('prev');
  };

  const handleNextClick = () => {
    scrollToSlide('next');
  };

  if (loading) {
    return (
      <section className="py-10 px-8 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('videos.latest')}</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index} 
                  className="bg-gray-200 rounded-xl animate-pulse flex-shrink-0"
                  style={{ width: "280px" }}
                >
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
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-8 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('videos.latest')}</h2>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">{t('common.error')}: {error}</p>
            <p className="text-sm text-gray-400">{t('videos.noVideos')}</p>
          </div>
        </div>
      </section>
    );
  }

  // If no videos available, show message
  if (!loading && (!topVideos || topVideos.length === 0)) {
    return (
      <section className="py-10 px-8 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('videos.latest')}</h2>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No latest videos available</p>
            <p className="text-sm text-gray-400">Please check your internet connection or try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-10 px-3 sm:px-8 lazy-load">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation Buttons */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 px-1 sm:px-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t('videos.latest')}</h2>
          
          {/* Navigation Buttons - Show only on desktop */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={handlePrevClick}
              className="p-2 bg-white text-[#59ACBE] rounded-full shadow-md hover:bg-[#59ACBE] hover:text-white transition-all duration-200"
              aria-label="Previous videos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextClick}
              className="p-2 bg-white text-[#59ACBE] rounded-full shadow-md hover:bg-[#59ACBE] hover:text-white transition-all duration-200"
              aria-label="Next videos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Grid Layout - 2 columns x 3 rows */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {topVideos && topVideos.length > 0 ? topVideos.map((video) => {
            if (!video || !video.id) return null;
            return (
              <div key={video.id}>
                <VideoCard
                  id={video.id}
                  url={video.url || ''}
                  titleKey={video.titleKey}
                  categoryTitleKey={video.categoryTitleKey}
                  title={video.title || 'Untitled Video'}
                  categoryTitle={video.categoryTitle}
                  isMobile={true}
                />
              </div>
            );
          }) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">No videos available</p>
            </div>
          )}
        </div>

        {/* Desktop Horizontal Scrollable Container */}
        <div className="relative hidden lg:block">
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              touchAction: "pan-y pan-x",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            <div 
              className="flex gap-6 pb-4"
              style={{
                minWidth: "max-content"
              }}
            >
              {topVideos && topVideos.length > 0 ? topVideos.map((video) => {
                if (!video || !video.id) return null;
                return (
                  <div 
                    key={video.id}
                    className="flex-shrink-0"
                    style={{ 
                      width: "280px",
                      maxWidth: "280px"
                    }}
                  >
                    <VideoCard
                      id={video.id}
                      url={video.url || ''}
                      titleKey={video.titleKey}
                      categoryTitleKey={video.categoryTitleKey}
                      title={video.title || 'Untitled Video'}
                      categoryTitle={video.categoryTitle}
                      isMobile={false}
                    />
                  </div>
                );
              }) : (
                <div className="w-full text-center py-8">
                  <p className="text-gray-500">No videos available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Gradient Shadows for visual feedback */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default LatestVideos;
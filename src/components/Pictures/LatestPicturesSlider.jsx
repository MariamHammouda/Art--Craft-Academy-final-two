import React, { memo, useEffect, useState, useMemo, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import PictureCard from "./PictureCard.jsx";
import { getLatestPictures } from "../../mockData/picturesData.js";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const LatestPicturesSlider = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  // Initialize with latest pictures data
  useEffect(() => {
    try {
      const latestPictures = getLatestPictures(12); // Get 12 latest pictures for slider
      setPictures(latestPictures);
      setLoading(false);
    } catch (err) {
      console.error('Error loading latest pictures:', err);
      setError('Failed to load pictures');
      setLoading(false);
    }
  }, []);
  
  // Memoized sorting by creation date (most recent first)
  const latestPictures = useMemo(() => {
    if (!pictures || pictures.length === 0) return [];
    
    try {
      return [...pictures]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 12); // Show 12 pictures in slider
    } catch (err) {
      console.error('Error sorting pictures:', err);
      return pictures.slice(0, 12);
    }
  }, [pictures]);

  const handleViewAllClick = () => {
    navigate('/pictures');
  };

  // Slider navigation functions
  const scrollToSlide = (direction) => {
    if (!sliderRef.current) return;
    
    const container = sliderRef.current;
    const cardWidth = 320; // Approximate card width including gap
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

  // Auto-scroll functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current && latestPictures.length > 4) {
        const container = sliderRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          // Reset to beginning
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next
          scrollToSlide('next');
        }
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [latestPictures.length]);

  if (loading) {
    return (
      <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('pictures.latest')}
            </h2>
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md animate-pulse overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('pictures.latest')}
          </h2>
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-gray-500 mb-4 text-lg">{t('common.error')}: {error}</p>
            <p className="text-sm text-gray-400">{t('pictures.noPictures')}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200"
            >
              {t('common.tryAgain')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // If no pictures available, show message
  if (!loading && (!latestPictures || latestPictures.length === 0)) {
    return (
      <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('pictures.latest')}
          </h2>
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-gray-500 mb-4 text-lg">{t('pictures.noPictures')}</p>
            <p className="text-sm text-gray-400">{t('pictures.comingSoon')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('pictures.latest')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevClick}
                className="p-2 bg-white text-[#59ACBE] rounded-full shadow-md hover:bg-[#59ACBE] hover:text-white transition-all duration-200"
                aria-label="Previous pictures"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextClick}
                className="p-2 bg-white text-[#59ACBE] rounded-full shadow-md hover:bg-[#59ACBE] hover:text-white transition-all duration-200"
                aria-label="Next pictures"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Button */}
            <button
              onClick={handleViewAllClick}
              className="flex items-center gap-2 px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              {t('common.viewAll')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pictures Slider */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {latestPictures && latestPictures.length > 0 ? latestPictures.map((picture) => {
              if (!picture || !picture.id) return null;
              return (
                <div key={picture.id} className="flex-shrink-0 w-80">
                  <PictureCard
                    id={picture.id}
                    image={picture.image}
                    titleKey={picture.titleKey}
                    title={picture.title}
                    categoryTitleKey={picture.categoryTitleKey}
                    categoryTitle={picture.categoryTitle}
                    description={picture.description}
                    likes={picture.likes}
                    difficulty={picture.difficulty}
                    tags={picture.tags}
                  />
                </div>
              );
            }) : (
              <div className="w-full text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-500 text-lg">{t('pictures.noPictures')}</p>
              </div>
            )}
          </div>

          {/* Gradient Overlays for Visual Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-yellow-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center mt-6 lg:hidden">
          <div className="flex gap-2">
            <button
              onClick={handlePrevClick}
              className="px-4 py-2 bg-white text-[#59ACBE] border-2 border-[#59ACBE] rounded-lg hover:bg-[#59ACBE] hover:text-white transition-all duration-200 font-medium"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              className="px-4 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default memo(LatestPicturesSlider);

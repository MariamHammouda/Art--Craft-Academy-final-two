import React, { memo, useEffect, useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import PictureCard from "./PictureCard.jsx";
import { getLatestPictures } from "../../mockData/picturesData.js";
import { ArrowRight } from "lucide-react";

const LatestPictures = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize with latest pictures data
  useEffect(() => {
    try {
      const latestPictures = getLatestPictures(8); // Get 8 latest pictures
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
        .slice(0, 8); // Show 8 pictures in 2 rows of 4
    } catch (err) {
      console.error('Error sorting pictures:', err);
      return pictures.slice(0, 8);
    }
  }, [pictures]);

  const handleViewAllClick = () => {
    navigate('/pictures');
  };

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
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md animate-pulse overflow-hidden">
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
            <p className="text-gray-600 text-lg">
              {t('pictures.latestDescription')}
            </p>
          </div>
          
          <button
            onClick={handleViewAllClick}
            className="flex items-center gap-2 px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pictures Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestPictures && latestPictures.length > 0 ? latestPictures.map((picture) => {
            if (!picture || !picture.id) return null;
            return (
              <PictureCard
                key={picture.id}
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
            );
          }) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-gray-500 text-lg">{t('pictures.noPictures')}</p>
            </div>
          )}
        </div>

        {/* Show More Button for Mobile */}
        <div className="mt-8 text-center lg:hidden">
          <button
            onClick={handleViewAllClick}
            className="px-8 py-3 bg-white text-[#59ACBE] border-2 border-[#59ACBE] rounded-lg hover:bg-[#59ACBE] hover:text-white transition-all duration-200 font-medium shadow-md"
          >
            {t('pictures.exploreMore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(LatestPictures);

import React from "react";
import { useTranslation } from 'react-i18next';

const LatestVideosSimple = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('videos.latest')}</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Latest Videos Section</p>
          <p className="text-sm text-gray-500">This is a simplified version to prevent errors.</p>
        </div>
      </div>
    </section>
  );
};

export default LatestVideosSimple;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('about.title')}</h1>
            <p className="text-gray-600 text-lg">{t('about.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('about.mission')}</h2>
            <p className="text-gray-600 mb-6">
              {t('about.missionDescription')}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('about.whatWeOffer')}</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>{t('about.offerList.tutorials')}</li>
              <li>{t('about.offerList.courses')}</li>
              <li>{t('about.offerList.supplies')}</li>
              <li>{t('about.offerList.community')}</li>
              <li>{t('about.offerList.guidance')}</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('about.ourCategories')}</h2>
            <p className="text-gray-600 mb-4">
              {t('about.categoriesDescription')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#59ACBE]">{t('about.categoryCards.origami.title')}</h3>
                <p className="text-sm text-gray-600">{t('about.categoryCards.origami.description')}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">{t('about.categoryCards.drawing.title')}</h3>
                <p className="text-sm text-gray-600">{t('about.categoryCards.drawing.description')}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">{t('about.categoryCards.clay.title')}</h3>
                <p className="text-sm text-gray-600">{t('about.categoryCards.clay.description')}</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-800">{t('about.categoryCards.beads.title')}</h3>
                <p className="text-sm text-gray-600">{t('about.categoryCards.beads.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
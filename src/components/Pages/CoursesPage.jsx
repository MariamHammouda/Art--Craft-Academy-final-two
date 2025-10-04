import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const CoursesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="text-[#59ACBE] hover:text-[#FCD11A] font-medium"
            >
              ← Back to Home
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('courses.title')}</h1>
            <p className="text-gray-600 text-lg">{t('courses.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#59ACBE]">{t('courses.beginner')}</h3>
                <p className="text-sm text-gray-600 mt-2">Perfect for getting started</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800">{t('courses.intermediate')}</h3>
                <p className="text-sm text-gray-600 mt-2">Build on your skills</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800">{t('courses.advanced')}</h3>
                <p className="text-sm text-gray-600 mt-2">Master your craft</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800">Specialized Courses</h3>
                <p className="text-sm text-gray-600 mt-2">Focus on specific techniques</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-gray-500">Courses will be available soon. Stay tuned!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
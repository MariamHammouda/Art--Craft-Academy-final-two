import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ShopPage = () => {
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('shop.title')}</h1>
            <p className="text-gray-600 text-lg">{t('shop.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="font-semibold text-pink-800">Origami Paper</h3>
                <p className="text-sm text-gray-600 mt-2">High-quality folding paper</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#59ACBE]">Drawing Supplies</h3>
                <p className="text-sm text-gray-600 mt-2">Pencils, markers, and more</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800">Clay & Tools</h3>
                <p className="text-sm text-gray-600 mt-2">Modeling clay and sculpting tools</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800">Beads & Jewelry</h3>
                <p className="text-sm text-gray-600 mt-2">Beads, strings, and findings</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-gray-500">Shop will be available soon. Get ready to stock up on supplies!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
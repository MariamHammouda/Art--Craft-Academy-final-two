import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { categoriesData } from "../../mockData/categoriesData.js";
import CategoryCard from "./CategoryCard.jsx";

const CategoriesBarSimple = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Show 8 categories at a time
  const VISIBLE_COUNT = 8;
  const totalCategories = categoriesData.length; // Should be 12
  
  // Calculate how many "pages" we have
  const totalPages = Math.ceil(totalCategories / VISIBLE_COUNT);
  const currentPage = Math.floor(currentIndex / VISIBLE_COUNT);
  
  // Simple navigation
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentIndex((currentPage + 1) * VISIBLE_COUNT);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentIndex((currentPage - 1) * VISIBLE_COUNT);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex * VISIBLE_COUNT);
  };

  // Get visible categories for current page
  const startIndex = currentPage * VISIBLE_COUNT;
  const endIndex = Math.min(startIndex + VISIBLE_COUNT, totalCategories);
  const visibleCategories = categoriesData.slice(startIndex, endIndex);
  
  const showNavigation = totalCategories > VISIBLE_COUNT;

  return (
    <section id="categories" className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('categories.title')}</h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Previous Button */}
        {showNavigation && currentPage > 0 && (
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Previous categories"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {/* Categories Container */}
        <div className="flex justify-center items-center gap-6 overflow-hidden">
          {visibleCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              titleKey={cat.titleKey}
              icon={cat.icon}
              color={cat.color}
            />
          ))}
        </div>

        {/* Next Button */}
        {showNavigation && currentPage < totalPages - 1 && (
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Next categories"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {showNavigation && totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToPage(pageIndex)}
              className={`w-2 h-2 rounded-full transition-colors ${
                pageIndex === currentPage 
                  ? 'bg-[#59ACBE]' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      )}

      {/* Debug Info */}
      <div className="text-xs text-center mt-2 text-gray-500">
        Page {currentPage + 1} of {totalPages} | Showing {visibleCategories.length} of {totalCategories} categories
      </div>
    </section>
  );
};

export default CategoriesBarSimple;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesData } from "../../mockData/categoriesData.js";
import CategoryCard from "./CategoryCardSimple.jsx";

const CategoriesBarBasic = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  
  // Show first 8 categories by default, all when showAll is true
  const visibleCategories = showAll ? categoriesData : categoriesData.slice(0, 8);
  const hasMoreCategories = categoriesData.length > 8;

  return (
    <section id="categories" className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('categories.title')}</h2>

      {/* Categories Container */}
      <div className="flex justify-center items-center gap-6 overflow-hidden flex-wrap max-w-6xl mx-auto">
        {visibleCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            titleKey={cat.titleKey}
            title={cat.title}
            icon={cat.icon}
            color={cat.color}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMoreCategories && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors"
          >
            {showAll ? 'Show Less' : 'Show More Categories'}
          </button>
        </div>
      )}

      {/* Debug Info */}
      <div className="text-xs text-center mt-2 text-gray-500">
        Showing {visibleCategories.length} of {categoriesData.length} categories
        <br />
        Categories: {visibleCategories.map(cat => cat.title || cat.titleKey).join(', ')}
      </div>
    </section>
  );
};

export default CategoriesBarBasic;

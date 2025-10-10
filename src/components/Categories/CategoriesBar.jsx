import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { categoriesData } from "../../mockData/categoriesData.js";
import CategoryCard from "./CategoryCard.jsx";

const CategoriesBar = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // 🔹 تحديد عدد الكروت الظاهرة حسب عرض الشاشة
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      let newCount;
      if (width >= 1536) newCount = 6;
      else if (width >= 1280) newCount = 5;
      else if (width >= 1024) newCount = 4;
      else if (width >= 768) newCount = 3;
      else if (width >= 640) newCount = 2;
      else newCount = 1;
      setVisibleCount(prev => prev !== newCount ? newCount : prev);
    };

    let timeoutId;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisibleCount, 150);
    };

    updateVisibleCount();
    window.addEventListener('resize', throttledResize, { passive: true });
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const totalCategories = categoriesData.length;
  const maxIndex = Math.max(0, totalCategories - visibleCount);

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
  const goToSlide = (index) => setCurrentIndex(Math.min(index, maxIndex));

  const showNavigation = totalCategories > visibleCount;
  const totalDots = Math.max(1, maxIndex + 1);

  // ✅ لو الشاشة صغيرة جدًا (موبايل)، نخليها scrollable بدل سلايدر
  if (visibleCount <= 2) {
    return (
      <section id="categories" className="py-0 px-0">
        <div className="max-w-full mx-auto px-2 sm:px-4">
          <div className="overflow-x-auto no-scrollbar" style={{ touchAction: 'pan-x' }}>
            <div className="flex gap-2 sm:gap-4 min-w-max py-2">
              {categoriesData.map(cat => (
                <div key={cat.id} className="w-40 sm:w-48 flex-shrink-0">
                  <CategoryCard
                    id={cat.id}
                    titleKey={cat.titleKey}
                    icon={cat.icon}
                    color={cat.color}
                    bannerImage={cat.bannerImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ✅ باقي الشاشات الكبيرة تفضل بالسلايدر العادي
  return (
    <section id="categories" className="py-0 px-0">
      <div className="max-w-full mx-auto px-4">
        <div className="relative">
          {/* Previous Button */}
          {showNavigation && currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white transition-colors duration-200"
              aria-label="Previous categories"
            >
              <FiChevronLeft className="w-6 h-6 text-[#59ACBE]" />
            </button>
          )}

          {/* Categories Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out gap-4"
              style={{
                // ✅ الإصلاح هنا
                transform: `translateX(-${currentIndex * (100 / visibleCount + (visibleCount > 2 ? 0.5 : 0))}%)`,
                willChange: 'transform'
              }}
            >
              {categoriesData.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-shrink-0"
                  style={{
                    width: `${100 / visibleCount}%`
                  }}
                >
                  <CategoryCard
                    id={cat.id}
                    titleKey={cat.titleKey}
                    icon={cat.icon}
                    color={cat.color}
                    bannerImage={cat.bannerImage}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {showNavigation && currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white transition-colors duration-200"
              aria-label="Next categories"
            >
              <FiChevronRight className="w-6 h-6 text-[#59ACBE]" />
            </button>
          )}
        </div>

        {/* Dots Indicator */}
        {showNavigation && totalDots > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? 'bg-[#FCD11A]'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(CategoriesBar);

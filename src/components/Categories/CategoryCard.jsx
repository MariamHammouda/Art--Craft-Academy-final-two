import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryCard = ({ titleKey, icon, color, id, bannerImage }) => {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);
  
  const title = t(titleKey);

  // Get button color based on category ID to match the design
  const getButtonColor = (categoryId) => {
    const buttonColors = {
      1: 'bg-[#FFD93D] hover:bg-[#917c24]', // Origami - Yellow
      2: 'bg-[#63C8FF] hover:bg-[#51a2cf]', // Drawing - blue
      3: 'bg-[#32CD32] hover:bg-[#28B428]', // Recycling - Green
      4: 'bg-[#F0308F] hover:bg-[#bf2672]', // Beads - Pink
      5: 'bg-[#FFA500] hover:bg-[#E6940A]', // Clay - orange
      6: 'bg-[#FFD93D] hover:bg-[#917c24]', // Preschool - Green
      7: 'bg-[#63C8FF] hover:bg-[#51a2cf]', // Perler Beads - red
      8: 'bg-[#32CD32] hover:bg-[#28B428]', // 3D Pen - green
      9: 'bg-[#F0308F] hover:bg-[#bf2672]',  // Science - Pink
      10: 'bg-[#8B5CF6] hover:bg-[#7C3AED]'  // Miniature Wonders - Purple
    };
    return buttonColors[categoryId] || 'bg-[#59ACBE] hover:bg-[#4A9BB0]';
  };

  const handleCategoryClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Category clicked:', id, title);
    
    try {
      // Check if we're on mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // On mobile, navigate to the category page instead of scrolling
        window.location.href = `#/category/${id}`;
      } else {
        // On desktop, scroll to the video category section
        const targetElement = document.getElementById(`cat-${id}`);
        if (targetElement) {
          // Add a small delay for better scrolling experience
          setTimeout(() => {
            targetElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        } else {
          console.warn(`Category section with id 'cat-${id}' not found, navigating to category page`);
          // Fallback to category page if section not found
          window.location.href = `#/category/${id}`;
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to category page on error
      window.location.href = `#/category/${id}`;
    }
  }, [id, title]);

  // Touch event handlers for better mobile interaction
  const handleTouchStart = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleTouchCancel = useCallback(() => {
    setIsPressed(false);
  }, []);

  return (
    <div 
      className={`group cursor-pointer transition-transform duration-150 ${isPressed ? 'scale-95' : ''}`}
      onClick={handleCategoryClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCategoryClick(e);
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 overflow-hidden w-full my-2 sm:m-4" style={{ touchAction: 'manipulation' }}>
        {/* Colored Background Section with Icon */}
       <div 
          className="relative h-24 sm:h-32 flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: color }}
        >
          {/* Icon */}
          <img 
            src={icon} 
            alt={title} 
            className="w-12 h-12 sm:w-20 sm:h-20 filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
        
        {/* White Content Section */}
        <div className="p-2 sm:p-3 text-center bg-white">
          {/* Title */}
          <h3 className="text-gray-800 font-bold text-xs sm:text-sm mb-2 leading-tight">
            {title}
          </h3>
          
          {/* Explore Button */}
          <button className={`${getButtonColor(id)} text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition-colors duration-200`}>
            {t('common.explore')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CategoryCard);

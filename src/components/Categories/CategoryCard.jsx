import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryCard = ({ titleKey, icon, color, id, bannerImage }) => {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);
  
  const title = t(titleKey);

  // Get pastel background colors for cards
  const getCardColors = (categoryId) => {
    const cardColors = {
      1: { bg: '#FFF4B3', circle: '#FFD93D' }, // Origami - Yellow pastel
      2: { bg: '#B3E5FF', circle: '#63C8FF' }, // Drawing - Blue pastel
      3: { bg: '#B3FFB3', circle: '#32CD32' }, // Recycling - Green pastel
      4: { bg: '#FFB3E6', circle: '#F0308F' }, // Beads - Pink pastel
      5: { bg: '#FFD9B3', circle: '#FFA500' }, // Clay - Orange pastel
      6: { bg: '#FFB3E6', circle: '#FF69B4' }, // Preschool - Pink pastel
      7: { bg: '#D9B3FF', circle: '#8B5CF6' }, // Perler Beads - Purple pastel
      8: { bg: '#B3FFB3', circle: '#32CD32' }, // 3D Pen - Green pastel
      9: { bg: '#FFB3E6', circle: '#F0308F' }, // Science - Pink pastel
      10: { bg: '#D9B3FF', circle: '#8B5CF6' } // Miniature Wonders - Purple pastel
    };
    return cardColors[categoryId] || { bg: '#B3E5FF', circle: '#59ACBE' };
  };

  // Get button color based on category ID
  const getButtonColor = (categoryId) => {
    const buttonColors = {
      1: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]',
      2: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]',
      3: 'bg-white hover:bg-gray-50 text-[#32CD32] border border-[#32CD32]',
      4: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]',
      5: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]',
      6: 'bg-white hover:bg-gray-50 text-[#32CD32] border border-[#32CD32]',
      7: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]',
      8: 'bg-white hover:bg-gray-50 text-[#32CD32] border border-[#32CD32]',
      9: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]',
      10: 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]'
    };
    return buttonColors[categoryId] || 'bg-white hover:bg-gray-50 text-[#8B5CF6] border border-[#8B5CF6]';
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

  const cardColors = getCardColors(id);

  return (
    <div 
      className={`group cursor-pointer transition-all duration-300 ${isPressed ? 'scale-95' : ''}`}
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
      style={{ 
        touchAction: 'manipulation',
        perspective: '1000px',
        paddingTop: '50px'
      }}
    >
      <div 
        className="rounded-3xl transition-all duration-500 overflow-visible w-full my-2 sm:m-4 transform-gpu relative"
        style={{ 
          backgroundColor: cardColors.bg,
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(0px)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          minHeight: '240px',
          padding: '30px 24px 20px 24px',
          minWidth: '220px',
          width: '220px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)';
        }}
      >
        {/* Floating Circular Icon Badge */}
        <div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 transition-all duration-500"
          style={{
            transform: 'translateX(-50%) translateY(-8px) translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Circle Shadow */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-500"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              transform: 'translateY(8px) scale(0.95)',
              filter: 'blur(16px)',
              width: '100px',
              height: '100px'
            }}
          />
          
          {/* Main Circle */}
          <div 
            className="w-25 h-25 rounded-full flex items-center justify-center transition-all duration-500 relative"
            style={{
              backgroundColor: cardColors.circle,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
              transform: 'translateZ(10px)',
              width: '100px',
              height: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(15px) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.2), 0 6px 18px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(10px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Icon */}
            <img 
              src={icon} 
              alt={title} 
              className="w-14 h-14 transition-all duration-300 group-hover:scale-110" 
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                transform: 'translateZ(5px)'
              }}
            />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="pt-10 pb-4 text-center flex flex-col items-center justify-between h-full">
          {/* Title */}
          <h3 
            className="text-gray-800 font-bold text-sm sm:text-base mb-6 leading-tight px-3"
            style={{ 
              color: '#4A5568',
              transform: 'translateZ(5px)',
              marginTop: '24px'
            }}
          >
            {title}
          </h3>
          
          {/* Explore Button */}
          <button 
            className={`${getButtonColor(id)} text-sm sm:text-base font-semibold px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden`}
            style={{ 
              transform: 'translateZ(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(12px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(8px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <span className="relative z-10">{t('common.explore')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CategoryCard);

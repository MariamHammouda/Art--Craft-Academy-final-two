import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoryCardSimple = ({ titleKey, title, icon, color, id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Use direct title if provided, otherwise use translation key, with fallback
  const displayTitle = title || (titleKey ? t(titleKey) : 'Category');

  const handleClick = () => {
    console.log('Category clicked:', id, displayTitle);
    // Simple navigation without complex logic
    navigate(`/category/${id}`);
  };

  return (
    <div className="flex flex-col items-center text-center min-w-fit group cursor-pointer" onClick={handleClick}>
      <div
        className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition transform group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt={displayTitle} className="w-10 h-10" />
      </div>
      <div className="text-sm font-semibold mt-2 text-gray-700 group-hover:text-[#59ACBE] transition-colors">
        {displayTitle}
      </div>
    </div>
  );
};

export default CategoryCardSimple;

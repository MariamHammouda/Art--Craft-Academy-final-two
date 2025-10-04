import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Custom breadcrumbs for specific pages (if provided)
  if (customBreadcrumbs) {
    return (
      <nav className="flex items-center space-x-2 text-lg text-gray-600 mb-6">
        {customBreadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-400">&gt;</span>}
            {crumb.link ? (
              <Link 
                to={crumb.link} 
                className="text-[#59ACBE] hover:text-[#FCD11A] transition-colors duration-200"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }

  // Auto-generate breadcrumbs based on current path
  const pathnames = location.pathname.split('/').filter(x => x);
  
  const breadcrumbMap = {
    'pictures': t('nav.pictures'),
    'courses': t('nav.courses'),
    'shop': t('nav.shop'),
    'about': t('nav.about'),
    'category': t('nav.categories'),
    'drawing': t('pictures.categories.drawing'),
    'origami': t('pictures.categories.origamiPaperCrafts'),
    'recycling': t('pictures.categories.recyclingArt'),
    'beads': t('pictures.categories.beadsAccessories'),
    'clay': t('pictures.categories.clayCreations'),
    'preschool': t('pictures.categories.preschoolCrafts'),
    'perler': t('pictures.categories.perlerBeads'),
    '3dpen': t('pictures.categories.3dPenFun'),
    'miniature': t('pictures.categories.miniatureWonders'),
    'science': t('pictures.categories.scienceDiyExperiments'),
    'tips': t('pictures.categories.tipsTricks')
  };

  return (
    <nav className="flex items-center space-x-2 text-lg text-gray-600 mb-6">
      {/* Home Link */}
      <Link 
        to="/" 
        className="text-[#59ACBE] hover:text-[#FCD11A] transition-colors duration-200"
      >
        {t('nav.home')}
      </Link>

      {/* Dynamic Path Breadcrumbs */}
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = breadcrumbMap[pathname] || pathname;

        return (
          <React.Fragment key={pathname}>
            <span className="text-gray-400">&gt;</span>
            {isLast ? (
              <span className="text-gray-800 font-medium">{label}</span>
            ) : (
              <Link 
                to={routeTo} 
                className="text-[#59ACBE] hover:text-[#FCD11A] transition-colors duration-200"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

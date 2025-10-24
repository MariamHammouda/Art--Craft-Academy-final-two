import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import NavbarLogo from "../../assets/images/hero-images/navbar-logo.png";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import SearchModal from "../Search/SearchModal.jsx";

const NavBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // Check if we're on the home page (HashRouter consideration)
  const isHomePage = location.pathname === '/' || location.pathname === '';
  const showLogo = true; // Show logo on all pages INCLUDING home
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    console.log('Mobile menu state changed to:', isMobileMenuOpen);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-btn')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    console.log('Toggle menu clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log('New state will be:', !isMobileMenuOpen);
  };
  
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };
  
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <nav className="bg-[#74BFD0] shadow-lg sticky top-0 z-[100]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">

          {/* Logo - Show on all pages INCLUDING home */}
          {showLogo && (
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={NavbarLogo} 
                  alt="Art Craft Academy" 
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="ml-4 md:ml-8 lg:ml-12 flex-1">
            <ul className="hidden md:flex items-center gap-3 lg:gap-8 text-white">
              <li>
                <Link 
                  to="/" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={NavbarLogo} alt="Art Icon" className="w-6 h-6 lg:w-10 lg:h-10" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <HashLink 
                  smooth 
                  to="/#categories" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={NavbarLogo} alt="Art Icon" className="w-6 h-6 lg:w-10 lg:h-10" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.categories')}</span>
                </HashLink>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={NavbarLogo} alt="Art Icon" className="w-6 h-6 lg:w-10 lg:h-10" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.courses')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={NavbarLogo} alt="Art Icon" className="w-6 h-6 lg:w-10 lg:h-10" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.shop')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={NavbarLogo} alt="Art Icon" className="w-6 h-6 lg:w-10 lg:h-10" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.about')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Mobile Actions (Search + Menu) */}
          <div className="flex md:hidden items-center gap-2 relative z-10">
            <button 
              onClick={openSearchModal}
              className="text-white text-xl p-2 hover:text-[#FCD11A] transition-colors rounded-lg hover:bg-white/10 touch-manipulation"
              title={t('common.search')}
              aria-label="Search"
            >
              <FaSearch />
            </button>
            <button 
              className="hamburger-btn text-white text-2xl p-2 hover:text-[#FCD11A] transition-colors rounded-lg hover:bg-white/10 touch-manipulation"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Search, Language */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0 ml-auto mt-4 lg:mt-8">
            <button 
              onClick={openSearchModal}
              className="text-lg lg:text-2xl text-white rounded-full hover:bg-[#F1BD09] p-1.5 lg:p-2 transition-colors" 
              title={t('common.search')}
            >
              <FaSearch />
            </button>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      {/* Full-Screen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-[150] md:hidden animate-fadeIn">
          {/* Blurred Background Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#74BFD0]/90 via-[#E8A5C4]/85 to-[#74BFD0]/90 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content - Scrollable Container */}
          <div className="relative z-10 flex flex-col items-center justify-start h-full w-full px-8 py-8 mobile-menu-scroll animate-slideDown">
          {/* Close Button - Fixed position so it's always visible while scrolling */}
          <button 
            onClick={toggleMobileMenu}
            className="fixed top-8 right-8 text-white text-3xl p-2 hover:text-[#FCD11A] transition-colors rounded-full hover:bg-white/10 z-20"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          
          {/* Menu Inner Content - Scrollable */}
          <div className="flex flex-col items-center w-full min-h-full">
            {/* Logo */}
            <div className="mb-8 sm:mb-12 flex-shrink-0">
              <img src={NavbarLogo} alt="Art Craft Academy" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto drop-shadow-xl" />
            </div>
            
            {/* Navigation Links - Larger touch targets */}
            <nav className="flex flex-col items-center space-y-3 sm:space-y-4 mb-4 sm:mb-8 w-full max-w-xs flex-shrink-0">
              <Link 
                to="/" 
                className="w-full text-center py-3 px-6 text-white text-xl sm:text-2xl font-semibold hover:text-[#FCD11A] hover:bg-white/10 rounded-2xl transition-all duration-300 transform active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <HashLink 
                smooth 
                to="/#categories" 
                className="w-full text-center py-3 px-6 text-white text-xl sm:text-2xl font-semibold hover:text-[#FCD11A] hover:bg-white/10 rounded-2xl transition-all duration-300 transform active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.categories')}
              </HashLink>
              <Link 
                to="/courses" 
                className="w-full text-center py-3 px-6 text-white text-xl sm:text-2xl font-semibold hover:text-[#FCD11A] hover:bg-white/10 rounded-2xl transition-all duration-300 transform active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.courses')}
              </Link>
              <Link 
                to="/shop" 
                className="w-full text-center py-3 px-6 text-white text-xl sm:text-2xl font-semibold hover:text-[#FCD11A] hover:bg-white/10 rounded-2xl transition-all duration-300 transform active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.shop')}
              </Link>
              <Link 
                to="/about" 
                className="w-full text-center py-3 px-6 text-white text-xl sm:text-2xl font-semibold hover:text-[#FCD11A] hover:bg-white/10 rounded-2xl transition-all duration-300 transform active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
            </nav>
            
            {/* Language Switcher */}
            <div className="flex justify-center mt-3 mb-8 flex-shrink-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        </div>
      )}
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={closeSearchModal} 
      />
    </nav>
  );
};

export default NavBar;

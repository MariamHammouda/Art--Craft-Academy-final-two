import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../Button/Button.jsx";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import NavbarLogo from "../../assets/images/hero-images/navbar-logo.png";
import CustomIcon from "../../assets/images/icon.ico";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import SearchModal from "../Search/SearchModal.jsx";

const NavBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // Check if we're on the home page (HashRouter consideration)
  const isHomePage = location.pathname === '/' || location.pathname === '';
  const showLogo = !isHomePage; // Show logo on all pages EXCEPT home
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };
  
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <nav className="bg-[#59ACBE] shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-1 sm:py-2">
        <div className="flex items-center justify-between relative">

          {/* Logo - Show on all pages EXCEPT home */}
          {showLogo && (
            <div className="flex-shrink-0 -my-3">
              <Link to="/" className="flex items-center">
                <img 
                  src={NavbarLogo} 
                  alt="Art Craft Academy" 
                  className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className={`${showLogo ? 'ml-8 lg:ml-12' : 'flex-1 flex justify-center'}`}>
            <ul className="hidden md:flex items-center gap-4 lg:gap-8 text-white">
              <li>
                <Link 
                  to="/" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
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
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.categories')}</span>
                </HashLink>
              </li>
              <li>
                <HashLink 
                  smooth 
                  to="/#video-categories" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.videos')}</span>
                </HashLink>
              </li>
              <li>
                <Link 
                  to="/pictures" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.pictures')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className="group flex flex-col items-center text-white hover:text-[#FCD11A] font-medium transition-all duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 mb-1">
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
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
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
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
                    <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold">{t('nav.about')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hamburger-btn text-white text-xl sm:text-2xl p-2 hover:text-[#FCD11A] transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Search, Language, Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0 ml-auto mt-4 lg:mt-8">
            <button 
              onClick={openSearchModal}
              className="text-lg lg:text-2xl text-white rounded-full hover:bg-[#F1BD09] p-1.5 lg:p-2 transition-colors" 
              title={t('common.search')}
            >
              <FaSearch />
            </button>

            <LanguageSwitcher />

            <Button
              onClick={() => console.log("Login clicked")}
              className="px-3 lg:px-6 py-1.5 lg:py-2 text-sm lg:text-base bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#59ACBE] transition duration-200"
            >
              {t('nav.login')}
            </Button>

            <Button
              onClick={() => console.log("Sign Up clicked")}
              className="px-3 lg:px-6 py-1.5 lg:py-2 text-sm lg:text-base bg-[#FCD11A] text-[#59ACBE] border-2 border-[#FCD11A] rounded-lg hover:bg-yellow-500 transition duration-200"
            >
              {t('nav.signup')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Side Menu */}
      <div className={`mobile-menu fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-[#59ACBE] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center">
              <img src={CustomIcon} alt="Art Icon" className="w-8 h-8 mr-2" />
              <h2 className="text-white text-lg font-semibold">{t('nav.menu')}</h2>
            </div>
            <button 
              onClick={toggleMobileMenu}
              className="text-white text-xl p-1 hover:text-[#FCD11A] transition-colors"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <HashLink 
                  smooth 
                  to="/#categories" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.categories')}</span>
                </HashLink>
              </li>
              <li>
                <HashLink 
                  smooth 
                  to="/#video-categories" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.videos')}</span>
                </HashLink>
              </li>
              <li>
                <Link 
                  to="/pictures" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.pictures')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.courses')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.shop')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="flex items-center py-3 px-4 text-white hover:bg-white/10 hover:text-[#FCD11A] rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={CustomIcon} alt="Art Icon" className="w-6 h-6 mr-3" />
                  <span className="text-lg font-medium">{t('nav.about')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="border-t border-white/20 p-4 space-y-4">
            {/* Search Button */}
            <button 
              onClick={() => {
                openSearchModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors" 
              title={t('common.search')}
            >
              <FaSearch className="mr-2" />
              <span>{t('common.search')}</span>
            </button>
            
            {/* Language Switcher */}
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            
            {/* Login/Signup Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => {
                  console.log("Login clicked");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#59ACBE] transition duration-200"
              >
                {t('nav.login')}
              </Button>

              <Button
                onClick={() => {
                  console.log("Sign Up clicked");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-[#FCD11A] text-[#59ACBE] border-2 border-[#FCD11A] rounded-lg hover:bg-yellow-500 transition duration-200"
              >
                {t('nav.signup')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
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

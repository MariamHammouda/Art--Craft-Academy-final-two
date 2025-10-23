import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import NavbarLogo from "../../assets/images/hero-images/navbar-logo.png";
import FacebookIcon from "../../assets/images/social-media-icons/facebook.ico";
import InstagramIcon from "../../assets/images/social-media-icons/instagram.ico";
import YoutubeIcon from "../../assets/images/social-media-icons/youtube.ico";
import TiktokIcon from "../../assets/images/social-media-icons/tiktok.ico";
import PinterestIcon from "../../assets/images/social-media-icons/pinterest.ico";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="text-white bg-[#74BFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('about.contact')}</h3>
          <ul className="space-y-2 sm:space-y-3 text-white/90">
            <li className="flex items-center justify-center sm:justify-start gap-3">
              <FaEnvelope className="flex-shrink-0" />
              <a href="mailto:hello@artcraft.academy" className="hover:underline text-sm sm:text-base break-all">hello@artcraft.academy</a>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-3">
              <FaPhone className="flex-shrink-0" />
              <a href="tel:+10000000000" className="hover:underline text-sm sm:text-base">+1 (000) 000-0000</a>
            </li>
          </ul>
        </div>

        {/* Important Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2 sm:space-y-3 text-white/90">
            <li><Link to="/" className="hover:underline text-sm sm:text-base inline-block py-1">{t('nav.home')}</Link></li>
            <li><Link to="/#video-categories" className="hover:underline text-sm sm:text-base inline-block py-1">{t('nav.videos')}</Link></li>
            <li><Link to="/courses" className="hover:underline text-sm sm:text-base inline-block py-1">{t('nav.courses')}</Link></li>
            <li><Link to="/shop" className="hover:underline text-sm sm:text-base inline-block py-1">{t('nav.shop')}</Link></li>
            <li><Link to="/about" className="hover:underline text-sm sm:text-base inline-block py-1">{t('nav.about')}</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('footer.followUs')}</h3>
          <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
            <a 
              href="https://www.facebook.com/share/1CmZqgcT7N/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="h-11 w-11 sm:h-10 sm:w-10 rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={FacebookIcon} alt="Facebook" className="h-11 w-11 sm:h-10 sm:w-10 rounded-full" />
            </a>
            <a 
              href="https://www.instagram.com/artandcraftacademy1?igsh=dndxZGg4aXI5Nmt3" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="h-11 w-11 sm:h-10 sm:w-10 rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={InstagramIcon} alt="Instagram" className="h-11 w-11 sm:h-10 sm:w-10 rounded-full" />
            </a>
            <a 
              href="https://www.youtube.com/@Art-Craft-Academy1" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube" 
              className="h-11 w-11 sm:h-10 sm:w-10 rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={YoutubeIcon} alt="YouTube" className="h-11 w-11 sm:h-10 sm:w-10 rounded-full" />
            </a>
            <a 
              href="https://www.tiktok.com/@art_craft_academy?_t=ZS-90XcJsMfNEw&_r=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="TikTok" 
              className="h-11 w-11 sm:h-10 sm:w-10 rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={TiktokIcon} alt="TikTok" className="h-11 w-11 sm:h-10 sm:w-10 rounded-full" />
            </a>
            <a 
              href="https://pin.it/RLd2P2XCO" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Pinterest" 
              className="h-11 w-11 sm:h-10 sm:w-10 rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={PinterestIcon} alt="Pinterest" className="h-11 w-11 sm:h-10 sm:w-10 rounded-full" />
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center sm:items-center md:items-end">
          <div className="mb-3 sm:mb-4">
            <Link to="/" className="flex items-center">
              <img 
                src={NavbarLogo} 
                alt="Art Craft Academy" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto hover:scale-105 active:scale-95 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-white/80 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-2">
          <p className="text-center sm:text-left">{t('footer.copyright')}</p>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <Link to="/privacy-policy" className="hover:underline hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
            <a href="#" className="hover:underline hover:text-white transition-colors">{t('footer.termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


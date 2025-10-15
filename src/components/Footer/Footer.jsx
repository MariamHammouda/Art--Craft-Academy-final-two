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
    <footer className="text-white bg-gradient-to-r from-[#59ACBE] via-[#4A9BB8] to-[#3B8AAD]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('about.contact')}</h3>
          <ul className="space-y-2 text-white/90">
            <li className="flex items-center gap-3">
              <FaEnvelope />
              <a href="mailto:hello@artcraft.academy" className="hover:underline">hello@artcraft.academy</a>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone />
              <a href="tel:+10000000000" className="hover:underline">+1 (000) 000-0000</a>
            </li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/" className="hover:underline">{t('nav.home')}</Link></li>
            <li><Link to="/#video-categories" className="hover:underline">{t('nav.videos')}</Link></li>
            <li><Link to="/courses" className="hover:underline">{t('nav.courses')}</Link></li>
            <li><Link to="/shop" className="hover:underline">{t('nav.shop')}</Link></li>
            <li><Link to="/about" className="hover:underline">{t('nav.about')}</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('footer.followUs')}</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <a 
              href="https://www.facebook.com/share/1CmZqgcT7N/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={FacebookIcon} alt="Facebook" className="h-10 w-10 rounded-full" />
            </a>
            <a 
              href="https://www.instagram.com/artandcraftacademy1?igsh=dndxZGg4aXI5Nmt3" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={InstagramIcon} alt="Instagram" className="h-10 w-10 rounded-full" />
            </a>
            <a 
              href="https://www.youtube.com/@Art-Craft-Academy1" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube" 
              className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={YoutubeIcon} alt="YouTube" className="h-10 w-10 rounded-full" />
            </a>
            <a 
              href="https://www.tiktok.com/@art_craft_academy?_t=ZS-90XcJsMfNEw&_r=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="TikTok" 
              className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={TiktokIcon} alt="TikTok" className="h-10 w-10 rounded-full" />
            </a>
            <a 
              href="https://pin.it/RLd2P2XCO" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Pinterest" 
              className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              <img src={PinterestIcon} alt="Pinterest" className="h-10 w-10 rounded-full" />
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center md:items-end">
          <div className="mb-4">
            <Link to="/" className="flex items-center">
              <img 
                src={NavbarLogo} 
                alt="Art Craft Academy" 
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-white/80 flex flex-wrap items-center justify-between gap-2">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:underline">{t('footer.privacyPolicy')}</Link>
            <a href="#" className="hover:underline">{t('footer.termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


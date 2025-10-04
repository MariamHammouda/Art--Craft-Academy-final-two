import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaEnvelope, FaPhone } from "react-icons/fa6";
import { Logoimg } from '../Logo/Artlogo.jsx';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="mt-16 text-white" style={{ backgroundColor: "#59ACBE" }}>
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
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              <FaInstagram />
            </a>
            <a href="#" aria-label="YouTube" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              <FaYoutube />
            </a>
            <a href="#" aria-label="TikTok" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center md:items-end">
          <div className="mb-4 transform scale-125">
            <Logoimg />
          </div>
          <p className="text-white/90 text-sm text-center md:text-right">
            {t('common.welcome')}
          </p>
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


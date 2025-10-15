import React from "react";
import { useTranslation } from "react-i18next";
import HeroSlider from "../HeroImage/HeroSlider";
import { Button } from "../Button/Button.jsx";
import CategoriesBar from "../Categories/CategoriesBar.jsx";
import Artlogo from "../../assets/images/hero-images/Artlogo.png";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <>
      <section id="home" className="bg-[#74BFD0] py-4 md:py-8 lg:py-12 min-h-screen flex items-center">
        <div className="container mx-auto px-2 sm:px-4 w-full">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Text Content Column */}
            <div className={`space-y-2 text-center ${isRTL ? 'lg:text-right lg:order-2' : 'lg:text-left lg:order-1'}`}>
              {/* Big Logo */}
              <div className={`flex justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} mb-2 -mt-4`}>
                <img
                  src={Artlogo}
                  alt="Academy of Art and Craft Logo"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto object-contain drop-shadow-lg"
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                  {t("hero.title")}
                  <span className="text-[#FCD11A] block sm:inline">
                    {" "}
                    {t("hero.titleHighlight")}
                  </span>
                  {t("hero.titleEnd") && (
                    <span className="block">{t("hero.titleEnd")}</span>
                  )}
                </h1>
                <p className={`text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-lg mx-auto ${isRTL ? 'lg:mr-0' : 'lg:mx-0'}`}>
                  {t("hero.description")}
                </p>
              </div>
            </div>

            {/* Image Slider Column */}
            <div className={`flex justify-center items-center ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="w-full max-w-md">
                <HeroSlider />
              </div>
            </div>
          </div>
          
          {/* Categories Section */}
          <div className="mt-2 md:mt-4">
            <div className="text-center mb-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                {t('categories.exploreCategories') || 'Explore Categories'}
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                {t('categories.subtitle') || 'Discover amazing craft projects'}
              </p>
            </div>
            <CategoriesBar />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

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
      <section id="home" className="bg-[#74BFD0] py-6 sm:py-8 md:py-12 lg:py-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Text Content Column */}
            <div className={`space-y-4 sm:space-y-6 text-center ${isRTL ? 'lg:text-right lg:order-2' : 'lg:text-left lg:order-1'}`}>
              {/* Big Logo */}
              {/* <div className={`flex justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} mb-2 -mt-4`}>
                <img
                  src={Artlogo}
                  alt="Academy of Art and Craft Logo"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto object-contain drop-shadow-lg"
                />
              </div> */}

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-2">
                  {t("hero.title")}
                  <span className="text-[#FF6B35] block sm:inline drop-shadow-lg">
                    {" "}
                    {t("hero.titleHighlight")}
                  </span>
                  {t("hero.titleEnd") && (
                    <span className="block mt-2">{t("hero.titleEnd")}</span>
                  )}
                </h1>
                <p className={`text-lg sm:text-xl lg:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto ${isRTL ? 'lg:mr-0' : 'lg:mx-0'} drop-shadow-sm px-4 sm:px-2`}>
                  {t("hero.description")}
                </p>
              </div>
            </div>

            {/* Image Slider Column */}
            <div className={`flex justify-center items-center ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="w-full max-w-lg px-4">
                <HeroSlider />
              </div>
            </div>
          </div>
          
          {/* Categories Section */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
            <div className="text-center mb-4 sm:mb-6 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                {t('categories.exploreCategories') || 'Explore Categories'}
              </h2>
              <p className="text-white/90 text-base sm:text-lg md:text-lg drop-shadow-sm">
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

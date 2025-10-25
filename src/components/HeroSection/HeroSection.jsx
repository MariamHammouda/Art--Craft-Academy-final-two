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
      <section id="home" className="bg-[#74BFD0] pt-3 pb-0 sm:pt-4 sm:pb-0 md:pt-6 md:pb-0 lg:pt-8 lg:pb-0 relative overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 w-full overflow-visible">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 lg:gap-8 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Text Content Column */}
            <div className={`space-y-2 sm:space-y-3 text-center ${isRTL ? 'lg:text-right lg:order-2' : 'lg:text-left lg:order-1'}`}>
              {/* Big Logo */}
              {/* <div className={`flex justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} mb-2 -mt-4`}>
                <img
                  src={Artlogo}
                  alt="Academy of Art and Craft Logo"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto object-contain drop-shadow-lg"
                />
              </div> */}

              <div className="space-y-1.5 sm:space-y-2.5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight px-2">
                  {t("hero.title")}
                  <span className="text-[#FF6B35] block sm:inline drop-shadow-lg">
                    {" "}
                    {t("hero.titleHighlight")}
                  </span>
                  {t("hero.titleEnd") && (
                    <span className="block mt-1 sm:mt-1.5">{t("hero.titleEnd")}</span>
                  )}
                </h1>
                <p className={`text-base sm:text-lg lg:text-lg text-white/95 leading-snug sm:leading-relaxed max-w-2xl mx-auto ${isRTL ? 'lg:mr-0' : 'lg:mx-0'} drop-shadow-sm px-4 sm:px-2`}>
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
          
          {/* Categories Section - Positioned to be partially visible above the fold */}
          <div className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 pb-8 sm:pb-10 md:pb-12 overflow-visible">
            <div className="text-center mb-0 sm:mb-2 px-4 overflow-visible">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-white mb-0 sm:mb-1 drop-shadow-lg">
                {t('categories.exploreCategories') || 'Explore Categories'}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm md:text-base drop-shadow-sm mb-0">
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

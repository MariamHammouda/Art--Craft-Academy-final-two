import React from "react";
import { useTranslation } from "react-i18next";
import HeroSlider from "../HeroImage/HeroSlider";
import { Button } from "../Button/Button.jsx";
import Artlogo from "../../assets/images/hero-images/Artlogo.png";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <>
      <section id="home" className="bg-[#59ACBE] py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Text Content Column */}
            <div className={`space-y-2 text-center ${isRTL ? 'lg:text-right lg:order-2' : 'lg:text-left lg:order-1'}`}>
              {/* Big Logo */}
              <div className={`flex justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} mb-2 -mt-8`}>
                <img
                  src={Artlogo}
                  alt="Academy of Art and Craft Logo"
                  className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 w-auto object-contain drop-shadow-lg"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {t("hero.title")}
                  <span className="text-[#FCD11A] block sm:inline">
                    {" "}
                    {t("hero.titleHighlight")}
                  </span>
                  {t("hero.titleEnd") && (
                    <span className="block">{t("hero.titleEnd")}</span>
                  )}
                </h1>
                <p className={`text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg mx-auto ${isRTL ? 'lg:mr-0' : 'lg:mx-0'}`}>
                  {t("hero.description")}
                </p>
              </div>
            </div>

            {/* Image Slider Column */}
            <div className={`flex justify-center items-center ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="w-full max-w-2xl">
                {" "}
                {/* أو max-w-6xl للعرض الكامل */}
                <HeroSlider />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

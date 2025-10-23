import React, { useEffect, useMemo, useState } from "react";
import img1 from "../../assets/images/hero-images/house.jpg";
import img2 from "../../assets/images/hero-images/accessory.jpg";
import img3 from "../../assets/images/hero-images/girl.jpg";
import img4 from "../../assets/images/hero-images/accessory2.jpg";
import img5 from "../../assets/images/hero-images/popsicle.jpg";
import img6 from "../../assets/images/hero-images/popsicle2.jpg";
import img7 from "../../assets/images/hero-images/popsicle.png";
import img8 from "../../assets/images/hero-images/lubobo.jpg";

const SLIDE_INTERVAL_MS = 4000;

/**
 * HeroSlider Component
 * 
 * Recommended Image Specifications:
 * - Aspect Ratio: 16:9 (landscape) for optimal display
 * - Resolution: Minimum 1280x720px, Recommended 1920x1080px or higher
 * - Format: JPG, PNG, or WebP
 * - File Size: Optimized for web (under 500KB per image)
 * 
 * The component uses object-cover to maintain aspect ratios while filling
 * the container, cropping excess content as needed.
 */
const HeroSlider = () => {
  const images = useMemo(() => [img1, img2, img3, img4, img5, img6, img7, img8], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Image Container with Mobile-Optimized Height */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] overflow-hidden rounded-3xl shadow-2xl bg-gray-100 ring-4 ring-white/20">
        {/* Slides */}
        {images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt={`Art Craft Academy Slide ${i + 1}`}
              className="w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Enhanced Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent z-10" />

        {/* Dot Indicators - UPDATED SIZE */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-black/15 backdrop-blur-sm px-3 py-2 rounded-full">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{ minWidth: 'auto', minHeight: 'auto' }}
              className={`rounded-full transition-all duration-300 ${
                i === index 
                  ? "bg-[#FF6B35] w-8 h-2 sm:w-10 sm:h-2.5" 
                  : "bg-white/50 w-2 h-2 sm:w-2.5 sm:h-2.5 hover:bg-white hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-20">
          {/* Previous Arrow */}
          <button
            aria-label="Previous slide"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="pointer-events-auto ml-3 sm:ml-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 text-gray-800 hover:bg-[#FF6B35] hover:text-white hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm ring-2 ring-white/30"
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Next Arrow */}
          <button
            aria-label="Next slide"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            className="pointer-events-auto mr-3 sm:mr-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 text-gray-800 hover:bg-[#FF6B35] hover:text-white hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm ring-2 ring-white/30"
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-4 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Loading Placeholder */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ zIndex: -1 }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Loading images...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
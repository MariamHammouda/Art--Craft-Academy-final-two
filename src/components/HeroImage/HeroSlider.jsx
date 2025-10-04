import React, { useEffect, useMemo, useState } from "react";
import img1 from "../../assets/images/hero-images/house.jpg";
import img2 from "../../assets/images/hero-images/accessory.jpg";
import img3 from "../../assets/images/hero-images/girl.jpg";
import img4 from "../../assets/images/hero-images/accessory2.jpg";
import img5 from "../../assets/images/hero-images/popsicle.jpg"
import img6 from  "../../assets/images/hero-images/popsicle2.jpg"



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
  const images = useMemo(() => [img1, img2, img3, img4,img5,img6], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Image Container with Increased Height and Enhanced Styling */}
      <div className="relative w-full h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem] overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === index 
                  ? "bg-white w-8 shadow-lg" 
                  : "bg-white/60 w-3 hover:bg-white/80 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10">
          <button
            aria-label="Previous slide"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
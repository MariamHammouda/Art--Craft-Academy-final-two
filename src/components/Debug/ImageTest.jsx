import React from 'react';
import gradientBackground from '../../assets/images/gradient-background.jpg';
import img1 from '../../assets/images/hero-images/house.jpg';

const ImageTest = () => {
  console.log('Gradient background path:', gradientBackground);
  console.log('Hero image path:', img1);
  
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Image Loading Test</h2>
      
      {/* Test 1: Direct img tag */}
      <div>
        <h3 className="text-lg font-semibold">Direct Image Tag Test:</h3>
        <img src={gradientBackground} alt="Gradient Background" className="w-32 h-32 object-cover border" />
        <img src={img1} alt="Hero Image" className="w-32 h-32 object-cover border ml-2" />
      </div>
      
      {/* Test 2: Background image via inline style */}
      <div>
        <h3 className="text-lg font-semibold">Background Image Test:</h3>
        <div 
          className="w-32 h-32 bg-cover bg-center border"
          style={{ backgroundImage: `url(${gradientBackground})` }}
        />
        <div 
          className="w-32 h-32 bg-cover bg-center border ml-2 inline-block"
          style={{ backgroundImage: `url(${img1})` }}
        />
      </div>
      
      {/* Test 3: Show raw paths */}
      <div>
        <h3 className="text-lg font-semibold">Image Paths:</h3>
        <p>Gradient: {gradientBackground}</p>
        <p>Hero: {img1}</p>
      </div>
    </div>
  );
};

export default ImageTest;

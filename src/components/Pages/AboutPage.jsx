import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="text-[#59ACBE] hover:text-[#FCD11A] font-medium"
            >
              ← Back to Home
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Art Craft Academy</h1>
            <p className="text-gray-600 text-lg">Inspiring creativity through hands-on learning</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Art Craft Academy is dedicated to fostering creativity and artistic expression through 
              comprehensive craft education. We believe that everyone has the potential to create 
              beautiful, meaningful art with the right guidance and materials.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Step-by-step video tutorials for all skill levels</li>
              <li>Comprehensive courses covering various craft techniques</li>
              <li>High-quality craft supplies and materials</li>
              <li>Community support and inspiration</li>
              <li>Expert guidance from experienced crafters</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Categories</h2>
            <p className="text-gray-600 mb-4">
              From origami and drawing to clay modeling and jewelry making, we cover a wide range 
              of craft categories to suit every interest and skill level.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#59ACBE]">Origami World</h3>
                <p className="text-sm text-gray-600">Paper folding techniques and projects</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Drawing & Painting</h3>
                <p className="text-sm text-gray-600">Artistic expression through drawing</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Clay & Sculpting</h3>
                <p className="text-sm text-gray-600">3D art and modeling techniques</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-800">Beads & Jewelry</h3>
                <p className="text-sm text-gray-600">Accessory making and design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
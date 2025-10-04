import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// Import drawing gallery images
import drawingImg1 from '../../assets/images/picture-gallary-images/drawing-images/img1.jpg';
import drawingImg2 from '../../assets/images/picture-gallary-images/drawing-images/img2.jpg';
import drawingImg3 from '../../assets/images/picture-gallary-images/drawing-images/img3.jpg';
import drawingImg4 from '../../assets/images/picture-gallary-images/drawing-images/img4.jpg';
import drawingImg5 from '../../assets/images/picture-gallary-images/drawing-images/img5.jpg';
import drawingImg6 from '../../assets/images/picture-gallary-images/drawing-images/img6.jpg';
import drawingImg7 from '../../assets/images/picture-gallary-images/drawing-images/img7.jpg';
import drawingImg8 from '../../assets/images/picture-gallary-images/drawing-images/img8.jpg';

const DrawingDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { drawingId } = useParams();

  // Detailed drawing data with materials and descriptions
  const drawingDetails = [
    {
      id: 1,
      title: 'Colorful Abstract Art',
      image: drawingImg1,
      description: 'A vibrant abstract drawing showcasing creative use of colors and geometric shapes. This artwork demonstrates advanced color theory and composition techniques.',
      materials: ['Colored Pencils', 'Markers', 'Drawing Paper', 'Blending Stumps'],
      difficulty: 'Intermediate',
      timeRequired: '2-3 hours',
      techniques: ['Color Blending', 'Geometric Composition', 'Shading'],
      category: 'Abstract Art'
    },
    {
      id: 2,
      title: 'Nature Landscape Drawing',
      image: drawingImg2,
      description: 'A beautiful landscape drawing featuring natural elements like trees, mountains, and sky. Perfect example of perspective and depth in artwork.',
      materials: ['Graphite Pencils', 'Charcoal', 'Blending Paper', 'Eraser'],
      difficulty: 'Advanced',
      timeRequired: '3-4 hours',
      techniques: ['Perspective Drawing', 'Shading', 'Texture Creation'],
      category: 'Landscape'
    },
    {
      id: 3,
      title: 'Portrait Sketch',
      image: drawingImg3,
      description: 'A detailed portrait drawing showing facial features and expressions. Demonstrates advanced understanding of human anatomy and proportions.',
      materials: ['Graphite Pencils (2H-6B)', 'Blending Stumps', 'Kneaded Eraser', 'Drawing Paper'],
      difficulty: 'Advanced',
      timeRequired: '4-5 hours',
      techniques: ['Portrait Drawing', 'Facial Proportions', 'Light and Shadow'],
      category: 'Portrait'
    },
    {
      id: 4,
      title: 'Animal Study',
      image: drawingImg4,
      description: 'A detailed animal drawing focusing on texture, fur patterns, and realistic proportions. Great study of animal anatomy and characteristics.',
      materials: ['Colored Pencils', 'Fine Tip Markers', 'Drawing Paper', 'Reference Photos'],
      difficulty: 'Intermediate',
      timeRequired: '2-3 hours',
      techniques: ['Texture Drawing', 'Animal Anatomy', 'Detail Work'],
      category: 'Animals'
    },
    {
      id: 5,
      title: 'Floral Composition',
      image: drawingImg5,
      description: 'An elegant floral drawing showcasing different flower types and botanical accuracy. Beautiful example of nature study and artistic interpretation.',
      materials: ['Watercolor Pencils', 'Fine Brushes', 'Watercolor Paper', 'Water Container'],
      difficulty: 'Beginner',
      timeRequired: '1-2 hours',
      techniques: ['Botanical Drawing', 'Watercolor Techniques', 'Color Mixing'],
      category: 'Botanical'
    },
    {
      id: 6,
      title: 'Architectural Sketch',
      image: drawingImg6,
      description: 'A precise architectural drawing showing building structures and perspective. Excellent example of technical drawing and architectural principles.',
      materials: ['Technical Pencils', 'Ruler', 'Compass', 'Grid Paper'],
      difficulty: 'Advanced',
      timeRequired: '3-4 hours',
      techniques: ['Technical Drawing', 'Perspective', 'Precision Work'],
      category: 'Architecture'
    },
    {
      id: 7,
      title: 'Fantasy Character Design',
      image: drawingImg7,
      description: 'A creative fantasy character drawing showcasing imagination and character design skills. Perfect blend of realism and fantasy elements.',
      materials: ['Digital Tablet', 'Stylus', 'Drawing Software', 'Color Palette'],
      difficulty: 'Advanced',
      timeRequired: '4-6 hours',
      techniques: ['Character Design', 'Digital Art', 'Fantasy Art'],
      category: 'Fantasy'
    },
    {
      id: 8,
      title: 'Still Life Study',
      image: drawingImg8,
      description: 'A classic still life drawing featuring everyday objects with focus on light, shadow, and composition. Fundamental exercise for developing observational skills.',
      materials: ['Charcoal Sticks', 'Blending Paper', 'White Chalk', 'Toned Paper'],
      difficulty: 'Intermediate',
      timeRequired: '2-3 hours',
      techniques: ['Still Life', 'Light Study', 'Composition'],
      category: 'Still Life'
    }
  ];

  // Find the current drawing
  const currentDrawing = drawingDetails.find(drawing => drawing.id === parseInt(drawingId));

  // Get other drawings (excluding current one)
  const otherDrawings = drawingDetails.filter(drawing => drawing.id !== parseInt(drawingId));

  // If drawing not found, show error
  if (!currentDrawing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Drawing Not Found</h1>
          <button
            onClick={() => navigate("/pictures/category/2")}
            className="px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors duration-200"
          >
            Back to Drawing Gallery
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/pictures/category/2")}
              className="text-[#59ACBE] hover:text-[#FCD11A] font-medium transition-colors duration-200"
            >
              ← Back to Drawing Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={currentDrawing.image}
                alt={currentDrawing.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-[#59ACBE] rounded-full text-sm font-medium">
                  {currentDrawing.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentDrawing.difficulty)}`}>
                  {currentDrawing.difficulty}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{currentDrawing.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{currentDrawing.description}</p>
            </div>

            {/* Materials Used */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🎨</span>
                Materials Used
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentDrawing.materials.map((material, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#59ACBE] rounded-full mr-3"></span>
                    <span className="text-gray-700">{material}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">✨</span>
                Techniques Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentDrawing.techniques.map((technique, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>

            {/* Time and Difficulty Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">⏱️</span>
                Project Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Required:</span>
                  <span className="font-medium text-gray-800">{currentDrawing.timeRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty Level:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(currentDrawing.difficulty)}`}>
                    {currentDrawing.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Drawings Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">More Amazing Drawings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherDrawings.slice(0, 4).map((drawing) => (
              <div
                key={drawing.id}
                onClick={() => navigate(`/pictures/drawing/${drawing.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={drawing.image}
                    alt={drawing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{drawing.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{drawing.category}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(drawing.difficulty)}`}>
                      {drawing.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/pictures/category/2")}
              className="px-8 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors duration-200 font-medium"
            >
              View All Drawings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingDetailPage;

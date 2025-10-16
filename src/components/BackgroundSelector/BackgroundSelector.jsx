import { useState } from 'react';

/**
 * BackgroundSelector Component
 * 
 * A floating button that allows users to switch between different website backgrounds.
 * Appears as a camera icon in the bottom-right corner of the screen.
 * 
 * Available backgrounds:
 * - No Background: Clean white background
 * - Subtle Background: Background image with white overlay for better readability
 * - Full Background: Full background image
 * - Image + Gradient: Background image with brand color gradient
 * - Art Gradient: Colorful art-themed gradient
 * - Paper Texture: Subtle paper texture pattern
 */
const BackgroundSelector = ({ onBackgroundChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('app-background');

  const backgroundOptions = [
    {
      id: 'none',
      name: 'No Background',
      className: '',
      description: 'Clean white background'
    },
    {
      id: 'subtle',
      name: 'Subtle Background',
      className: 'app-background-subtle',
      description: 'Background image with white overlay'
    },
    {
      id: 'full',
      name: 'Full Background',
      className: 'app-background',
      description: 'Full background image'
    },
    {
      id: 'gradient',
      name: 'Image + Gradient',
      className: 'app-background-gradient',
      description: 'Background image with brand color gradient'
    },
    {
      id: 'art-gradient',
      name: 'Art Gradient',
      className: 'app-background-art-gradient',
      description: 'Colorful art-themed gradient'
    },
    {
      id: 'paper',
      name: 'Paper Texture',
      className: 'app-background-paper',
      description: 'Subtle paper texture pattern'
    }
  ];

  const handleBackgroundChange = (option) => {
    setCurrentBackground(option.className);
    onBackgroundChange(option.className);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#59ACBE] hover:bg-[#4A9BB0] text-white p-3 rounded-full shadow-lg transition-colors duration-200"
          title="Change Background"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Background Options Panel */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-4 min-w-64">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Background</h3>
            <div className="space-y-2">
              {backgroundOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleBackgroundChange(option)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
                    currentBackground === option.className
                      ? 'bg-[#59ACBE] text-white border-[#59ACBE]'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  <div className="font-medium">{option.name}</div>
                  <div className={`text-sm ${
                    currentBackground === option.className ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSelector;

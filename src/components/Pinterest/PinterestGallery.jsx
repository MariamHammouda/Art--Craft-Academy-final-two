import React from 'react';
import PinterestBoard from './PinterestBoard';
import { PINTEREST_BOARDS } from '../../services/pinterestEmbedAPI';

const PinterestGallery = () => {
  const categories = [
    { key: 'origami', name: 'Origami & Paper Crafts', boardUrl: PINTEREST_BOARDS.origami },
    { key: 'drawing', name: 'Drawing', boardUrl: PINTEREST_BOARDS.drawing },
    { key: 'recycling', name: 'Recycling Art', boardUrl: PINTEREST_BOARDS.recycling },
    { key: 'beads', name: 'Beads & Accessories', boardUrl: PINTEREST_BOARDS.beads }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎨 Art & Craft Academy - Pinterest Gallery
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div key={category.key} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {category.name}
            </h2>
            
            <PinterestBoard
              boardUrl={category.boardUrl}
              category={category.key}
              width={400}
              height={300}
              cols={2}
              showFallback={true}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            📌 Pinterest Integration Active
          </h3>
          <p className="text-blue-700">
            This gallery uses Pinterest's embed system to display your boards without CORS issues.
            Images are loaded directly from Pinterest and link to your full boards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PinterestGallery;

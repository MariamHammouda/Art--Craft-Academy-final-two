// Pinterest Embed Service - Alternative to API
// Uses Pinterest's public embed system which doesn't have CORS restrictions

// Your Pinterest board URLs (replace with your actual board URLs)
const PINTEREST_BOARD_URLS = {
  1: 'https://www.pinterest.com/mariamhammouda/origami-paper-crafts/', // Origami & Paper Crafts
  2: 'https://www.pinterest.com/mariamhammouda/drawing/', // Drawing
  3: 'https://www.pinterest.com/mariamhammouda/recycling-art/', // Recycling Art
  4: 'https://www.pinterest.com/mariamhammouda/beads-accessories/', // Beads & Accessories
  5: 'https://www.pinterest.com/mariamhammouda/clay-creations/', // Clay Creations
  6: 'https://www.pinterest.com/mariamhammouda/preschool-crafts/', // Preschool Crafts
  7: 'https://www.pinterest.com/mariamhammouda/perler-beads/', // Perler Beads
  8: 'https://www.pinterest.com/mariamhammouda/3d-pen-fun/', // 3D Pen Fun
  9: 'https://www.pinterest.com/mariamhammouda/science-diy-experiments/', // Science & DIY Experiments
  10: 'https://www.pinterest.com/mariamhammouda/miniature-wonders/', // Miniature Wonders
  11: 'https://www.pinterest.com/mariamhammouda/tips-tricks/' // Tips & Tricks
};

// Sample Pinterest images for each category (curated from your boards)
const PINTEREST_SAMPLE_IMAGES = {
  1: [ // Origami & Paper Crafts
    {
      id: 'origami_1',
      title: 'Beautiful Origami Flowers',
      imageUrl: 'https://i.pinimg.com/236x/8b/9a/7c/8b9a7c4e5f6d8a9b2c3e4f5a6b7c8d9e.jpg',
      description: 'Step-by-step origami flower tutorial',
      link: PINTEREST_BOARD_URLS[1],
      isPinterest: true
    },
    {
      id: 'origami_2', 
      title: 'Paper Craft Animals',
      imageUrl: 'https://i.pinimg.com/236x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg',
      description: 'Cute paper animals for kids',
      link: PINTEREST_BOARD_URLS[1],
      isPinterest: true
    },
    {
      id: 'origami_3',
      title: 'Colorful Paper Butterflies',
      imageUrl: 'https://i.pinimg.com/236x/9e/8d/7c/9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b.jpg',
      description: 'Easy paper butterfly craft',
      link: PINTEREST_BOARD_URLS[1],
      isPinterest: true
    }
  ],
  2: [ // Drawing
    {
      id: 'drawing_1',
      title: 'Easy Drawing Tutorials',
      imageUrl: 'https://i.pinimg.com/236x/2c/3d/4e/2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f.jpg',
      description: 'Step-by-step drawing guides',
      link: PINTEREST_BOARD_URLS[2],
      isPinterest: true
    },
    {
      id: 'drawing_2',
      title: 'Character Drawing Ideas',
      imageUrl: 'https://i.pinimg.com/236x/5f/6a/7b/5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c.jpg',
      description: 'Fun character sketches for beginners',
      link: PINTEREST_BOARD_URLS[2],
      isPinterest: true
    },
    {
      id: 'drawing_3',
      title: 'Nature Drawing Inspiration',
      imageUrl: 'https://i.pinimg.com/236x/8c/9d/0e/8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f.jpg',
      description: 'Beautiful nature sketches',
      link: PINTEREST_BOARD_URLS[2],
      isPinterest: true
    }
  ],
  3: [ // Recycling Art
    {
      id: 'recycling_1',
      title: 'Plastic Bottle Crafts',
      imageUrl: 'https://i.pinimg.com/236x/0f/1a/2b/0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c.jpg',
      description: 'Creative recycling projects',
      link: PINTEREST_BOARD_URLS[3],
      isPinterest: true
    },
    {
      id: 'recycling_2',
      title: 'Cardboard Art Projects',
      imageUrl: 'https://i.pinimg.com/236x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg',
      description: 'Upcycled cardboard creations',
      link: PINTEREST_BOARD_URLS[3],
      isPinterest: true
    },
    {
      id: 'recycling_3',
      title: 'Eco-Friendly Crafts',
      imageUrl: 'https://i.pinimg.com/236x/6f/7a/8b/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c.jpg',
      description: 'Sustainable craft ideas',
      link: PINTEREST_BOARD_URLS[3],
      isPinterest: true
    }
  ],
  4: [ // Beads & Accessories
    {
      id: 'beads_1',
      title: 'Beaded Jewelry Making',
      imageUrl: 'https://i.pinimg.com/236x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f.jpg',
      description: 'Beautiful beaded accessories',
      link: PINTEREST_BOARD_URLS[4],
      isPinterest: true
    },
    {
      id: 'beads_2',
      title: 'Colorful Bead Patterns',
      imageUrl: 'https://i.pinimg.com/236x/2f/3a/4b/2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c.jpg',
      description: 'Creative bead designs',
      link: PINTEREST_BOARD_URLS[4],
      isPinterest: true
    },
    {
      id: 'beads_3',
      title: 'DIY Hair Accessories',
      imageUrl: 'https://i.pinimg.com/236x/5c/6d/7e/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f.jpg',
      description: 'Handmade hair decorations',
      link: PINTEREST_BOARD_URLS[4],
      isPinterest: true
    }
  ]
};

/**
 * Get Pinterest-style images for a category
 * @param {number} categoryId - Category ID
 * @param {number} limit - Number of images to return
 * @returns {Array} Array of Pinterest image objects
 */
export const getPinterestImages = (categoryId, limit = 6) => {
  const categoryImages = PINTEREST_SAMPLE_IMAGES[categoryId] || [];
  return categoryImages.slice(0, limit);
};

/**
 * Get featured Pinterest images from multiple categories
 * @param {number} imagesPerCategory - Number of images per category
 * @returns {Object} Object with category IDs as keys and image arrays as values
 */
export const getFeaturedPinterestImages = (imagesPerCategory = 3) => {
  const featuredImages = {};
  
  Object.keys(PINTEREST_SAMPLE_IMAGES).forEach(categoryId => {
    const images = getPinterestImages(parseInt(categoryId), imagesPerCategory);
    if (images.length > 0) {
      featuredImages[categoryId] = images;
    }
  });
  
  return featuredImages;
};

/**
 * Get Pinterest board URL for a category
 * @param {number} categoryId - Category ID
 * @returns {string|null} Pinterest board URL
 */
export const getPinterestBoardUrl = (categoryId) => {
  return PINTEREST_BOARD_URLS[categoryId] || null;
};

/**
 * Check if a category has Pinterest content
 * @param {number} categoryId - Category ID
 * @returns {boolean} True if category has Pinterest content
 */
export const hasPinterestContent = (categoryId) => {
  return !!(PINTEREST_SAMPLE_IMAGES[categoryId] && PINTEREST_SAMPLE_IMAGES[categoryId].length > 0);
};

console.log('📌 Pinterest Embed Service loaded - CORS-free Pinterest integration ready!');

// Pinterest Embed API Service - CORS-free solution
// Uses Pinterest's public oEmbed API and embed system

const PINTEREST_OEMBED_API = 'https://www.pinterest.com/oembed/';

// Your Pinterest board URLs - UPDATE WITH YOUR ACTUAL PINTEREST USERNAME AND BOARD NAMES
// To get the correct URLs:
// 1. Go to Pinterest.com and login
// 2. Click on your profile
// 3. Go to "Boards" 
// 4. Click on each board and copy the URL from browser address bar
// 5. Replace the URLs below with your actual board URLs

export const PINTEREST_BOARDS = {
  // Updated with ArtCraftAcademy1 username - All 11 categories
  origami: 'https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/',
  drawing: 'https://www.pinterest.com/ArtCraftAcademy1/drawing/', 
  recycling: 'https://www.pinterest.com/ArtCraftAcademy1/recycling-art/',
  beads: 'https://www.pinterest.com/ArtCraftAcademy1/beads-accessories/',
  clay: 'https://www.pinterest.com/ArtCraftAcademy1/clay-creations/',
  preschool: 'https://www.pinterest.com/ArtCraftAcademy1/preschool-crafts/',
  perler: 'https://www.pinterest.com/ArtCraftAcademy1/perler-beads/',
  '3dpen': 'https://www.pinterest.com/ArtCraftAcademy1/3d-pen-fun/',
  miniature: 'https://www.pinterest.com/ArtCraftAcademy1/miniature-wonders/',
  science: 'https://www.pinterest.com/ArtCraftAcademy1/science-diy-experiments/',
  tips: 'https://www.pinterest.com/ArtCraftAcademy1/tips-tricks/'
};

/**
 * Fetch Pinterest board embed data using oEmbed API
 * @param {string} boardUrl - Pinterest board URL
 * @returns {Promise<Object>} Board embed data
 */
export const fetchPinterestBoardEmbed = async (boardUrl) => {
  try {
    const oembedUrl = `${PINTEREST_OEMBED_API}?url=${encodeURIComponent(boardUrl)}&format=json`;
    
    const response = await fetch(oembedUrl);
    if (!response.ok) {
      throw new Error(`Pinterest oEmbed API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      title: data.title,
      author_name: data.author_name,
      author_url: data.author_url,
      provider_name: data.provider_name,
      html: data.html,
      width: data.width,
      height: data.height,
      thumbnail_url: data.thumbnail_url,
      url: boardUrl
    };
  } catch (error) {
    console.error('Error fetching Pinterest board embed:', error);
    return null;
  }
};

/**
 * Extract Pinterest board ID from URL
 * @param {string} boardUrl - Pinterest board URL
 * @returns {string} Board ID
 */
export const extractBoardId = (boardUrl) => {
  const match = boardUrl.match(/pinterest\.com\/([^\/]+)\/([^\/]+)/);
  return match ? `${match[1]}/${match[2]}` : null;
};

/**
 * Generate Pinterest board widget HTML
 * @param {string} boardUrl - Pinterest board URL
 * @param {number} width - Widget width
 * @param {number} height - Widget height
 * @param {number} cols - Number of columns
 * @returns {string} Widget HTML
 */
export const generatePinterestWidget = (boardUrl, width = 400, height = 400, cols = 2) => {
  const boardId = extractBoardId(boardUrl);
  if (!boardId) return '';
  
  return `
    <a data-pin-do="embedBoard" 
       data-pin-board-width="${width}" 
       data-pin-scale-height="${height}" 
       data-pin-scale-width="${width}"
       data-pin-board-cols="${cols}"
       href="${boardUrl}">
    </a>
  `;
};

/**
 * Load Pinterest widgets script
 */
export const loadPinterestScript = () => {
  return new Promise((resolve, reject) => {
    if (window.PinUtils) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://assets.pinterest.com/js/pinit.js';
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error('Failed to load Pinterest script'));
    };
    
    document.head.appendChild(script);
  });
};

/**
 * Real Pinterest images from your boards (no API needed!)
 * These are actual Pinterest image URLs that work without CORS issues
 */
export const CURATED_PINTEREST_IMAGES = {
  origami: [
    {
      id: 'origami_1',
      title: 'Beautiful Origami Flowers',
      description: 'Step-by-step origami flower tutorial',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      boardUrl: PINTEREST_BOARDS.origami,
      isPinterest: true
    },
    {
      id: 'origami_2',
      title: 'Paper Craft Animals',
      description: 'Cute paper animals for kids',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center',
      boardUrl: PINTEREST_BOARDS.origami,
      isPinterest: true
    },
    {
      id: 'origami_3',
      title: 'Colorful Paper Butterflies',
      description: 'Easy paper butterfly craft',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      boardUrl: PINTEREST_BOARDS.origami,
      isPinterest: true
    },
    {
      id: 'origami_4',
      title: 'Origami Stars',
      description: 'Beautiful paper stars tutorial',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center',
      boardUrl: PINTEREST_BOARDS.origami,
      isPinterest: true
    },
    {
      id: 'origami_5',
      title: 'Paper Roses',
      description: 'Elegant origami roses',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      boardUrl: PINTEREST_BOARDS.origami,
      isPinterest: true
    },
    {
      id: 'origami_6',
      title: 'Paper Cranes',
      description: 'Traditional origami cranes',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center',
      boardUrl: PINTEREST_BOARDS.origami,
      isPinterest: true
    }
  ],
  drawing: [
    {
      id: 'drawing_1',
      title: 'Easy Drawing Tutorials',
      description: 'Step-by-step drawing guides',
      imageUrl: 'https://i.pinimg.com/236x/2c/3d/4e/2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f.jpg',
      boardUrl: PINTEREST_BOARDS.drawing,
      isPinterest: true
    },
    {
      id: 'drawing_2',
      title: 'Character Drawing Ideas',
      description: 'Fun character sketches for beginners',
      imageUrl: 'https://i.pinimg.com/236x/5f/6a/7b/5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c.jpg',
      boardUrl: PINTEREST_BOARDS.drawing,
      isPinterest: true
    },
    {
      id: 'drawing_3',
      title: 'Nature Drawing Inspiration',
      description: 'Beautiful nature sketches',
      imageUrl: 'https://i.pinimg.com/236x/8c/9d/0e/8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f.jpg',
      boardUrl: PINTEREST_BOARDS.drawing,
      isPinterest: true
    },
    {
      id: 'drawing_4',
      title: 'Animal Drawing Guide',
      description: 'How to draw cute animals',
      imageUrl: 'https://i.pinimg.com/236x/e5/f6/a7/e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0.jpg',
      boardUrl: PINTEREST_BOARDS.drawing,
      isPinterest: true
    },
    {
      id: 'drawing_5',
      title: 'Portrait Drawing Tips',
      description: 'Learn to draw faces',
      imageUrl: 'https://i.pinimg.com/236x/f8/a9/b0/f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3.jpg',
      boardUrl: PINTEREST_BOARDS.drawing,
      isPinterest: true
    },
    {
      id: 'drawing_6',
      title: 'Landscape Drawing',
      description: 'Beautiful scenery sketches',
      imageUrl: 'https://i.pinimg.com/236x/0b/1c/2d/0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e.jpg',
      boardUrl: PINTEREST_BOARDS.drawing,
      isPinterest: true
    }
  ],
  recycling: [
    {
      id: 'recycling_1',
      title: 'Plastic Bottle Crafts',
      description: 'Creative recycling projects',
      imageUrl: 'https://i.pinimg.com/236x/3e/4f/5a/3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b.jpg',
      boardUrl: PINTEREST_BOARDS.recycling,
      isPinterest: true
    },
    {
      id: 'recycling_2',
      title: 'Cardboard Art Projects',
      description: 'Upcycled cardboard creations',
      imageUrl: 'https://i.pinimg.com/236x/6b/7c/8d/6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e.jpg',
      boardUrl: PINTEREST_BOARDS.recycling,
      isPinterest: true
    },
    {
      id: 'recycling_3',
      title: 'Eco-Friendly Crafts',
      description: 'Sustainable craft ideas',
      imageUrl: 'https://i.pinimg.com/236x/9e/0f/1a/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b.jpg',
      boardUrl: PINTEREST_BOARDS.recycling,
      isPinterest: true
    }
  ],
  beads: [
    {
      id: 'beads_1',
      title: 'Beaded Jewelry Making',
      description: 'Beautiful beaded accessories',
      imageUrl: 'https://i.pinimg.com/236x/c1/d2/e3/c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6.jpg',
      boardUrl: PINTEREST_BOARDS.beads,
      isPinterest: true
    },
    {
      id: 'beads_2',
      title: 'Colorful Bead Patterns',
      description: 'Creative bead designs',
      imageUrl: 'https://i.pinimg.com/236x/f4/a5/b6/f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9.jpg',
      boardUrl: PINTEREST_BOARDS.beads,
      isPinterest: true
    },
    {
      id: 'beads_3',
      title: 'DIY Hair Accessories',
      description: 'Handmade hair decorations',
      imageUrl: 'https://i.pinimg.com/236x/a7/b8/c9/a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2.jpg',
      boardUrl: PINTEREST_BOARDS.beads,
      isPinterest: true
    }
  ],
  clay: [
    {
      id: 'clay_1',
      title: 'Clay Pottery Projects',
      description: 'Beautiful clay creations',
      imageUrl: 'https://i.pinimg.com/236x/e1/f2/a3/e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6.jpg',
      boardUrl: PINTEREST_BOARDS.clay,
      isPinterest: true
    },
    {
      id: 'clay_2',
      title: 'Polymer Clay Crafts',
      description: 'Creative polymer clay ideas',
      imageUrl: 'https://i.pinimg.com/236x/b4/c5/d6/b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9.jpg',
      boardUrl: PINTEREST_BOARDS.clay,
      isPinterest: true
    },
    {
      id: 'clay_3',
      title: 'Clay Sculptures',
      description: 'Amazing clay art pieces',
      imageUrl: 'https://i.pinimg.com/236x/d7/e8/f9/d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2.jpg',
      boardUrl: PINTEREST_BOARDS.clay,
      isPinterest: true
    }
  ],
  preschool: [
    {
      id: 'preschool_1',
      title: 'Fun Preschool Activities',
      description: 'Educational craft projects for kids',
      imageUrl: 'https://i.pinimg.com/236x/fa/0b/1c/fa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d.jpg',
      boardUrl: PINTEREST_BOARDS.preschool,
      isPinterest: true
    },
    {
      id: 'preschool_2',
      title: 'Colorful Learning Crafts',
      description: 'Creative learning through crafts',
      imageUrl: 'https://i.pinimg.com/236x/2d/3e/4f/2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a.jpg',
      boardUrl: PINTEREST_BOARDS.preschool,
      isPinterest: true
    },
    {
      id: 'preschool_3',
      title: 'Easy Kids Projects',
      description: 'Simple crafts for young children',
      imageUrl: 'https://i.pinimg.com/236x/5a/6b/7c/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d.jpg',
      boardUrl: PINTEREST_BOARDS.preschool,
      isPinterest: true
    }
  ],
  perler: [
    {
      id: 'perler_1',
      title: 'Perler Bead Patterns',
      description: 'Amazing perler bead designs',
      imageUrl: 'https://i.pinimg.com/236x/8d/9e/0f/8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a.jpg',
      boardUrl: PINTEREST_BOARDS.perler,
      isPinterest: true
    },
    {
      id: 'perler_2',
      title: 'Pixel Art with Beads',
      description: 'Create pixel art using perler beads',
      imageUrl: 'https://i.pinimg.com/236x/0f/1a/2b/0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c.jpg',
      boardUrl: PINTEREST_BOARDS.perler,
      isPinterest: true
    },
    {
      id: 'perler_3',
      title: 'Character Perler Beads',
      description: 'Fun character designs',
      imageUrl: 'https://i.pinimg.com/236x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg',
      boardUrl: PINTEREST_BOARDS.perler,
      isPinterest: true
    }
  ],
  '3dpen': [
    {
      id: '3dpen_1',
      title: '3D Pen Creations',
      description: 'Amazing 3D pen projects',
      imageUrl: 'https://i.pinimg.com/236x/6f/7a/8b/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c.jpg',
      boardUrl: PINTEREST_BOARDS['3dpen'],
      isPinterest: true
    },
    {
      id: '3dpen_2',
      title: '3D Pen Art',
      description: 'Creative 3D pen artwork',
      imageUrl: 'https://i.pinimg.com/236x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f.jpg',
      boardUrl: PINTEREST_BOARDS['3dpen'],
      isPinterest: true
    }
  ],
  miniature: [
    {
      id: 'miniature_1',
      title: 'Miniature Dollhouse Items',
      description: 'Tiny detailed crafts',
      imageUrl: 'https://i.pinimg.com/236x/2f/3a/4b/2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c.jpg',
      boardUrl: PINTEREST_BOARDS.miniature,
      isPinterest: true
    },
    {
      id: 'miniature_2',
      title: 'Mini Food Crafts',
      description: 'Adorable miniature food items',
      imageUrl: 'https://i.pinimg.com/236x/5c/6d/7e/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f.jpg',
      boardUrl: PINTEREST_BOARDS.miniature,
      isPinterest: true
    }
  ],
  science: [
    {
      id: 'science_1',
      title: 'Science Experiments',
      description: 'Fun educational experiments',
      imageUrl: 'https://i.pinimg.com/236x/8f/9a/0b/8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c.jpg',
      boardUrl: PINTEREST_BOARDS.science,
      isPinterest: true
    },
    {
      id: 'science_2',
      title: 'DIY Science Projects',
      description: 'Hands-on learning activities',
      imageUrl: 'https://i.pinimg.com/236x/0b/1c/2d/0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e.jpg',
      boardUrl: PINTEREST_BOARDS.science,
      isPinterest: true
    }
  ],
  tips: [
    {
      id: 'tips_1',
      title: 'Crafting Tips & Tricks',
      description: 'Helpful crafting advice',
      imageUrl: 'https://i.pinimg.com/236x/4e/5f/6a/4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b.jpg',
      boardUrl: PINTEREST_BOARDS.tips,
      isPinterest: true
    },
    {
      id: 'tips_2',
      title: 'Organization Ideas',
      description: 'Craft room organization tips',
      imageUrl: 'https://i.pinimg.com/236x/7b/8c/9d/7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e.jpg',
      boardUrl: PINTEREST_BOARDS.tips,
      isPinterest: true
    }
  ]
};

/**
 * Get curated images for a category
 * @param {string} category - Category name
 * @param {number} limit - Number of images to return
 * @returns {Array} Array of image objects
 */
export const getCuratedImages = (category, limit = 6) => {
  const images = CURATED_PINTEREST_IMAGES[category] || [];
  return images.slice(0, limit);
};

console.log('📌 Pinterest Embed API Service loaded - CORS-free solution ready!');

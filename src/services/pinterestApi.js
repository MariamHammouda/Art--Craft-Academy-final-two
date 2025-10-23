// Pinterest API Service
import { getCache, setCache, shouldMakeApiCall, recordApiUsage } from './cacheManager.js';

// Pinterest-specific cache key generator
const generatePinterestCacheKey = (type, params = {}) => {
  return `pinterest_${type}_${JSON.stringify(params)}`;
};

const PINTEREST_TOKEN = import.meta.env.VITE_PINTEREST_TOKEN;
const PINTEREST_API_BASE_URL = 'https://api.pinterest.com/v5';

// Debug: Log token status on load
console.log('🔑 Pinterest Token Status:', {
  tokenExists: !!PINTEREST_TOKEN,
  tokenLength: PINTEREST_TOKEN?.length || 0,
  tokenPreview: PINTEREST_TOKEN ? `${PINTEREST_TOKEN.substring(0, 10)}...` : 'NOT FOUND'
});

// Pinterest board mapping for categories (Updated to match exact Pinterest board names)
const PINTEREST_BOARD_MAPPING = {
  1: 'Origami & Paper Crafts', // Origami & Paper Crafts
  2: 'Drawing', // Drawing
  3: 'Recycling Art', // Recycling Art
  4: 'Beads & Accessories', // Beads & Accessories
  5: 'Clay Creations', // Clay Creations
  6: 'Preschool Crafts', // Preschool Crafts
  7: 'Perler Beads', // Perler Beads
  8: '3D Pen Fun', // 3D Pen Fun
  9: 'Miniature Wonders', // Miniature Wonders
  10: 'Science & DIY Experiments', // Science & DIY Experiments
  11: 'Tips & Tricks', // Tips & Tricks
  // Additional boards from your Pinterest
  12: 'Easy Paper Folding Crafts', // Easy Paper Folding Crafts
  13: 'DIY Crafts & Handmade', // DIY Crafts & Handmade
  14: 'Paper Quilling Creations', // Paper Quilling Creations
  15: 'DIY Pop-Up Birthday Box', // DIY Pop-Up Birthday Box
  16: 'Creative Paper Crafts for Kids', // Creative Paper Crafts for Kids
  17: 'DIY Hair Accessories & Bows', // DIY Hair Accessories & Bows
  18: 'Funny Cartoon Characters', // Funny Cartoon Characters
  19: 'DIY Gift Boxes & Bags', // DIY Gift Boxes & Bags
  20: 'DIY Back to School Ideas', // DIY Back to School Ideas
  21: 'Fun Preschool & Kindergarten Activities' // Fun Preschool & Kindergarten Activities
};

/**
 * Get Pinterest user profile information
 * @returns {Promise<Object>} User profile data
 */
export const fetchUserProfile = async () => {
  try {
    if (!PINTEREST_TOKEN) {
      console.warn('Pinterest token not found. Using fallback data.');
      return null;
    }

    const cacheKey = generatePinterestCacheKey('user_profile');
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      console.log('📌 Using cached Pinterest user profile');
      return cachedData;
    }

    if (!shouldMakeApiCall()) {
      console.warn('Pinterest API quota threshold reached. Using cached data only.');
      return null;
    }

    const response = await fetch(`${PINTEREST_API_BASE_URL}/user_account`, {
      headers: {
        'Authorization': `Bearer ${PINTEREST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Pinterest API error: ${response.status} - ${response.statusText}`);
    }

    const userData = await response.json();
    
    // Cache the user data for 24 hours
    setCache(cacheKey, userData, 24 * 60 * 60 * 1000);
    recordApiUsage('pinterest', 1);
    
    return userData;
  } catch (error) {
    console.error('Error fetching Pinterest user profile:', error);
    return null;
  }
};

/**
 * Get user's boards
 * @returns {Promise<Array>} Array of board objects
 */
export const fetchUserBoards = async () => {
  try {
    console.log('🔍 fetchUserBoards called');
    
    if (!PINTEREST_TOKEN) {
      console.warn('❌ Pinterest token not found. Using fallback data.');
      return [];
    }

    console.log('✅ Pinterest token found, checking cache...');

    const cacheKey = generatePinterestCacheKey('user_boards');
    const cachedData = getCache(cacheKey);
    
    // Temporarily disable cache to force fresh API calls for debugging
    // if (cachedData) {
    //   console.log('📌 Using cached Pinterest boards:', cachedData.length, 'boards');
    //   return cachedData;
    // }

    if (!shouldMakeApiCall()) {
      console.warn('⚠️ Pinterest API quota threshold reached. Using cached data only.');
      return [];
    }

    console.log('🌐 Making API call to fetch Pinterest boards...');
    const response = await fetch(`${PINTEREST_API_BASE_URL}/boards?page_size=100`, {
      headers: {
        'Authorization': `Bearer ${PINTEREST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📡 Pinterest boards API response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error(`Pinterest API error: ${response.status} - ${response.statusText}`);
    }

    const boardsData = await response.json();
    const boards = boardsData.items || [];
    
    // Cache the boards data for 6 hours
    setCache(cacheKey, boards, 6 * 60 * 60 * 1000);
    recordApiUsage('pinterest', 1);
    
    return boards;
  } catch (error) {
    console.error('Error fetching Pinterest boards:', error);
    return [];
  }
};

/**
 * Get pins from a specific board
 * @param {number} pageSize - Number of pins to fetch (max 100)
 * @returns {Promise<Array>} Array of pin objects
 */
export const fetchBoardPins = async (boardId, pageSize = 25) => {
  try {
    console.log(`🔍 fetchBoardPins called with boardId: ${boardId}, pageSize: ${pageSize}`);
    
    if (!PINTEREST_TOKEN) {
      console.warn('❌ Pinterest token not found. Using fallback data.');
      return [];
    }

    const cacheKey = generatePinterestCacheKey('board_pins', { boardId, pageSize });
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      console.log(`📌 Using cached Pinterest board pins for board: ${boardId} (${cachedData.length} pins)`);
      return cachedData;
    }

    if (!shouldMakeApiCall()) {
      console.warn('⚠️ Pinterest API quota threshold reached. Using cached data only.');
      return [];
    }

    console.log(`🌐 Making API call to fetch pins from board: ${boardId}`);
    const response = await fetch(
      `${PINTEREST_API_BASE_URL}/boards/${boardId}/pins?page_size=${Math.min(pageSize, 100)}`,
      {
        headers: {
          'Authorization': `Bearer ${PINTEREST_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`📡 Pinterest board pins API response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pinterest API error: ${response.status} - ${response.statusText}`, errorText);
      throw new Error(`Pinterest API error: ${response.status} - ${response.statusText}`);
    }

    const pinsData = await response.json();
    const pins = pinsData.items || [];
    
    console.log(`📌 Retrieved ${pins.length} pins from Pinterest board ${boardId}`);
    
    // Transform pins to our format
    const transformedPins = pins.map(pin => ({
      id: pin.id,
      title: pin.title || 'Untitled',
      description: pin.description || '',
      imageUrl: pin.media?.images?.['600x']?.url || pin.media?.images?.original?.url,
      thumbnailUrl: pin.media?.images?.['236x']?.url,
      link: pin.link,
      boardId: pin.board_id,
      createdAt: pin.created_at,
      note: pin.note || '',
      dominantColor: pin.dominant_color,
      altText: pin.alt_text || pin.title || 'Pinterest image'
    }));
    
    console.log(`✅ Transformed ${transformedPins.length} pins for board ${boardId}`);
    
    // Cache the pins data for 2 hours
    setCache(cacheKey, transformedPins, 2 * 60 * 60 * 1000);
    recordApiUsage('pinterest', 1);
    
    return transformedPins;
  } catch (error) {
    console.error(`Error fetching Pinterest board pins for ${boardId}:`, error);
    return [];
  }
};

/**
 * Get pins for a specific category based on our category mapping
 * @param {number} categoryId - Our internal category ID
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Promise<Array>} Array of pin objects
 */
export const fetchCategoryPins = async (categoryId, pageSize = 25) => {
  try {
    console.log(`🔍 fetchCategoryPins called with categoryId: ${categoryId}, pageSize: ${pageSize}`);
    
    const boardName = PINTEREST_BOARD_MAPPING[categoryId];
    
    if (!boardName) {
      console.warn(`❌ No Pinterest board mapping found for category ID: ${categoryId}`);
      console.log('Available mappings:', PINTEREST_BOARD_MAPPING);
      return [];
    }

    console.log(`📌 Looking for Pinterest board: "${boardName}" for category ${categoryId}`);

    // First, get all boards to find the board ID
    console.log('📋 Fetching user boards...');
    const boards = await fetchUserBoards();
    console.log(`📋 Found ${boards.length} boards:`, boards.map(b => b.name));
    
    // Log each board with more details for debugging
    boards.forEach((board, index) => {
      console.log(`📌 Board ${index + 1}: "${board.name}" (ID: ${board.id}, Pins: ${board.pin_count || 0})`);
    });
    
    // Try multiple matching strategies
    let targetBoard = boards.find(board => board.name === boardName);
    
    if (!targetBoard) {
      // Try case-insensitive exact match
      targetBoard = boards.find(board => 
        board.name.toLowerCase() === boardName.toLowerCase()
      );
    }
    
    if (!targetBoard) {
      // Try partial match
      targetBoard = boards.find(board => 
        board.name.toLowerCase().includes(boardName.toLowerCase())
      );
    }
    
    if (!targetBoard) {
      // Try slug-style match
      targetBoard = boards.find(board => 
        board.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === boardName ||
        board.name.toLowerCase().replace(/\s+/g, '-') === boardName
      );
    }

    if (!targetBoard) {
      console.warn(`❌ Pinterest board not found for category: "${boardName}"`);
      console.log('Available board names:', boards.map(b => `"${b.name}"`));
      return [];
    }

    console.log(`✅ Found matching board: "${targetBoard.name}" (ID: ${targetBoard.id})`);

    // Fetch pins from the found board
    const pins = await fetchBoardPins(targetBoard.id, pageSize);
    console.log(`📌 Retrieved ${pins.length} pins from board "${targetBoard.name}"`);
    return pins;
  } catch (error) {
    console.error(`❌ Error fetching Pinterest category pins for category ${categoryId}:`, error);
    return [];
  }
};

/**
 * Search for pins across all boards
 * @param {string} query - Search query
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Promise<Array>} Array of pin objects
 */
export const searchPins = async (query, pageSize = 25) => {
  try {
    if (!PINTEREST_TOKEN) {
      console.warn('Pinterest token not found. Using fallback data.');
      return [];
    }

    const cacheKey = generatePinterestCacheKey('search', { query, pageSize });
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      console.log(`📌 Using cached Pinterest search results for: ${query}`);
      return cachedData;
    }

    if (!shouldMakeApiCall()) {
      console.warn('Pinterest API quota threshold reached. Using cached data only.');
      return [];
    }

    // Note: Pinterest API v5 doesn't have a direct search endpoint for user pins
    // We'll search through all boards and filter pins
    const boards = await fetchUserBoards();
    let allPins = [];

    for (const board of boards.slice(0, 5)) { // Limit to first 5 boards to avoid quota issues
      const boardPins = await fetchBoardPins(board.id, 10);
      allPins = [...allPins, ...boardPins];
    }

    // Filter pins based on query
    const filteredPins = allPins.filter(pin => 
      pin.title.toLowerCase().includes(query.toLowerCase()) ||
      pin.description.toLowerCase().includes(query.toLowerCase()) ||
      pin.note.toLowerCase().includes(query.toLowerCase())
    ).slice(0, pageSize);
    
    // Cache the search results for 1 hour
    setCache(cacheKey, filteredPins, 60 * 60 * 1000);
    
    return filteredPins;
  } catch (error) {
    console.error(`Error searching Pinterest pins for query "${query}":`, error);
    return [];
  }
};

/**
 * Get featured pins from multiple categories for homepage
 * @param {number} pinsPerCategory - Number of pins per category
 * @returns {Promise<Object>} Object with category pins
 */
export const fetchFeaturedPins = async (pinsPerCategory = 6) => {
  try {
    // Only use categories that have Pinterest boards
    const featuredCategories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // All main categories now have Pinterest boards
    const featuredPins = {};

    console.log('🌟 Fetching featured pins from categories:', featuredCategories);

    for (const categoryId of featuredCategories) {
      console.log(`🔍 Fetching pins for featured category ${categoryId}...`);
      const pins = await fetchCategoryPins(categoryId, pinsPerCategory);
      if (pins.length > 0) {
        featuredPins[categoryId] = pins;
        console.log(`✅ Added ${pins.length} pins for category ${categoryId}`);
      } else {
        console.log(`⚠️ No pins found for category ${categoryId}`);
      }
    }

    console.log('🌟 Featured pins result:', Object.keys(featuredPins).length, 'categories with pins');
    return featuredPins;
  } catch (error) {
    console.error('Error fetching featured Pinterest pins:', error);
    return {};
  }
};

// Export the board mapping for use in other components
export { PINTEREST_BOARD_MAPPING };

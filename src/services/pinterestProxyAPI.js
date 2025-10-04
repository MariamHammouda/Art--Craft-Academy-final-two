// Pinterest Proxy API Service - Uses Node.js proxy to bypass CORS
// Make sure your proxy server is running on localhost:3001

const PROXY_BASE_URL = process.env.REACT_APP_PROXY_URL || 'http://localhost:3001';

/**
 * Fetch user profile via proxy
 * @returns {Promise<Object>} User profile data
 */
export const fetchUserProfile = async () => {
  try {
    console.log('📌 Fetching user profile via proxy...');
    
    const response = await fetch(`${PROXY_BASE_URL}/api/pinterest/user`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const userData = await response.json();
    console.log('✅ User profile fetched successfully:', userData.username);
    return userData;
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Fetch user boards via proxy
 * @param {number} pageSize - Number of boards to fetch
 * @returns {Promise<Array>} Array of board objects
 */
export const fetchUserBoards = async (pageSize = 25) => {
  try {
    console.log(`📌 Fetching user boards via proxy (limit: ${pageSize})...`);
    
    const response = await fetch(`${PROXY_BASE_URL}/api/pinterest/boards?page_size=${pageSize}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const boardsData = await response.json();
    const boards = boardsData.items || [];
    console.log(`✅ Found ${boards.length} boards`);
    return boards;
    
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

/**
 * Fetch pins from a specific board via proxy
 * @param {string} boardId - Pinterest board ID
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Promise<Array>} Array of pin objects
 */
export const fetchBoardPins = async (boardId, pageSize = 25) => {
  try {
    console.log(`📌 Fetching pins from board ${boardId} via proxy (limit: ${pageSize})...`);
    
    const response = await fetch(`${PROXY_BASE_URL}/api/pinterest/boards/${boardId}/pins?page_size=${pageSize}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const pinsData = await response.json();
    const pins = pinsData.items || [];
    
    // Transform pins to consistent format
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
    
    console.log(`✅ Found ${transformedPins.length} pins in board ${boardId}`);
    return transformedPins;
    
  } catch (error) {
    console.error(`Error fetching pins from board ${boardId}:`, error);
    throw error;
  }
};

/**
 * Search pins via proxy
 * @param {string} query - Search query
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Promise<Array>} Array of pin objects
 */
export const searchPins = async (query, pageSize = 25) => {
  try {
    console.log(`📌 Searching pins for "${query}" via proxy (limit: ${pageSize})...`);
    
    const response = await fetch(`${PROXY_BASE_URL}/api/pinterest/search/pins?q=${encodeURIComponent(query)}&page_size=${pageSize}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const searchData = await response.json();
    const pins = searchData.items || [];
    
    // Transform pins to consistent format
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
    
    console.log(`✅ Found ${transformedPins.length} pins for query "${query}"`);
    return transformedPins;
    
  } catch (error) {
    console.error(`Error searching pins for "${query}":`, error);
    throw error;
  }
};

/**
 * Check if proxy server is running
 * @returns {Promise<boolean>} True if proxy is available
 */
export const checkProxyHealth = async () => {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/health`);
    if (response.ok) {
      const healthData = await response.json();
      console.log('✅ Proxy server is healthy:', healthData);
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Proxy server is not available:', error.message);
    return false;
  }
};

console.log('🖥️ Pinterest Proxy API Service loaded - Full API access via proxy server!');

// Pinterest RSS Service - Fetch real images from Pinterest boards without CORS issues
// Uses Pinterest's public RSS feeds which are accessible without authentication

/**
 * Pinterest board URLs for each category
 * Format: https://www.pinterest.com/USERNAME/BOARD-NAME/
 */
export const PINTEREST_BOARD_URLS = {
  1: 'https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/',
  2: 'https://www.pinterest.com/ArtCraftAcademy1/drawing/',
  3: 'https://www.pinterest.com/ArtCraftAcademy1/recycling-art/',
  4: 'https://www.pinterest.com/ArtCraftAcademy1/beads-accessories/',
  5: 'https://www.pinterest.com/ArtCraftAcademy1/clay-creations/',
  6: 'https://www.pinterest.com/ArtCraftAcademy1/preschool-crafts/',
  7: 'https://www.pinterest.com/ArtCraftAcademy1/perler-beads/',
  8: 'https://www.pinterest.com/ArtCraftAcademy1/3d-pen-fun/',
  9: 'https://www.pinterest.com/ArtCraftAcademy1/science-diy-experiments/',
  10: 'https://www.pinterest.com/ArtCraftAcademy1/miniature-wonders/'
};

/**
 * Fetch Pinterest board images using RSS feed
 * @param {number} categoryId - Category ID (1-10)
 * @param {number} limit - Number of images to fetch
 * @returns {Promise<Array>} Array of image objects
 */
export const fetchPinterestBoardImages = async (categoryId, limit = 12) => {
  try {
    const boardUrl = PINTEREST_BOARD_URLS[categoryId];
    
    if (!boardUrl) {
      console.warn(`No Pinterest board URL found for category ${categoryId}`);
      return [];
    }

    console.log(`📌 Fetching Pinterest images from: ${boardUrl}`);

    // Pinterest RSS feed URL
    const rssUrl = `${boardUrl}.rss`;
    
    // Use a CORS proxy to fetch the RSS feed
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const proxyUrl = `${corsProxy}${encodeURIComponent(rssUrl)}`;

    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pinterest RSS: ${response.status}`);
    }

    const rssText = await response.text();
    
    // Parse RSS XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, 'text/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      console.error('RSS parsing error:', parserError.textContent);
      throw new Error('Failed to parse Pinterest RSS feed');
    }

    // Extract items from RSS
    const items = xmlDoc.querySelectorAll('item');
    const images = [];

    items.forEach((item, index) => {
      if (index >= limit) return;

      const title = item.querySelector('title')?.textContent || 'Pinterest Image';
      const link = item.querySelector('link')?.textContent || boardUrl;
      const description = item.querySelector('description')?.textContent || '';
      
      // Extract image URL from description (Pinterest embeds images in description)
      const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : null;

      if (imageUrl) {
        images.push({
          id: `pinterest_${categoryId}_${index}`,
          title: title,
          description: description.replace(/<[^>]*>/g, '').substring(0, 200),
          url: imageUrl,
          link: link,
          boardUrl: boardUrl,
          source: 'pinterest'
        });
      }
    });

    console.log(`✅ Fetched ${images.length} images from Pinterest board`);
    return images;

  } catch (error) {
    console.error('Error fetching Pinterest board images:', error);
    return [];
  }
};

/**
 * Fetch images for all categories (for caching)
 * @returns {Promise<Object>} Object with category IDs as keys and image arrays as values
 */
export const fetchAllCategoryImages = async () => {
  const allImages = {};
  
  for (const categoryId of Object.keys(PINTEREST_BOARD_URLS)) {
    const images = await fetchPinterestBoardImages(parseInt(categoryId), 12);
    allImages[categoryId] = images;
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return allImages;
};

/**
 * Cache Pinterest images in localStorage
 * @param {number} categoryId - Category ID
 * @param {Array} images - Array of image objects
 */
export const cachePinterestImages = (categoryId, images) => {
  try {
    const cacheKey = `pinterest_images_${categoryId}`;
    const cacheData = {
      images,
      timestamp: Date.now(),
      expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    console.log(`💾 Cached ${images.length} Pinterest images for category ${categoryId}`);
  } catch (error) {
    console.warn('Failed to cache Pinterest images:', error);
  }
};

/**
 * Get cached Pinterest images
 * @param {number} categoryId - Category ID
 * @returns {Array|null} Cached images or null if not found/expired
 */
export const getCachedPinterestImages = (categoryId) => {
  try {
    const cacheKey = `pinterest_images_${categoryId}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    
    // Check if expired
    if (Date.now() > cacheData.expiry) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    console.log(`💾 Using cached Pinterest images for category ${categoryId}`);
    return cacheData.images;
  } catch (error) {
    console.warn('Failed to get cached Pinterest images:', error);
    return null;
  }
};

/**
 * Fetch Pinterest images with caching
 * @param {number} categoryId - Category ID
 * @param {number} limit - Number of images to fetch
 * @returns {Promise<Array>} Array of image objects
 */
export const getPinterestImages = async (categoryId, limit = 12) => {
  // Try cache first
  const cached = getCachedPinterestImages(categoryId);
  if (cached && cached.length > 0) {
    return cached.slice(0, limit);
  }
  
  // Fetch fresh data
  const images = await fetchPinterestBoardImages(categoryId, limit);
  
  // Cache the results
  if (images.length > 0) {
    cachePinterestImages(categoryId, images);
  }
  
  return images;
};

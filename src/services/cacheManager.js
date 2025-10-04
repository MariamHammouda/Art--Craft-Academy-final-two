/**
 * Cache Manager for YouTube API responses
 * Reduces API quota usage by caching results locally
 */

const CACHE_KEYS = {
  PLAYLIST_VIDEOS: 'youtube_playlist_videos',
  CHANNEL_VIDEOS: 'youtube_channel_videos',
  VIDEO_STATS: 'youtube_video_stats',
  LAST_FETCH: 'youtube_last_fetch'
};

const DEFAULT_CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

/**
 * Set cache data with expiration
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} duration - Cache duration in milliseconds (default: 2 hours)
 */
export const setCache = (key, data, duration = DEFAULT_CACHE_DURATION) => {
  try {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + duration
    };
    
    localStorage.setItem(key, JSON.stringify(cacheItem));
    console.log(`💾 Cached data for key: ${key}, expires in ${Math.round(duration / 1000 / 60)} minutes`);
  } catch (error) {
    console.warn('Failed to set cache:', error);
  }
};

/**
 * Get cache data if not expired
 * @param {string} key - Cache key
 * @returns {any|null} Cached data or null if expired/not found
 */
export const getCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) {
      console.log(`📭 No cache found for key: ${key}`);
      return null;
    }
    
    const cacheItem = JSON.parse(cached);
    const now = Date.now();
    
    if (now > cacheItem.expiry) {
      console.log(`⏰ Cache expired for key: ${key}`);
      localStorage.removeItem(key);
      return null;
    }
    
    const remainingTime = Math.round((cacheItem.expiry - now) / 1000 / 60);
    console.log(`💾 Using cached data for key: ${key}, ${remainingTime} minutes remaining`);
    return cacheItem.data;
  } catch (error) {
    console.warn('Failed to get cache:', error);
    return null;
  }
};

/**
 * Clear all YouTube API cache
 */
export const clearCache = () => {
  Object.values(CACHE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('🗑️ Cleared all YouTube API cache');
};

/**
 * Reset everything for new API key
 */
export const resetForNewApiKey = () => {
  console.log('🔄 Resetting cache and quota data for new API key...');
  
  // Clear all cache
  clearCache();
  
  // Clear daily usage tracking
  const today = new Date().toDateString();
  const usageKey = `youtube_daily_usage_${today}`;
  localStorage.removeItem(usageKey);
  
  // Clear all YouTube-related cache
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('youtube_') || key.startsWith('yt_')) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('✅ Cache and quota data reset complete');
};

/**
 * Clear all cache data (for debugging)
 */
export const clearAllCache = () => {
  console.log('🧹 Clearing all cache data...');
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('youtube_') || key.startsWith('yt_')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed cache key: ${key}`);
    }
  });
  console.log('✅ All cache cleared');
};

/**
 * Get cache info for debugging
 */
export const getCacheInfo = () => {
  const info = {};
  Object.entries(CACHE_KEYS).forEach(([name, key]) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const cacheItem = JSON.parse(cached);
        const now = Date.now();
        const isExpired = now > cacheItem.expiry;
        const remainingTime = isExpired ? 0 : Math.round((cacheItem.expiry - now) / 1000 / 60);
        
        info[name] = {
          key,
          expired: isExpired,
          remainingMinutes: remainingTime,
          dataSize: JSON.stringify(cacheItem.data).length
        };
      } catch (error) {
        info[name] = { error: 'Invalid cache data' };
      }
    } else {
      info[name] = { status: 'No cache' };
    }
  });
  
  return info;
};

/**
 * Cache key generators
 */
export const generateCacheKey = {
  playlistVideos: (playlistId, maxResults) => `${CACHE_KEYS.PLAYLIST_VIDEOS}_${playlistId}_${maxResults}`,
  channelVideos: (channelId, maxResults) => `${CACHE_KEYS.CHANNEL_VIDEOS}_${channelId}_${maxResults}`,
  videoStats: (videoIds) => `${CACHE_KEYS.VIDEO_STATS}_${videoIds.slice(0, 5).join(',')}`
};

/**
 * Check if we should make API call based on quota usage
 * @param {number} estimatedCost - Estimated quota cost for the operation
 * @returns {boolean} Whether to proceed with API call
 */
export const shouldMakeApiCall = (estimatedCost = 5) => {
  // TEMPORARY: Allow API calls for testing all playlists
  console.log('🧪 TEMPORARY: Allowing API calls for testing all playlists');
  return true;
  
  const lastFetch = getCache(CACHE_KEYS.LAST_FETCH);
  const now = Date.now();
  
  // If we made an API call in the last 10 minutes, be more conservative
  if (lastFetch && (now - lastFetch.timestamp) < 10 * 60 * 1000) {
    console.log('⚠️ Recent API call detected, using cache to preserve quota');
    return false;
  }
  
  // Track API usage (simple estimation)
  const dailyUsage = getDailyApiUsage();
  if (dailyUsage + estimatedCost > 7000) { // Stay under 7000 to be safe
    console.log(`⚠️ Estimated quota usage too high: ${dailyUsage + estimatedCost}/10000`);
    return false;
  }
  
  return true;
};

/**
 * Track API usage (simple estimation)
 */
const getDailyApiUsage = () => {
  const today = new Date().toDateString();
  const usageKey = `youtube_daily_usage_${today}`;
  const usage = localStorage.getItem(usageKey);
  return usage ? parseInt(usage) : 0;
};

/**
 * Record API usage
 */
export const recordApiUsage = (cost) => {
  const today = new Date().toDateString();
  const usageKey = `youtube_daily_usage_${today}`;
  const currentUsage = getDailyApiUsage();
  const newUsage = currentUsage + cost;
  
  localStorage.setItem(usageKey, newUsage.toString());
  setCache(CACHE_KEYS.LAST_FETCH, { timestamp: Date.now() }, 24 * 60 * 60 * 1000);
  
  console.log(`📊 API usage recorded: +${cost} units, total today: ${newUsage}/10000`);
  
  if (newUsage > 8000) {
    console.warn('⚠️ High API usage detected! Consider using cached data.');
  }
};

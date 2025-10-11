/**
 * Utility to clear video cache and force refresh
 */

// Clear localStorage cache
export const clearVideoCache = () => {
  try {
    // Clear any localStorage items related to videos
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('video') || key.includes('youtube') || key.includes('cache') || 
          key.includes('playlist') || key.includes('beads') || key.includes('jewelry')) {
        console.log('🗑️ Removing cache key:', key);
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage as well
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes('video') || key.includes('youtube') || key.includes('cache') || 
          key.includes('playlist') || key.includes('beads') || key.includes('jewelry')) {
        console.log('🗑️ Removing session key:', key);
        sessionStorage.removeItem(key);
      }
    });
    
    console.log('🧹 Video cache cleared successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing video cache:', error);
    return false;
  }
};

// Force page refresh to clear all caches
export const forceRefresh = () => {
  clearVideoCache();
  window.location.reload(true);
};

// Clear specific video category cache
export const clearCategoryCache = (categoryId) => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes(`category_${categoryId}`) || key.includes(`videos_${categoryId}`) ||
          key.includes(`playlist_${categoryId}`) || (categoryId === 4 && key.includes('beads'))) {
        console.log(`🗑️ Removing category ${categoryId} cache key:`, key);
        localStorage.removeItem(key);
      }
    });
    
    // Also clear sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes(`category_${categoryId}`) || key.includes(`videos_${categoryId}`) ||
          key.includes(`playlist_${categoryId}`) || (categoryId === 4 && key.includes('beads'))) {
        console.log(`🗑️ Removing category ${categoryId} session key:`, key);
        sessionStorage.removeItem(key);
      }
    });
    
    console.log(`🧹 Category ${categoryId} cache cleared`);
    return true;
  } catch (error) {
    console.error(`❌ Error clearing category ${categoryId} cache:`, error);
    return false;
  }
};

// Clear Beads & Accessories specific cache
export const clearBeadsCache = () => {
  console.log('🧹 Clearing Beads & Accessories cache...');
  clearCategoryCache(4); // Beads & Accessories is categoryId 4
  
  // Also clear any cache keys that might contain the deleted video
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.includes('gjqDo2LcBf4') || key.includes('labubu') || key.includes('Labubu') || 
        key.includes('Deleted video') || key.includes('Private video')) {
      console.log('🗑️ Removing deleted video cache key:', key);
      localStorage.removeItem(key);
    }
  });
  
  console.log('✅ Beads & Accessories cache cleared');
};

// Clear all YouTube playlist cache to force fresh fetch with filtering
export const clearYouTubeCache = () => {
  console.log('🧹 Clearing all YouTube cache...');
  
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.includes('youtube') || key.includes('playlist') || key.includes('videos')) {
      console.log('🗑️ Removing YouTube cache key:', key);
      localStorage.removeItem(key);
    }
  });
  
  // Also clear sessionStorage
  const sessionKeys = Object.keys(sessionStorage);
  sessionKeys.forEach(key => {
    if (key.includes('youtube') || key.includes('playlist') || key.includes('videos')) {
      console.log('🗑️ Removing YouTube session key:', key);
      sessionStorage.removeItem(key);
    }
  });
  
  console.log('✅ YouTube cache cleared - fresh fetch will apply video filtering');
};

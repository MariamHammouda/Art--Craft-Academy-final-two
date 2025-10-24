/**
 * Utility to clear all caches manually
 * Use this after adding new videos to YouTube
 * 
 * Usage from browser console:
 * window.clearVideoCache()
 */

import { clearAllCache } from '../services/cacheManager.js';

export const clearAllAppCache = () => {
  try {
    // Clear localStorage cache (includes YouTube API cache)
    clearAllCache();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear in-memory cache by reloading
    console.log('✅ All caches cleared successfully');
    console.log('🔄 Reloading page to fetch fresh data...');
    
    // Auto-reload after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
    return false;
  }
};

// Make function available globally in browser console
if (typeof window !== 'undefined') {
  window.clearVideoCache = clearAllAppCache;
  console.log('💡 Tip: Run window.clearVideoCache() to clear all caches and see new videos');
}


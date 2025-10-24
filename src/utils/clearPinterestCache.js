/**
 * Utility to clear Pinterest cache
 * Run this in browser console: window.clearPinterestCache()
 */

export const clearPinterestCache = () => {
  console.log('🧹 Clearing Pinterest cache...');
  const keys = Object.keys(localStorage);
  let clearedCount = 0;
  
  keys.forEach(key => {
    if (key.startsWith('pinterest_')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
      clearedCount++;
    }
  });
  
  console.log(`✅ Cleared ${clearedCount} Pinterest cache entries`);
  alert(`Pinterest cache cleared! Removed ${clearedCount} entries. Please refresh the page.`);
  
  // Auto refresh after 1 second
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

// Make it available globally in browser console
if (typeof window !== 'undefined') {
  window.clearPinterestCache = clearPinterestCache;
}

export default clearPinterestCache;

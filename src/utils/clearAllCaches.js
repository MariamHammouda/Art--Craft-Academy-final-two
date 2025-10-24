/**
 * Clear all application caches
 * This will clear localStorage, sessionStorage, and force a page reload
 */

export const clearAllCaches = () => {
  try {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    console.log('✅ All caches cleared');
    console.log('🔄 Reloading to fetch fresh data...');
    
    // Reload the page after a brief delay
    setTimeout(() => {
      window.location.reload(true); // true = force reload from server
    }, 500);
    
    return true;
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
    return false;
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.clearAllCaches = clearAllCaches;
  window.clearVideoCache = clearAllCaches; // Alias
}


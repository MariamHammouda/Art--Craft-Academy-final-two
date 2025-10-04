import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  fetchUserBoards, 
  fetchBoardPins, 
  fetchCategoryPins, 
  fetchFeaturedPins,
  searchPins 
} from '../services/pinterestApi.js';

// In-memory cache for Pinterest data with 10-minute expiration
const pinterestCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Cache utilities
const getCacheKey = (type, params) => {
  return `pinterest_${type}_${JSON.stringify(params)}`;
};

const getCachedData = (key) => {
  const cached = pinterestCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📌 Using cached Pinterest data for key:', key);
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  pinterestCache.set(key, {
    data,
    timestamp: Date.now()
  });
  console.log('💾 Cached Pinterest data for key:', key, 'Count:', Array.isArray(data) ? data.length : 'object');
};

// Global abort controller for managing requests
let globalAbortController = null;

/**
 * Custom hook for fetching Pinterest boards
 * @returns {Object} { boards, loading, error, refetch }
 */
export const usePinterestBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey('boards', {});
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        setBoards(cachedData);
        setLoading(false);
        return;
      }

      console.log('📌 Fetching Pinterest boards...');
      const boardsData = await fetchUserBoards();
      
      setBoards(boardsData);
      setCachedData(cacheKey, boardsData);
      
    } catch (err) {
      console.error('Error in usePinterestBoards:', err);
      setError(err.message);
      setBoards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchBoards();
      hasFetched.current = true;
    }
  }, []);

  const refetch = () => {
    hasFetched.current = false;
    fetchBoards();
  };

  return { boards, loading, error, refetch };
};

/**
 * Custom hook for fetching pins from a specific board
 * @param {string} boardId - Pinterest board ID
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Object} { pins, loading, error, refetch }
 */
export const useBoardPins = (boardId, pageSize = 25) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchPins = async () => {
    if (!boardId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey('board_pins', { boardId, pageSize });
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        setPins(cachedData);
        setLoading(false);
        return;
      }

      console.log(`📌 Fetching Pinterest pins for board: ${boardId}`);
      const pinsData = await fetchBoardPins(boardId, pageSize);
      
      setPins(pinsData);
      setCachedData(cacheKey, pinsData);
      
    } catch (err) {
      console.error('Error in useBoardPins:', err);
      setError(err.message);
      setPins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boardId && !hasFetched.current) {
      fetchPins();
      hasFetched.current = true;
    }
  }, [boardId, pageSize]);

  const refetch = () => {
    hasFetched.current = false;
    fetchPins();
  };

  return { pins, loading, error, refetch };
};

/**
 * Custom hook for fetching pins by category
 * @param {number} categoryId - Internal category ID
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Object} { pins, loading, error, refetch }
 */
export const useCategoryPins = (categoryId, pageSize = 25) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchPins = async () => {
    console.log(`🔍 useCategoryPins fetchPins called for category: ${categoryId}`);
    
    if (!categoryId) {
      console.log('❌ No categoryId provided, setting loading to false');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log(`📌 Starting to fetch pins for category ${categoryId} with pageSize ${pageSize}`);

      const cacheKey = getCacheKey('category_pins', { categoryId, pageSize });
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        console.log(`💾 Found cached data for category ${categoryId}:`, cachedData.length, 'pins');
        setPins(cachedData);
        setLoading(false);
        return;
      }

      console.log(`🌐 No cache found, fetching Pinterest pins for category: ${categoryId}`);
      const pinsData = await fetchCategoryPins(categoryId, pageSize);
      console.log(`📌 Received pins data for category ${categoryId}:`, pinsData);
      
      setPins(pinsData || []);
      setCachedData(cacheKey, pinsData || []);
      
    } catch (err) {
      console.error(`❌ Error in useCategoryPins for category ${categoryId}:`, err);
      setError(err.message);
      setPins([]);
    } finally {
      setLoading(false);
      console.log(`✅ useCategoryPins finished for category ${categoryId}`);
    }
  };

  useEffect(() => {
    if (categoryId && !hasFetched.current) {
      fetchPins();
      hasFetched.current = true;
    }
  }, [categoryId, pageSize]);

  const refetch = () => {
    hasFetched.current = false;
    fetchPins();
  };

  return { pins, loading, error, refetch };
};

/**
 * Custom hook for fetching featured pins from multiple categories
 * @param {number} pinsPerCategory - Number of pins per category
 * @returns {Object} { featuredPins, loading, error, refetch }
 */
export const useFeaturedPins = (pinsPerCategory = 6) => {
  const [featuredPins, setFeaturedPins] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchPins = async () => {
    console.log(`🔍 useFeaturedPins fetchPins called with pinsPerCategory: ${pinsPerCategory}`);
    
    try {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey('featured_pins', { pinsPerCategory });
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        console.log('💾 Found cached featured pins:', Object.keys(cachedData).length, 'categories');
        setFeaturedPins(cachedData);
        setLoading(false);
        return;
      }

      console.log('🌐 No cache found, fetching featured Pinterest pins...');
      const pinsData = await fetchFeaturedPins(pinsPerCategory);
      console.log('📌 Received featured pins data:', pinsData);
      
      setFeaturedPins(pinsData || {});
      setCachedData(cacheKey, pinsData || {});
      
    } catch (err) {
      console.error('❌ Error in useFeaturedPins:', err);
      setError(err.message);
      setFeaturedPins({});
    } finally {
      setLoading(false);
      console.log('✅ useFeaturedPins finished');
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchPins();
      hasFetched.current = true;
    }
  }, [pinsPerCategory]);

  const refetch = () => {
    hasFetched.current = false;
    fetchPins();
  };

  return { featuredPins, loading, error, refetch };
};

/**
 * Custom hook for searching Pinterest pins
 * @param {string} query - Search query
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Object} { pins, loading, error, search }
 */
export const useSearchPins = (initialQuery = '', pageSize = 25) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  const search = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setPins([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setQuery(searchQuery);

      const cacheKey = getCacheKey('search_pins', { query: searchQuery, pageSize });
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        setPins(cachedData);
        setLoading(false);
        return;
      }

      console.log(`📌 Searching Pinterest pins for: ${searchQuery}`);
      const pinsData = await searchPins(searchQuery, pageSize);
      
      setPins(pinsData);
      setCachedData(cacheKey, pinsData);
      
    } catch (err) {
      console.error('Error in useSearchPins:', err);
      setError(err.message);
      setPins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      search(initialQuery);
    }
  }, []);

  return { pins, loading, error, query, search };
};

/**
 * Utility hook for Pinterest pin operations
 * @returns {Object} Utility functions
 */
export const usePinterestUtils = () => {
  const clearCache = () => {
    pinterestCache.clear();
    console.log('🗑️ Pinterest cache cleared');
  };

  const getCacheSize = () => {
    return pinterestCache.size;
  };

  const getCacheInfo = () => {
    const info = [];
    pinterestCache.forEach((value, key) => {
      info.push({
        key,
        size: Array.isArray(value.data) ? value.data.length : 1,
        age: Date.now() - value.timestamp,
        expired: Date.now() - value.timestamp > CACHE_DURATION
      });
    });
    return info;
  };

  return {
    clearCache,
    getCacheSize,
    getCacheInfo
  };
};

import { useState, useEffect, useRef, useMemo } from 'react';
import { fetchChannelVideos, fetchPlaylistVideos, fetchCategorizedPlaylistVideos } from '../services/youtubeApi.js';
import { resetForNewApiKey, clearAllCache } from '../services/cacheManager.js';
import { videosData } from '../mockData/videosData.js'; // Fallback data

// In-memory cache for video data with 5-minute expiration
const videoCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache utilities
const getCacheKey = (playlists, maxResults) => {
  return `${JSON.stringify(playlists)}_${maxResults}`;
};

const getCachedData = (key) => {
  const cached = videoCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📦 Using cached video data for key:', key);
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  videoCache.set(key, {
    data,
    timestamp: Date.now()
  });
  console.log('💾 Cached video data for key:', key, 'Count:', data.length);
};

// Global abort controller for managing requests
let globalAbortController = null;

/**
 * Custom hook for fetching and managing YouTube videos
 * @param {string|Array} channels - Channel ID string or array of channel objects
 * @param {number} maxResults - Maximum results per channel
 * @returns {Object} { videos, loading, error, refetch }
 */
export const useYouTubeVideos = (channels, maxResults = 10) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedVideos = [];
      
      if (typeof channels === 'string') {
        // Single channel
        fetchedVideos = await fetchChannelVideos(channels, maxResults);
      } else if (Array.isArray(channels)) {
        // Multiple channels with categories
        fetchedVideos = await fetchCategorizedVideos(channels, maxResults);
      }
      
      // If no videos fetched (API error, no key, etc.), use fallback data
      if (fetchedVideos.length === 0) {
        console.log('Using fallback video data');
        setVideos(videosData);
      } else {
        setVideos(fetchedVideos);
      }
      
    } catch (err) {
      console.error('Error in useYouTubeVideos:', err);
      setError(err.message);
      // Use fallback data on error
      setVideos(videosData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [channels, maxResults]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos
  };
};

/**
 * Hook for fetching latest videos from main channel or playlists with optimized caching
 * @param {number} maxResults - Maximum results
 * @returns {Object} { videos, loading, error, refetch }
 */
export const useLatestVideos = (maxResults = 20) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);

  // Memoize playlists configuration to prevent unnecessary re-renders
  const playlists = useMemo(() => {
    return [
      {
        playlistId: import.meta.env.VITE_ORIGAMI_PLAYLIST_ID,
        categoryId: 1,
        categoryTitleKey: 'categories.origamiWorld'
      },
      {
        playlistId: import.meta.env.VITE_DRAWING_PLAYLIST_ID,
        categoryId: 2,
        categoryTitleKey: 'categories.drawing'
      },
      {
        playlistId: import.meta.env.VITE_RECYCLING_PLAYLIST_ID,
        categoryId: 3,
        categoryTitleKey: 'categories.recyclingArt'
      },
      {
        playlistId: import.meta.env.VITE_BEADS_PLAYLIST_ID,
        categoryId: 4,
        categoryTitleKey: 'categories.beadsJewelry'
      },
      {
        playlistId: import.meta.env.VITE_CLAY_PLAYLIST_ID,
        categoryId: 5,
        categoryTitleKey: 'categories.clay'
      },
      {
        playlistId: import.meta.env.VITE_PRESCHOOL_PLAYLIST_ID,
        categoryId: 6,
        categoryTitleKey: 'categories.preschoolCrafts'
      },
      {
        playlistId: import.meta.env.VITE_PERLER_BEADS_PLAYLIST_ID,
        categoryId: 7,
        categoryTitleKey: 'categories.perlerBeads'
      },
      {
        playlistId: import.meta.env.VITE_3D_PEN_FUN_PLAYLIST_ID,
        categoryId: 8,
        categoryTitleKey: 'categories.3dPenFun'
      },
      {
        playlistId: import.meta.env.VITE_SCIENCE_PLAYLIST_ID,
        categoryId: 9,
        categoryTitleKey: 'categories.scienceDiy'
      }
    ].filter(playlist => playlist.playlistId && !playlist.playlistId.startsWith('your_'));
  }, []);

  // Generate cache key for this specific request
  const cacheKey = useMemo(() => getCacheKey(playlists, maxResults), [playlists, maxResults]);

  const fetchVideos = async () => {
    try {
      // Check cache first
      const cachedData = getCachedData(cacheKey);
      if (cachedData && isMountedRef.current) {
        setVideos(cachedData);
        setLoading(false);
        setError(null);
        return;
      }

      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller with 5-second timeout
      abortControllerRef.current = new AbortController();
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, 5000);

      if (!isMountedRef.current) return;
      
      setLoading(true);
      setError(null);
      
      let fetchedVideos = [];
      
      if (Array.isArray(playlists) && playlists.length > 0) {
        console.log('📡 Fetching fresh video data for', playlists.length, 'playlists');
        fetchedVideos = await fetchCategorizedPlaylistVideos(playlists, maxResults);
      }
      
      clearTimeout(timeoutId);
      
      if (!isMountedRef.current) return;
      
      // If no videos fetched, use fallback data
      if (fetchedVideos.length === 0) {
        console.log('⚠️ No videos fetched, using fallback data');
        fetchedVideos = videosData.slice(0, maxResults);
      }
      
      // Cache the results
      setCachedData(cacheKey, fetchedVideos);
      
      setVideos(fetchedVideos);
      setLoading(false);
      
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('🚫 Request aborted due to timeout or cancellation');
        return;
      }
      
      console.error('❌ Error in useLatestVideos:', err);
      
      if (!isMountedRef.current) return;
      
      setError(err.message);
      // Use fallback data on error
      const fallbackData = videosData.slice(0, maxResults);
      setVideos(fallbackData);
      setCachedData(cacheKey, fallbackData);
      setLoading(false);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchVideos();
    
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [cacheKey]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos
  };
};

/**
 * Custom hook for fetching and managing YouTube playlist videos with caching
 * @param {Array} playlists - Array of playlist objects
 * @param {number} maxResults - Maximum results per playlist
 * @returns {Object} { videos, loading, error, refetch }
 */
export const usePlaylistVideos = (playlists, maxResults = 10) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);

  // Generate cache key for this specific request
  const cacheKey = useMemo(() => getCacheKey(playlists, maxResults), [playlists, maxResults]);

  const fetchVideos = async () => {
    try {
      // Check cache first
      const cachedData = getCachedData(cacheKey);
      if (cachedData && isMountedRef.current) {
        setVideos(cachedData);
        setLoading(false);
        setError(null);
        return;
      }

      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller with 5-second timeout
      abortControllerRef.current = new AbortController();
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, 5000);

      if (!isMountedRef.current) return;
      
      setLoading(true);
      setError(null);
      
      let fetchedVideos = [];
      
      if (Array.isArray(playlists) && playlists.length > 0) {
        console.log('📡 Fetching fresh playlist data for', playlists.length, 'playlists');
        fetchedVideos = await fetchCategorizedPlaylistVideos(playlists, maxResults);
      }
      
      clearTimeout(timeoutId);
      
      if (!isMountedRef.current) return;
      
      // If no videos fetched, use fallback data
      if (fetchedVideos.length === 0) {
        console.log('⚠️ No videos fetched, using fallback data');
        fetchedVideos = videosData.slice(0, maxResults);
      }
      
      // Cache the results
      setCachedData(cacheKey, fetchedVideos);
      
      setVideos(fetchedVideos);
      setLoading(false);
      
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('🚫 Playlist request aborted due to timeout or cancellation');
        return;
      }
      
      console.error('❌ Error in usePlaylistVideos:', err);
      
      if (!isMountedRef.current) return;
      
      setError(err.message);
      // Use fallback data on error
      const fallbackData = videosData.slice(0, maxResults);
      setVideos(fallbackData);
      setCachedData(cacheKey, fallbackData);
      setLoading(false);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchVideos();
    
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [cacheKey]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos
  };
};

/**
 * Hook for fetching videos by category
 * @param {number} categoryId - Category ID
 * @param {number} maxResults - Maximum results
 * @returns {Object} { videos, loading, error, refetch }
 */
export const useVideosByCategory = (categoryId, maxResults = 10) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedVideos = [];
      
      // Map category IDs to their respective playlists
      const categoryPlaylistMap = {
        1: import.meta.env.VITE_ORIGAMI_PLAYLIST_ID, // Origami & Paper Crafts
        2: import.meta.env.VITE_DRAWING_PLAYLIST_ID, // Drawing
        3: import.meta.env.VITE_RECYCLING_PLAYLIST_ID, // Recycling Art
        4: import.meta.env.VITE_BEADS_PLAYLIST_ID, // Beads & Accessories
        5: import.meta.env.VITE_CLAY_PLAYLIST_ID, // Clay Creations
        6: import.meta.env.VITE_PRESCHOOL_PLAYLIST_ID, // Preschool Crafts
        7: import.meta.env.VITE_PERLER_BEADS_PLAYLIST_ID, // Perler Beads
        8: import.meta.env.VITE_3D_PEN_FUN_PLAYLIST_ID, // 3D Pen Fun
        9: import.meta.env.VITE_SCIENCE_PLAYLIST_ID, // Science & DIY Experiments
      };
      
      const playlistId = categoryPlaylistMap[categoryId];
      
      if (playlistId) {
        console.log(`🎯 Fetching videos for category ${categoryId} from playlist ${playlistId}`);
        fetchedVideos = await fetchPlaylistVideos(playlistId, maxResults);
        
        // Ensure videos have the correct category ID
        fetchedVideos = fetchedVideos.map(video => ({
          ...video,
          categoryId: categoryId
        }));
      } else {
        console.log(`⚠️ No playlist configured for category ${categoryId}, using fallback data`);
        // Fallback: use mock data for this category
        fetchedVideos = [];
      }
      
      // If no videos fetched, use fallback data
      if (fetchedVideos.length === 0) {
        console.log('Using fallback video data for category', categoryId);
        const fallbackVideos = videosData.filter(video => video.categoryId === categoryId);
        setVideos(fallbackVideos.slice(0, maxResults));
      } else {
        setVideos(fetchedVideos);
      }
      
    } catch (err) {
      console.error('Error in useVideosByCategory:', err);
      setError(err.message);
      // Use fallback data on error
      const fallbackVideos = videosData.filter(video => video.categoryId === categoryId);
      setVideos(fallbackVideos.slice(0, maxResults));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryVideos();
  }, [categoryId, maxResults]);
  
  return {
    videos,
    loading,
    error,
    refetch: fetchCategoryVideos
  };
};

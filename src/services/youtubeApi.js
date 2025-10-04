// YouTube Data API v3 Service
import { getCache, setCache, generateCacheKey, shouldMakeApiCall, recordApiUsage } from './cacheManager.js';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetch videos from a YouTube channel
 * @param {string} channelId - YouTube channel ID
 * @param {number} maxResults - Maximum number of videos to fetch (default: 50)
 * @returns {Promise<Array>} Array of video objects
 */
export const fetchChannelVideos = async (channelId, maxResults = 50) => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API key not found. Using fallback data.');
      return [];
    }

    // First, get the uploads playlist ID
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error(`Channel API error: ${channelResponse.status}`);
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    
    // Get videos from the uploads playlist
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`Videos API error: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    
    // Get video statistics (views, likes, etc.)
    const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
    const statsResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    let statsData = { items: [] };
    if (statsResponse.ok) {
      statsData = await statsResponse.json();
    }
    
    // Combine video data with statistics
    const videos = videosData.items.map((item, index) => {
      const stats = statsData.items.find(stat => stat.id === item.snippet.resourceId.videoId);
      
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        url: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
        views: stats?.statistics?.viewCount ? parseInt(stats.statistics.viewCount) : 0,
        likes: stats?.statistics?.likeCount ? parseInt(stats.statistics.likeCount) : 0,
        duration: stats?.contentDetails?.duration || 'PT0S',
        // Add category mapping based on title keywords or tags
        categoryId: getCategoryFromTitle(item.snippet.title),
        categoryTitleKey: getCategoryTitleKey(item.snippet.title)
      };
    });
    
    return videos;
    
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

/**
 * Fetch videos from a YouTube playlist
 * @param {string} playlistId - YouTube playlist ID
 * @param {number} maxResults - Maximum number of videos to fetch (default: 50)
 * @returns {Promise<Array>} Array of video objects
 */
export const fetchPlaylistVideos = async (playlistId, maxResults = 50) => {
  try {
    console.log('🔍 Attempting to fetch playlist:', playlistId);
    console.log('🎯 Playlist type:', playlistId === import.meta.env.VITE_ORIGAMI_PLAYLIST_ID ? 'ORIGAMI' : 
                                     playlistId === import.meta.env.VITE_DRAWING_PLAYLIST_ID ? 'DRAWING' : 'OTHER');
    
    // Check cache first
    const cacheKey = generateCacheKey.playlistVideos(playlistId, maxResults);
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      console.log('💾 Using cached playlist data');
      return cachedData;
    }
    
    console.log('🔑 API Key available:', !!YOUTUBE_API_KEY);
    
    if (!YOUTUBE_API_KEY) {
      console.warn('❌ YouTube API key not found. Using fallback data.');
      return [];
    }
    
    // Check if we should make API call (quota management)
    if (!shouldMakeApiCall(5)) {
      console.warn('⚠️ Skipping API call to preserve quota');
      return [];
    }

    // Get videos from the playlist
    const apiUrl = `${YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    console.log('📡 Making API call to:', apiUrl);
    
    const videosResponse = await fetch(apiUrl);
    
    console.log('📊 API Response status:', videosResponse.status);
    console.log('📊 API Response ok:', videosResponse.ok);
    
    if (!videosResponse.ok) {
      const errorText = await videosResponse.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`Playlist API error: ${videosResponse.status} - ${errorText}`);
    }
    
    const videosData = await videosResponse.json();
    
    // Get video statistics (views, likes, etc.)
    const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
    const statsResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    let statsData = { items: [] };
    if (statsResponse.ok) {
      statsData = await statsResponse.json();
    }
    
    // Combine video data with statistics
    const videos = videosData.items.map((item, index) => {
      const stats = statsData.items.find(stat => stat.id === item.snippet.resourceId.videoId);
      
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        url: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
        views: stats?.statistics?.viewCount ? parseInt(stats.statistics.viewCount) : 0,
        likes: stats?.statistics?.likeCount ? parseInt(stats.statistics.likeCount) : 0,
        duration: stats?.contentDetails?.duration || 'PT0S',
        // Add category mapping based on title keywords or tags
        categoryId: getCategoryFromTitle(item.snippet.title),
        categoryTitleKey: getCategoryTitleKey(item.snippet.title)
      };
    });
    
    // Record API usage and cache the results
    recordApiUsage(5); // Estimate: 3 for playlist + 2 for stats
    setCache(cacheKey, videos, 6 * 60 * 60 * 1000); // Cache for 6 hours for better performance
    
    console.log(`✅ Fetched and cached ${videos.length} videos from playlist`);
    return videos;
    
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    recordApiUsage(3); // Still record partial usage
    return [];
  }
};

/**
 * Fetch videos from multiple channels and categorize them
 * @param {Array} channels - Array of {channelId, categoryId, categoryTitleKey}
 * @param {number} maxResults - Maximum results per channel
 * @returns {Promise<Array>} Categorized videos
 */
export const fetchCategorizedVideos = async (channels, maxResults = 10) => {
  try {
    const allVideos = [];
    
    for (const channel of channels) {
      const videos = await fetchChannelVideos(channel.channelId, maxResults);
      const categorizedVideos = videos.map(video => ({
        ...video,
        categoryId: channel.categoryId,
        categoryTitleKey: channel.categoryTitleKey
      }));
      allVideos.push(...categorizedVideos);
    }
    
    return allVideos;
  } catch (error) {
    console.error('Error fetching categorized videos:', error);
    return [];
  }
};

/**
 * Fetch videos from multiple playlists and categorize them
 * @param {Array} playlists - Array of {playlistId, categoryId, categoryTitleKey}
 * @param {number} maxResults - Maximum results per playlist
 * @returns {Promise<Array>} Categorized videos
 */
export const fetchCategorizedPlaylistVideos = async (playlists, maxResults = 10) => {
  try {
    console.log('🎯 fetchCategorizedPlaylistVideos: Starting with playlists:', playlists);
    const allVideos = [];
    
    // Calculate videos per playlist to distribute evenly
    const videosPerPlaylist = Math.ceil(maxResults / playlists.length);
    console.log(`📊 Distributing ${maxResults} videos across ${playlists.length} playlists (${videosPerPlaylist} per playlist)`);
    
    for (const playlist of playlists) {
      console.log(`📡 Fetching from playlist: ${playlist.playlistId} (Category: ${playlist.categoryId})`);
      
      try {
        const videos = await fetchPlaylistVideos(playlist.playlistId, videosPerPlaylist);
        console.log(`✅ Got ${videos.length} videos from playlist ${playlist.playlistId}`);
        
        if (videos.length === 0) {
          console.warn(`⚠️ No videos found for playlist ${playlist.playlistId} (Category ${playlist.categoryId})`);
          continue;
        }
        
        const categorizedVideos = videos.map(video => ({
          ...video,
          categoryId: playlist.categoryId,
          categoryTitleKey: playlist.categoryTitleKey,
          // Ensure we have proper IDs
          id: video.id || `${playlist.categoryId}_${Date.now()}_${Math.random()}`
        }));
        
        console.log(`🏷️ Categorized ${categorizedVideos.length} videos with categoryId: ${playlist.categoryId}`);
        
        allVideos.push(...categorizedVideos);
      } catch (error) {
        console.error(`❌ Error fetching playlist ${playlist.playlistId}:`, error);
        // Continue with other playlists even if one fails
      }
    }
    
    console.log(`🎉 Total videos fetched: ${allVideos.length}`);
    console.log('📊 Videos by category:', allVideos.reduce((acc, video) => {
      acc[video.categoryId] = (acc[video.categoryId] || 0) + 1;
      return acc;
    }, {}));
    
    return allVideos;
  } catch (error) {
    console.error('Error fetching categorized playlist videos:', error);
    return [];
  }
};

/**
 * Search for videos by keyword
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum results
 * @returns {Promise<Array>} Search results
 */
export const searchVideos = async (query, maxResults = 25) => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API key not found.');
      return [];
    }

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
      categoryId: getCategoryFromTitle(item.snippet.title),
      categoryTitleKey: getCategoryTitleKey(item.snippet.title)
    }));
    
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

/**
 * Determine category based on video title keywords
 * @param {string} title - Video title
 * @returns {number} Category ID
 */
const getCategoryFromTitle = (title) => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('origami') || titleLower.includes('paper fold')) return 1;
  if (titleLower.includes('draw') || titleLower.includes('sketch') || titleLower.includes('paint')) return 2;
  if (titleLower.includes('bead') || titleLower.includes('jewelry') || titleLower.includes('bracelet')) return 3;
  if (titleLower.includes('clay') || titleLower.includes('pottery') || titleLower.includes('ceramic')) return 4;
  if (titleLower.includes('preschool') || titleLower.includes('kids') || titleLower.includes('children')) return 5;
  if (titleLower.includes('science') || titleLower.includes('experiment') || titleLower.includes('diy')) return 6;
  if (titleLower.includes('recycle') || titleLower.includes('upcycle') || titleLower.includes('bottle')) return 7;
  
  // Default to origami if no category matches
  return 1;
};

/**
 * Get category title key based on video title
 * @param {string} title - Video title
 * @returns {string} Category title key
 */
const getCategoryTitleKey = (title) => {
  const categoryId = getCategoryFromTitle(title);
  const categoryMap = {
    1: 'categories.origamiWorld',
    2: 'categories.drawing',
    3: 'categories.beadsJewelry',
    4: 'categories.clay',
    5: 'categories.preschoolCrafts',
    6: 'categories.scienceDiy',
    7: 'categories.recyclingArt',
  };
  
  return categoryMap[categoryId] || 'categories.origamiWorld';
};

/**
 * Format duration from YouTube API format (PT4M13S) to readable format
 * @param {string} duration - YouTube duration format
 * @returns {string} Formatted duration (4:13)
 */
export const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Format view count to readable format (1.2K, 1.5M, etc.)
 * @param {number} views - View count
 * @returns {string} Formatted view count
 */
export const formatViewCount = (views) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

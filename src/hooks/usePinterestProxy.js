import { useState, useEffect, useRef } from 'react';
import { 
  fetchUserProfile, 
  fetchUserBoards, 
  fetchBoardPins, 
  searchPins,
  checkProxyHealth 
} from '../services/pinterestProxyAPI';

/**
 * Custom hook for Pinterest user boards via proxy
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

      // Check if proxy is available
      const proxyAvailable = await checkProxyHealth();
      if (!proxyAvailable) {
        throw new Error('Proxy server is not running. Please start the proxy server.');
      }

      const boardsData = await fetchUserBoards();
      setBoards(boardsData);
      
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
 * Custom hook for Pinterest board pins via proxy
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

      const pinsData = await fetchBoardPins(boardId, pageSize);
      setPins(pinsData);
      
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
 * Custom hook for Pinterest search via proxy
 * @param {string} query - Search query
 * @param {number} pageSize - Number of pins to fetch
 * @returns {Object} { pins, loading, error, search }
 */
export const usePinterestSearch = (initialQuery = '', pageSize = 25) => {
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

      const searchResults = await searchPins(searchQuery, pageSize);
      setPins(searchResults);
      
    } catch (err) {
      console.error('Error in usePinterestSearch:', err);
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
 * Custom hook for Pinterest user profile via proxy
 * @returns {Object} { profile, loading, error, refetch }
 */
export const usePinterestProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const profileData = await fetchUserProfile();
      setProfile(profileData);
      
    } catch (err) {
      console.error('Error in usePinterestProfile:', err);
      setError(err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchProfile();
      hasFetched.current = true;
    }
  }, []);

  const refetch = () => {
    hasFetched.current = false;
    fetchProfile();
  };

  return { profile, loading, error, refetch };
};

/**
 * Custom hook to check proxy server status
 * @returns {Object} { isAvailable, loading, error, checkHealth }
 */
export const useProxyHealth = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    try {
      setLoading(true);
      setError(null);

      const available = await checkProxyHealth();
      setIsAvailable(available);
      
    } catch (err) {
      console.error('Error checking proxy health:', err);
      setError(err.message);
      setIsAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return { isAvailable, loading, error, checkHealth };
};

console.log('🪝 Pinterest Proxy Hooks loaded - React hooks for proxy API ready!');

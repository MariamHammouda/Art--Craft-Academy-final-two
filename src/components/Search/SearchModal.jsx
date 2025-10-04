import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaTimes, FaPlay, FaImage, FaBook } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { videosData } from '../../mockData/videosData';

const SearchModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    videos: [],
    categories: [],
    pages: []
  });

  // Define searchable categories
  const categories = useMemo(() => [
    { id: 1, name: t('categories.origamiWorld'), path: '/category/1', type: 'category' },
    { id: 2, name: t('categories.drawing'), path: '/category/2', type: 'category' },
    { id: 3, name: t('categories.beadsJewelry'), path: '/pictures', type: 'category' },
    { id: 4, name: t('categories.clay'), path: '/pictures', type: 'category' },
    { id: 5, name: t('categories.preschoolCrafts'), path: '/pictures', type: 'category' },
    { id: 6, name: t('categories.scienceDiy'), path: '/pictures', type: 'category' },
    { id: 7, name: t('categories.recyclingArt'), path: '/pictures', type: 'category' },
    { id: 8, name: t('categories.perlerBeads'), path: '/pictures', type: 'category' },
    { id: 9, name: t('categories.threeDPenFun'), path: '/pictures', type: 'category' },
    { id: 10, name: t('categories.miniatureWonders'), path: '/pictures', type: 'category' },
    { id: 11, name: t('categories.tipsTricks'), path: '/pictures', type: 'category' }
  ], [t]);

  // Define searchable pages
  const pages = useMemo(() => [
    { name: t('nav.home'), path: '/', type: 'page' },
    { name: t('nav.pictures'), path: '/pictures', type: 'page' },
    { name: t('nav.courses'), path: '/courses', type: 'page' },
    { name: t('nav.shop'), path: '/shop', type: 'page' },
    { name: t('nav.about'), path: '/about', type: 'page' }
  ], [t]);

  // Search function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ videos: [], categories: [], pages: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search videos
    const matchingVideos = videosData.filter(video => {
      const title = video.titleKey ? t(video.titleKey) : video.title || '';
      const categoryTitle = video.categoryTitleKey ? t(video.categoryTitleKey) : video.categoryTitle || '';
      return title.toLowerCase().includes(query) || 
             categoryTitle.toLowerCase().includes(query);
    }).slice(0, 5); // Limit to 5 results

    // Search categories
    const matchingCategories = categories.filter(category =>
      category.name.toLowerCase().includes(query)
    ).slice(0, 3); // Limit to 3 results

    // Search pages
    const matchingPages = pages.filter(page =>
      page.name.toLowerCase().includes(query)
    ).slice(0, 3); // Limit to 3 results

    setSearchResults({
      videos: matchingVideos,
      categories: matchingCategories,
      pages: matchingPages
    });
  }, [searchQuery, t, categories, pages]);

  // Handle result click
  const handleResultClick = (result) => {
    if (result.type === 'video') {
      navigate(`/video/${result.id}`);
    } else if (result.type === 'category') {
      navigate(result.path);
    } else if (result.type === 'page') {
      navigate(result.path);
    }
    onClose();
    setSearchQuery('');
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.videos.length > 0) {
      handleResultClick({ ...searchResults.videos[0], type: 'video' });
    } else if (searchResults.categories.length > 0) {
      handleResultClick(searchResults.categories[0]);
    } else if (searchResults.pages.length > 0) {
      handleResultClick(searchResults.pages[0]);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResults = searchResults.videos.length > 0 || 
                    searchResults.categories.length > 0 || 
                    searchResults.pages.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{t('common.search')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl p-1"
            aria-label="Close search"
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search') + '...'}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59ACBE] focus:border-transparent outline-none"
              autoFocus
            />
          </div>
        </form>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {!searchQuery.trim() ? (
            <div className="p-8 text-center text-gray-500">
              <FaSearch className="mx-auto text-4xl mb-4 text-gray-300" />
              <p>{t('common.search')} for videos, categories, or pages...</p>
            </div>
          ) : !hasResults ? (
            <div className="p-8 text-center text-gray-500">
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try different keywords or check spelling</p>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Videos Results */}
              {searchResults.videos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaPlay className="mr-2 text-[#59ACBE]" />
                    Videos ({searchResults.videos.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => handleResultClick({ ...video, type: 'video' })}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                      >
                        <div className="font-medium text-gray-800">
                          {video.titleKey ? t(video.titleKey) : video.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {video.categoryTitleKey ? t(video.categoryTitleKey) : video.categoryTitle}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Results */}
              {searchResults.categories.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaImage className="mr-2 text-[#59ACBE]" />
                    Categories ({searchResults.categories.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleResultClick(category)}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                      >
                        <div className="font-medium text-gray-800">{category.name}</div>
                        <div className="text-sm text-gray-500 mt-1">Category</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages Results */}
              {searchResults.pages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaBook className="mr-2 text-[#59ACBE]" />
                    Pages ({searchResults.pages.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.pages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(page)}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                      >
                        <div className="font-medium text-gray-800">{page.name}</div>
                        <div className="text-sm text-gray-500 mt-1">Page</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Press Enter to search</span>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

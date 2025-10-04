import React, { useState, useEffect } from 'react';
import { getCacheInfo, clearCache, resetForNewApiKey } from '../../services/cacheManager';

const QuotaManager = () => {
  const [cacheInfo, setCacheInfo] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  const refreshCacheInfo = () => {
    setCacheInfo(getCacheInfo());
  };

  useEffect(() => {
    refreshCacheInfo();
  }, []);

  const getDailyUsage = () => {
    const today = new Date().toDateString();
    const usageKey = `youtube_daily_usage_${today}`;
    const usage = localStorage.getItem(usageKey);
    return usage ? parseInt(usage) : 0;
  };

  const getUsagePercentage = () => {
    const usage = getDailyUsage();
    return Math.round((usage / 10000) * 100);
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleClearCache = () => {
    clearCache();
    refreshCacheInfo();
    alert('Cache cleared successfully!');
  };

  const handleResetForNewKey = () => {
    if (confirm('This will clear all cache and quota tracking. Continue?')) {
      resetForNewApiKey();
      refreshCacheInfo();
      alert('Reset complete! You can now use a new API key.');
    }
  };

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-[#59ACBE] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#4a9bb0] transition-colors z-50"
      >
        📊 API Status
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">YouTube API Status</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Quota Usage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Daily Quota</span>
          <span className={`text-sm font-medium ${getUsageColor()}`}>
            {getDailyUsage()}/10,000
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              getUsagePercentage() >= 90 ? 'bg-red-500' :
              getUsagePercentage() >= 70 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(getUsagePercentage(), 100)}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {getUsagePercentage()}% used
        </div>
      </div>

      {/* Cache Status */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Cache Status</span>
          <button
            onClick={refreshCacheInfo}
            className="text-xs text-[#59ACBE] hover:text-[#4a9bb0]"
          >
            🔄 Refresh
          </button>
        </div>
        
        {Object.entries(cacheInfo).map(([name, info]) => (
          <div key={name} className="text-xs text-gray-600 mb-1">
            <span className="font-medium">{name}:</span>
            {info.error ? (
              <span className="text-red-500 ml-1">Error</span>
            ) : info.status ? (
              <span className="text-gray-400 ml-1">{info.status}</span>
            ) : (
              <span className={`ml-1 ${info.expired ? 'text-red-500' : 'text-green-500'}`}>
                {info.expired ? 'Expired' : `${info.remainingMinutes}m left`}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={handleClearCache}
          className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
        >
          🗑️ Clear Cache
        </button>
        
        <button
          onClick={handleResetForNewKey}
          className="w-full bg-[#59ACBE] text-white px-3 py-2 rounded text-sm hover:bg-[#4a9bb0] transition-colors"
        >
          🔄 Reset for New API Key
        </button>
        
        {getUsagePercentage() >= 80 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            ⚠️ High quota usage detected. Consider using cached data.
          </div>
        )}
        
        {getUsagePercentage() >= 95 && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
            🚨 Quota nearly exhausted! API calls will be limited.
          </div>
        )}
      </div>

      <div className="text-xs text-gray-400 mt-3 pt-2 border-t">
        Quota resets daily at midnight PT
      </div>
    </div>
  );
};

export default QuotaManager;

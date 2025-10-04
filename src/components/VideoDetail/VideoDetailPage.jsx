import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaEye, FaThumbsUp, FaShare, FaBookmark, FaArrowLeft } from 'react-icons/fa6';
import { useLatestVideos } from '../../hooks/useYouTubeVideos';
import { videosData } from '../../mockData/videosData';
import VideoCard from '../Videos/VideoCard';
import { formatViewCount } from '../../services/youtubeApi';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { videos: dynamicVideos, loading } = useLatestVideos(20);
  
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    console.log('🔍 VideoDetailPage - Looking for video:', { videoId, dynamicVideosCount: dynamicVideos.length });
    
    // Find video from dynamic videos or fallback to static data
    const allVideos = dynamicVideos.length > 0 ? dynamicVideos : videosData;
    console.log('📹 Available videos:', allVideos.map(v => ({ id: v.id, title: v.title })));
    
    const foundVideo = allVideos.find(v => v.id.toString() === videoId);
    console.log('🎯 Found video:', foundVideo);
    
    if (foundVideo) {
      setVideo(foundVideo);
      
      // Get related videos from same category
      const related = allVideos
        .filter(v => v.id.toString() !== videoId && v.categoryId === foundVideo.categoryId)
        .slice(0, 6);
      setRelatedVideos(related);
    }
  }, [videoId, dynamicVideos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-300 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('videos.notFound')}</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#4a9bb0] transition-colors"
          >
            {t('common.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const videoTitle = video.titleKey ? t(video.titleKey) : video.title;
  const categoryTitle = video.categoryTitleKey ? t(video.categoryTitleKey) : video.categoryTitle;
  const description = video.description || `${t('videos.learnHow')} ${videoTitle.toLowerCase()}. ${t('videos.stepByStep')}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#59ACBE] hover:text-[#4a9bb0] font-medium transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* YouTube Link Button */}
              <div className="p-4 bg-gray-50 border-t">
                <button
                  onClick={() => {
                    const videoId = video.url.match(/embed\/([^?]+)/)?.[1];
                    if (videoId) {
                      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
                </button>
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              {/* Title and Category */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#59ACBE]/10 text-[#59ACBE] rounded-full text-sm font-medium mb-3">
                  {categoryTitle}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {videoTitle}
                </h1>
              </div>

        


              {/* Description */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('videos.description')}
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
                    {description}
                  </p>
                  {description.length > 200 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-[#59ACBE] hover:text-[#4a9bb0] font-medium mt-2 transition-colors"
                    >
                      {showFullDescription ? t('videos.showLess') : t('videos.showMore')}
                    </button>
                  )}
                </div>
              </div>

              {/* Materials Needed Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('videos.materialsNeeded')}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Dynamic materials based on category */}
                  {video.categoryId === 1 && ( // Origami
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.origamiPaper')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.ruler')}
                      </div>
                    </>
                  )}
                  {video.categoryId === 2 && ( // Drawing
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.pencils')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.paper')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.eraser')}
                      </div>
                    </>
                  )}
                  {video.categoryId === 3 && ( // Beads
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.beads')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-[#59ACBE] rounded-full"></span>
                        {t('materials.string')}
                      </div>
                    </>
                  )}
                  {/* Add more categories as needed */}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('videos.relatedVideos')}
              </h3>
              
              {relatedVideos.length > 0 ? (
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <div
                      key={relatedVideo.id}
                      onClick={() => navigate(`/video/${relatedVideo.id}`)}
                      className="cursor-pointer group"
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-32 aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          <iframe
                            className="w-full h-full"
                            src={relatedVideo.url}
                            title={relatedVideo.titleKey ? t(relatedVideo.titleKey) : relatedVideo.title}
                            frameBorder="0"
                          ></iframe>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 group-hover:text-[#59ACBE] transition-colors line-clamp-2 text-sm">
                            {relatedVideo.titleKey ? t(relatedVideo.titleKey) : relatedVideo.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {relatedVideo.categoryTitleKey ? t(relatedVideo.categoryTitleKey) : relatedVideo.categoryTitle}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatViewCount(relatedVideo.views || 0)} {t('videos.views')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {t('videos.noRelatedVideos')}
                </p>
              )}
              
              {/* View All Videos Button */}
              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => navigate(`/category/${video.categoryId}`)}
                  className="w-full px-4 py-2 bg-[#59ACBE] text-white rounded-lg hover:bg-[#4a9bb0] transition-colors"
                >
                  {t('videos.viewAllInCategory')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;

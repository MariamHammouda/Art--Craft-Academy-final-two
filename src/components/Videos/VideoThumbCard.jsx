import React from "react";

function extractYouTubeId(url) {
  // supports embed URLs and regular watch URLs
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watchMatch) return watchMatch[1];
  return null;
}

const VideoThumbCard = ({ url, title }) => {
  const id = extractYouTubeId(url);
  const thumb = id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : undefined;

  const handleOpen = () => {
    const targetUrl = id ? `https://www.youtube.com/watch?v=${id}` : url;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="group text-left bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="relative aspect-video w-full">
        {thumb ? (
          <img src={thumb} alt={title} className="w-full h-full object-cover" />)
          : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <span className="absolute top-2 left-2 text-xs font-semibold bg-black/70 text-white px-2 py-0.5 rounded">
          Tutorial
        </span>
        <span className="absolute bottom-2 right-2 text-xs bg-black/80 text-white px-2 py-0.5 rounded">
          •
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
          {title}
        </p>
      </div>
    </button>
  );
};

export default VideoThumbCard;
import React from "react";
import VideoCard from "./VideoCard.jsx";
import { videosData } from "../../mockData/videosData.js";

export const VideosPart = () => {
  return (
    <section className="py-12 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Videos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {videosData.map((video, index) => (
          <VideoCard key={index} url={video.url} title={video.title} />
        ))}
      </div>
    </section>
  );
};



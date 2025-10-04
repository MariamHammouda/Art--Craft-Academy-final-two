import React from "react";
import { shortsData } from "../../mockData/shortsData.js";

const ShortsStories = () => {
  return (
    <section className="py-6 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Shorts</h2>
          <span className="text-sm text-gray-500">Stories</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {shortsData.map((shortItem) => (
            <div key={shortItem.id} className="min-w-[180px] w-[180px] rounded-xl bg-white shadow">
              <div className="aspect-[9/16] w-full overflow-hidden rounded-t-xl">
                <iframe
                  className="w-full h-full"
                  src={shortItem.url}
                  title={shortItem.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-2">
                <p className="text-sm font-medium line-clamp-2">{shortItem.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortsStories;
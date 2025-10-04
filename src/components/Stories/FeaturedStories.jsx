import React from "react";
import hero from "../../assets/images/hero-images/Artlogo.png";

const FeaturedStories = () => {
  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Tutorials or Stories</h2>

        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          <div className="md:col-span-1 bg-white rounded-xl overflow-hidden shadow">
            <img src={hero} alt="Featured" className="w-full h-full object-cover" />
          </div>

          <div className="md:col-span-2 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Why Origami Helps Kids Focus</h3>
              <p className="text-gray-600">Why Origami Helps Kids Focus</p>
            </div>
            <div className="mt-4">
              <button className="px-5 py-2 bg-[#59ACBE] text-white rounded-md hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
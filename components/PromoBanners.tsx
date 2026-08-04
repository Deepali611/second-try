'use client';

import React from 'react';

export const PromoBanners: React.FC = () => {
  return (
    <div className="space-y-4 my-3 px-4">
      {/* Primary Campaign Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0C5237] via-[#126B48] to-[#0A4730] p-4 text-white shadow-sm border border-black/5">
        <div className="relative z-10 max-w-[65%]">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded text-white">
              m'caffeine
            </span>
          </div>
          <h2 className="text-lg font-black leading-tight tracking-tight">
            Up to 30% OFF on the range
          </h2>
          <p className="text-xs text-white/80 font-medium mt-1">
            Your bodycare favourites
          </p>
          <button className="mt-3 bg-white text-[#0C5237] hover:bg-gray-100 font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm transition-transform active:scale-95">
            Shop now
          </button>
        </div>

        {/* Decorative products collage graphic */}
        <div className="absolute right-2 bottom-0 top-0 w-[35%] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-end pr-2 gap-1">
            <div className="w-10 h-20 bg-emerald-300/40 rounded-xl transform -rotate-6 border border-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold">
              🧼
            </div>
            <div className="w-12 h-24 bg-blue-300/40 rounded-xl transform rotate-3 border border-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold -ml-3">
              🧴
            </div>
            <div className="w-10 h-18 bg-pink-300/40 rounded-xl transform rotate-12 border border-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold -ml-3">
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Sub-banner strip: "See all products ▸" */}
      <div className="bg-white rounded-xl border border-gray-200 p-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-amber-100 flex items-center justify-center text-xs">🧀</div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-blue-100 flex items-center justify-center text-xs">🥛</div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-green-100 flex items-center justify-center text-xs">🍞</div>
          </div>
          <span className="text-xs font-bold text-gray-800">Fresh Staples & Daily Essentials</span>
        </div>
        <button className="text-xs font-extrabold text-[#54B226] hover:underline flex items-center gap-0.5">
          See all products <span className="text-[10px]">▸</span>
        </button>
      </div>

      {/* Featured this week Horizontal Carousel */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-extrabold text-[#1F1F1F]">Featured this week</h3>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Card 1 */}
          <div className="shrink-0 w-36 h-48 rounded-2xl bg-gradient-to-b from-[#FFF3E0] to-[#FFE0B2] border border-amber-300/60 p-3 flex flex-col justify-between relative shadow-xs">
            <div className="bg-[#E8543E] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full w-max">
              NEWLY LAUNCHED
            </div>
            <div className="text-center my-auto">
              <span className="text-3xl">🎀</span>
              <div className="text-xs font-black text-amber-900 mt-2">For You</div>
            </div>
            <div className="text-[10px] font-extrabold text-amber-950 text-center bg-white/70 backdrop-blur-xs py-1 rounded-lg">
              Explore Collection ▸
            </div>
          </div>

          {/* Card 2 */}
          <div className="shrink-0 w-36 h-48 rounded-2xl bg-gradient-to-b from-[#E0F2F1] to-[#B2DFDB] border border-teal-300/60 p-3 flex flex-col justify-between relative shadow-xs">
            <div className="bg-[#54B226] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full w-max">
              Featured
            </div>
            <div className="text-center my-auto">
              <span className="text-3xl">🪔</span>
              <div className="text-xs font-black text-teal-950 mt-2">Raksha Bandhan</div>
            </div>
            <div className="text-[10px] font-extrabold text-teal-950 text-center bg-white/70 backdrop-blur-xs py-1 rounded-lg">
              Shop Gifts ▸
            </div>
          </div>

          {/* Card 3 */}
          <div className="shrink-0 w-36 h-48 rounded-2xl bg-gradient-to-b from-[#F3E5F5] to-[#E1BEE7] border border-purple-300/60 p-3 flex flex-col justify-between relative shadow-xs">
            <div className="bg-[#1859C5] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full w-max">
              Featured
            </div>
            <div className="text-center my-auto">
              <span className="text-3xl">💍</span>
              <div className="text-xs font-black text-purple-950 mt-2">Style Your Hands</div>
            </div>
            <div className="text-[10px] font-extrabold text-purple-950 text-center bg-white/70 backdrop-blur-xs py-1 rounded-lg">
              View Jewelry ▸
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

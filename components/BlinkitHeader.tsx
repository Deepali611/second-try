'use client';

import React, { useState, useEffect } from 'react';

interface BlinkitHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const SEARCH_PLACEHOLDERS = [
  'Search "healthy snacks"',
  'Search "atta, dal, coke and more"',
  'Search "fresh milk & eggs"',
  'Search "chocolates & ice cream"',
  'Search "sunscreen & face wash"',
];

export const BlinkitHeader: React.FC<BlinkitHeaderProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'All', label: 'All', icon: '🛍️' },
    { id: 'Rakhi', label: 'Rakhi', icon: '🎯', badge: 'New' },
    { id: 'Electronics', label: 'Electronics', icon: '🎧' },
    { id: 'Beauty', label: 'Beauty', icon: '💄' },
    { id: 'Decor', label: 'Decor', icon: '🛋️' },
    { id: 'Kids', label: 'Kids', icon: '🍼' },
  ];

  return (
    <header className="bg-gradient-to-b from-[#F8CB45] via-[#F8CB45] to-[#FFFBF2] text-[#1F1F1F] pt-3 pb-2 px-4 sticky top-0 z-40 shadow-sm border-b border-black/5">
      {/* Top row: Delivery timing + Wallet & Profile */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold text-[#1F1F1F]/80 tracking-wide uppercase">
            Blinkit in
          </div>
          <div className="text-2xl font-black tracking-tight text-[#1F1F1F] flex items-center gap-1.5 leading-none mt-0.5">
            11 minutes
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Wallet pill */}
          <div className="bg-[#1F1F1F] hover:bg-black transition-colors rounded-full px-2.5 py-1 flex items-center gap-1.5 cursor-pointer shadow-2xs">
            <span className="text-xs">👛</span>
            <span className="text-xs font-bold text-[#F8CB45]">₹0</span>
          </div>

          {/* Profile icon */}
          <div className="w-8 h-8 rounded-full bg-[#1F1F1F] flex items-center justify-center cursor-pointer hover:bg-black transition-colors shadow-2xs">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Address row */}
      <div className="flex items-center gap-1 mt-1.5 text-xs text-[#1F1F1F]/90 cursor-pointer">
        <span className="font-extrabold text-[#1F1F1F] text-[11px] bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded tracking-wide border border-black/10">
          HOME
        </span>
        <span className="font-bold truncate max-w-[260px] text-[#1F1F1F]">
          - 403,C-9, florida, yogidham
        </span>
        <svg className="w-3.5 h-3.5 text-[#1F1F1F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Search Bar Pill */}
      <div className="mt-3 relative">
        <div className="bg-white rounded-2xl shadow-sm border border-black/10 px-3.5 py-2.5 flex items-center gap-2.5 text-gray-700 focus-within:ring-2 focus-within:ring-[#54B226]/50 transition-all">
          {/* Search Magnifying Glass Icon */}
          <svg className="w-5 h-5 text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Input field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
            className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder-gray-500 focus:outline-none"
          />

          {/* Mic Icon */}
          <button className="text-gray-700 hover:text-black shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Category Nav Tabs */}
      <div className="flex items-center gap-4 mt-3 overflow-x-auto no-scrollbar pb-1 text-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center shrink-0 relative pb-1 transition-all ${
                isActive ? 'text-[#1F1F1F] font-extrabold' : 'text-[#1F1F1F]/70 font-semibold hover:text-[#1F1F1F]'
              }`}
            >
              <div className="relative flex items-center justify-center w-7 h-7 mb-0.5">
                <span className="text-base">{tab.icon}</span>
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#E8543E] text-white text-[9px] font-extrabold px-1 rounded-full border border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1F1F1F] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};

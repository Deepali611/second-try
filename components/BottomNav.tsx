'use client';

import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onNavChange: (nav: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavChange,
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      id: 'order-again',
      label: 'Order Again',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'print',
      label: 'Print',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 px-4 max-w-md mx-auto pointer-events-none">
      <div className="relative flex items-center justify-between pointer-events-auto">
        {/* Cart floating bar if item added */}
        {cartCount > 0 && (
          <div
            onClick={onOpenCart}
            className="absolute -top-14 left-0 right-0 bg-[#54B226] text-white rounded-xl p-3 flex items-center justify-between shadow-xl cursor-pointer hover:bg-[#3E8A1C] transition-all transform animate-bounce"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white/20 px-2 py-0.5 rounded text-xs font-black">
                {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
              </div>
              <span className="font-extrabold text-sm">₹{cartTotal}</span>
            </div>
            <div className="text-xs font-black flex items-center gap-1">
              View Cart <span>▸</span>
            </div>
          </div>
        )}

        {/* Main Floating Nav Pill */}
        <nav className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-200/80 p-1.5 flex items-center gap-1 shrink flex-1 max-w-[78%]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#F8CB45]/30 text-[#1F1F1F] font-extrabold'
                    : 'text-gray-500 hover:text-gray-900 font-medium'
                }`}
              >
                <div className={`${isActive ? 'text-[#1F1F1F]' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Red Circular Floating Zomato FAB Button */}
        <button className="w-14 h-14 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white shadow-xl flex flex-col items-center justify-center border-2 border-white transition-transform active:scale-95 shrink-0 ml-2">
          <span className="text-[10px] font-black lowercase tracking-tighter leading-tight italic">
            zomato
          </span>
          <span className="text-[9px] font-bold leading-none mt-0.5">↗</span>
        </button>
      </div>
    </div>
  );
};

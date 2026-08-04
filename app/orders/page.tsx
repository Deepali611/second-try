'use client';

import React, { useState } from 'react';
import { BlinkitHeader } from '@/components/BlinkitHeader';
import { BottomNav } from '@/components/BottomNav';
import { OrderAgainScreen } from '@/components/OrderAgainScreen';

export default function OrdersPage() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF2] text-[#1F1F1F] font-sans antialiased pb-24 selection:bg-[#F8CB45] selection:text-black">
      {/* Mobile App Viewport Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative border-x border-gray-200">
        {/* App Top Bar Header */}
        <BlinkitHeader
          activeTab={activeHeaderTab}
          onTabChange={setActiveHeaderTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Order Again Main View */}
        <main className="pb-8">
          <OrderAgainScreen onShowToast={showToast} />
        </main>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#1F1F1F] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#54B226]" />
            {toastMessage}
          </div>
        )}

        {/* Floating Bottom Navigation */}
        <BottomNav
          activeTab="order-again"
          onNavChange={(nav) => {
            if (nav === 'home') {
              window.location.href = '/';
            }
          }}
          cartCount={0}
          cartTotal={0}
          onOpenCart={() => showToast('Your cart is empty')}
        />
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { BlinkitHeader } from '@/components/BlinkitHeader';
import { PromoBanners } from '@/components/PromoBanners';
import { ProductCard, Product } from '@/components/ProductCard';
import { CategoryGrid } from '@/components/CategoryGrid';
import { BottomNav } from '@/components/BottomNav';
import { OrderAgainScreen } from '@/components/OrderAgainScreen';
import { ProductDetailSheet, FailureType } from '@/components/ProductDetailSheet';

const PREVIOUSLY_BOUGHT_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Amul Fresh Malai Paneer',
    weight: '200 g',
    price: 95,
    icon: '🧀',
    bgColor: '#FFF9E6',
    rating: 4.4,
    reviewCount: '3.8 lac',
    deliveryTime: '11 mins',
    tag: '20g Protein / 100g',
    actionLink: 'All Paneer ▸',
    veg: true,
  },
  {
    id: 'p2',
    name: 'Gokul Full Cream Milk',
    weight: '1 ltr',
    price: 76,
    icon: '🥛',
    bgColor: '#EBF4FF',
    rating: 4.4,
    reviewCount: '23,335',
    deliveryTime: '11 mins',
    tag: 'Full Cream',
    actionLink: 'All Fresh Milk ▸',
    veg: true,
  },
  {
    id: 'p3',
    name: 'Yojana Poultry Power White Eggs',
    weight: '6 pcs',
    price: 176,
    mrp: 180,
    icon: '🥚',
    bgColor: '#FFF5EB',
    rating: 4.4,
    reviewCount: '50,403',
    deliveryTime: '11 mins',
    actionLink: 'See more like this ▸',
    egg: true,
  },
  {
    id: 'p4',
    name: 'Milky Mist SKYR High Pro+ Yogurt',
    weight: '700 g',
    price: 296,
    mrp: 350,
    discountText: '15% OFF on MRP',
    icon: '🍧',
    bgColor: '#F5EEFF',
    rating: 4.5,
    reviewCount: '12.1k',
    deliveryTime: '11 mins',
    actionLink: 'All Yogurt ▸',
    veg: true,
  },
];

const WISHLIST_PRODUCTS: Product[] = [
  {
    id: 'w1',
    name: 'Milky Mist SKYR High Pro+ Probiotic',
    weight: '700 g',
    price: 296,
    mrp: 350,
    discountText: '15% OFF on MRP',
    icon: '🍧',
    bgColor: '#F5EEFF',
    rating: 4.5,
    reviewCount: '12.1k',
    deliveryTime: '11 mins',
    veg: true,
  },
  {
    id: 'w2',
    name: "m'caffeine Espresso Face Wash",
    weight: '150 ml',
    price: 249,
    mrp: 349,
    discountText: '28% OFF on MRP',
    icon: '🧴',
    bgColor: '#EAF6E2',
    rating: 4.6,
    reviewCount: '45.2k',
    deliveryTime: '11 mins',
  },
  {
    id: 'w3',
    name: 'MamyPoko Pants Extra Absorb (L)',
    weight: '42 pcs',
    price: 649,
    mrp: 799,
    discountText: '18% OFF on MRP',
    icon: '🍼',
    bgColor: '#FBE2DE',
    rating: 4.7,
    reviewCount: '89k',
    deliveryTime: '11 mins',
  },
];

export default function Home() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // PDP Sheet State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPdpOpen, setIsPdpOpen] = useState(false);
  const [diagnosedFailure, setDiagnosedFailure] = useState<FailureType>(null);

  const handleAdd = (id: string) => {
    setCart((prev) => {
      const nextCount = (prev[id] || 0) + 1;
      return { ...prev, [id]: nextCount };
    });
    showToast('Item added to cart');
  };

  const handleRemove = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const handleOpenPdp = (product: Product, failure: FailureType = null) => {
    setSelectedProduct(product);
    setDiagnosedFailure(failure);
    setIsPdpOpen(true);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const allProductsMap = [...PREVIOUSLY_BOUGHT_PRODUCTS, ...WISHLIST_PRODUCTS].reduce(
    (acc, p) => {
      acc[p.id] = p;
      return acc;
    },
    {} as Record<string, Product>
  );

  const totalCartPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = allProductsMap[id];
    return sum + (product ? product.price * qty : 0);
  }, 0);

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

        {/* Dynamic PDP Policy Row Tester bar */}
        <div className="bg-[#1F1F1F] text-white px-3 py-2 text-xs flex items-center justify-between border-b border-gray-800 overflow-x-auto no-scrollbar">
          <span className="font-extrabold text-[#F8CB45] text-[10px] uppercase tracking-wider shrink-0 mr-2">
            PDP Policy Simulator:
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {(
              [
                { id: null, label: 'Default Blinkit' },
                { id: 'quality', label: 'Quality' },
                { id: 'proof', label: 'Proof' },
                { id: 'support', label: 'Support' },
                { id: 'highvalue', label: 'High-Value' },
              ] as const
            ).map((item) => {
              const isActive = diagnosedFailure === item.id;
              return (
                <button
                  key={String(item.id)}
                  onClick={() => {
                    setDiagnosedFailure(item.id);
                    if (!selectedProduct) setSelectedProduct(PREVIOUSLY_BOUGHT_PRODUCTS[0]);
                    setIsPdpOpen(true);
                  }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#54B226] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Switcher based on Bottom Nav */}
        {activeNavTab === 'order-again' ? (
          <OrderAgainScreen onShowToast={showToast} />
        ) : (
          /* Main Home View */
          <main className="pb-8">
            {/* Quick Banner Callout for Order Again / Second Try Feature */}
            <div className="mx-4 mt-3 bg-gradient-to-r from-[#1F1F1F] to-[#2E2E2E] text-white p-3 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="text-xs font-black text-[#F8CB45] uppercase tracking-wide">
                    Second Try AI Recovery
                  </div>
                  <div className="text-[11px] text-white/80 font-medium">
                    Review past order diagnoses & personalized guarantees
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveNavTab('order-again')}
                className="bg-[#54B226] hover:bg-[#3E8A1C] text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap"
              >
                View Orders ▸
              </button>
            </div>

            {/* Hero Promotional Banners */}
            <PromoBanners />

            {/* Section: Previously Bought Products Horizontal Carousel */}
            <div className="my-5 px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-extrabold text-[#1F1F1F]">
                  Previously bought
                </h3>
                <button
                  onClick={() => setActiveNavTab('order-again')}
                  className="text-xs font-extrabold text-[#54B226] hover:underline"
                >
                  See all (4 orders) ▸
                </button>
              </div>

              <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4">
                {PREVIOUSLY_BOUGHT_PRODUCTS.map((product) => (
                  <div key={product.id} onClick={() => handleOpenPdp(product, diagnosedFailure)}>
                    <ProductCard
                      product={product}
                      quantity={cart[product.id] || 0}
                      onAdd={handleAdd}
                      onRemove={handleRemove}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Your Wishlist */}
            <div className="my-5 px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-extrabold text-[#1F1F1F]">
                  Your wishlist
                </h3>
                <button className="text-xs font-extrabold text-[#54B226] hover:underline">
                  View all (3) ▸
                </button>
              </div>

              <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4">
                {WISHLIST_PRODUCTS.map((product) => (
                  <div key={product.id} onClick={() => handleOpenPdp(product, diagnosedFailure)}>
                    <ProductCard
                      product={product}
                      quantity={cart[product.id] || 0}
                      onAdd={handleAdd}
                      onRemove={handleRemove}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Column Category Grid Sections */}
            <CategoryGrid
              onCategoryClick={(cat) => {
                showToast(`Selected category: ${cat}`);
                handleOpenPdp(PREVIOUSLY_BOUGHT_PRODUCTS[0], diagnosedFailure);
              }}
            />
          </main>
        )}

        {/* Product Detail Sheet Modal */}
        <ProductDetailSheet
          product={selectedProduct}
          isOpen={isPdpOpen}
          onClose={() => setIsPdpOpen(false)}
          diagnosedFailure={diagnosedFailure}
          onAddToCart={handleAdd}
          cartQuantity={selectedProduct ? cart[selectedProduct.id] || 0 : 0}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#1F1F1F] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#54B226]" />
            {toastMessage}
          </div>
        )}

        {/* Floating Bottom Navigation */}
        <BottomNav
          activeTab={activeNavTab}
          onNavChange={setActiveNavTab}
          cartCount={totalCartCount}
          cartTotal={totalCartPrice}
          onOpenCart={() => showToast(`Opening cart: ${totalCartCount} items (₹${totalCartPrice})`)}
        />
      </div>
    </div>
  );
}

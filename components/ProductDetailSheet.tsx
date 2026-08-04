'use client';

import React, { useState } from 'react';
import { Product } from './ProductCard';

export type FailureType = 'quality' | 'proof' | 'support' | 'highvalue' | null;

interface ProductDetailSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  diagnosedFailure?: FailureType;
  onAddToCart?: (id: string) => void;
  cartQuantity?: number;
}

export const ProductDetailSheet: React.FC<ProductDetailSheetProps> = ({
  product,
  isOpen,
  onClose,
  diagnosedFailure = null,
  onAddToCart,
  cartQuantity = 0,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  // Personalized Policy Row Resolution based on diagnosedFailure
  const getPolicyConfig = () => {
    switch (diagnosedFailure) {
      case 'quality':
        return {
          icon: '🧊',
          title: 'Freshness-verified batch · replace-first guarantee',
          badge: 'SECOND TRY GUARANTEE',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          isPersonalized: true,
        };
      case 'proof':
        return {
          icon: '🔍',
          title: 'Verified by 1,240 buyers near you · 4.4★ rated',
          badge: 'VERIFIED PROOF',
          badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
          isPersonalized: true,
        };
      case 'support':
        return {
          icon: '🎧',
          title: 'Direct contact assigned · free replacement guaranteed',
          badge: 'RESOLUTION ASSIGNED',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          isPersonalized: true,
        };
      case 'highvalue':
        return {
          icon: '💳',
          title: '10-day money-back guarantee applied automatically',
          badge: 'RISK-FREE TRIAL',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          isPersonalized: true,
        };
      default:
        return {
          icon: '📦',
          title: '72 hours only replacement',
          badge: null,
          badgeBg: '',
          isPersonalized: false,
        };
    }
  };

  const policy = getPolicyConfig();

  const variants = [
    { label: product.weight, price: product.price, mrp: product.mrp },
    {
      label: `2 × ${product.weight}`,
      price: Math.round(product.price * 1.9),
      mrp: product.mrp ? Math.round(product.mrp * 2) : Math.round(product.price * 2),
      discount: '5% OFF',
    },
    {
      label: `4 × ${product.weight}`,
      price: Math.round(product.price * 3.7),
      mrp: product.mrp ? Math.round(product.mrp * 4) : Math.round(product.price * 4),
      discount: '8% OFF',
    },
  ];

  const currentVariant = variants[selectedVariantIndex] || variants[0];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Container */}
      <div className="relative bg-white w-full max-w-md mx-auto rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl z-10 animate-slide-up border-t border-gray-200">
        
        {/* Top Header / Close handle */}
        <div className="relative bg-[#1F1F1F] text-white p-3 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <svg
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-white'}`}
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            {/* Search */}
            <button className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* Share */}
            <button className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sheet Content Scrollable Area */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* Main Product Hero Display */}
          <div className="bg-[#FFFBF2] rounded-2xl p-6 text-center border border-amber-200/60 relative flex flex-col items-center justify-center">
            <span className="text-7xl filter drop-shadow-md select-none py-2">
              {product.icon}
            </span>

            {/* Pagination dots */}
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F1F1F]" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Brand Strip Banner Carousel */}
          <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200 flex items-center justify-between text-xs font-bold text-gray-800">
            <div className="flex items-center gap-2">
              {product.veg && (
                <div className="w-4 h-4 border border-green-600 bg-white flex items-center justify-center p-0.5 rounded-2xs">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                </div>
              )}
              <span className="font-extrabold text-[#1F1F1F]">{product.name.split(' ')[0]}</span>
            </div>
            <span className="bg-white border border-gray-200 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-600">
              {currentVariant.label}
            </span>
          </div>

          {/* Attribute Chip Row (Highlights) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <div className="shrink-0 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl px-3 py-1.5 flex items-center gap-1.5 font-bold">
              <span>🧊</span> Chilled
            </div>
            <div className="shrink-0 bg-gray-100 border border-gray-200 text-gray-800 rounded-xl px-3 py-1.5 font-medium">
              <span className="text-gray-400 font-normal">Sugar: </span>Zero Sugar
            </div>
            <div className="shrink-0 bg-gray-100 border border-gray-200 text-gray-800 rounded-xl px-3 py-1.5 font-medium">
              <span className="text-gray-400 font-normal">Shelf Life: </span>120 days
            </div>
            <button
              onClick={() => setActiveTab(activeTab === 'details' ? 'overview' : 'details')}
              className="shrink-0 bg-[#EAF6E2] text-[#3E8A1C] border border-[#54B226]/30 rounded-xl px-3 py-1.5 font-extrabold text-xs"
            >
              {activeTab === 'details' ? 'Hide details' : 'View details'}
            </button>
          </div>

          {/* Detailed Info Toggle */}
          {activeTab === 'details' && (
            <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 space-y-3 text-xs animate-fade-in">
              <h4 className="font-extrabold text-[#1F1F1F]">Key Information</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <span>Beverage Type</span>
                <span className="font-bold text-gray-900">Soft Drink / Snack</span>
                <span>Storage</span>
                <span className="font-bold text-gray-900">Refrigerate</span>
              </div>
              <h4 className="font-extrabold text-[#1F1F1F] pt-2 border-t border-gray-200">Nutritional Information</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <span>Total Sugar Per 100g</span>
                <span className="font-bold text-gray-900">0 g</span>
                <span>Calories (Kcal)</span>
                <span className="font-bold text-gray-900">0 Kcal</span>
              </div>
            </div>
          )}

          {/* Meta Row: Delivery time + Rating */}
          <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 7v5l3 2" />
              </svg>
              <span className="font-bold text-gray-900">{product.deliveryTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="text-amber-500 font-bold">★ {product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h2 className="text-lg font-extrabold text-[#1F1F1F] leading-snug">
            {product.name}
          </h2>

          {/* Select Unit Variant Cards Section */}
          <div>
            <div className="text-xs font-extrabold text-[#1F1F1F] mb-2">
              Select Unit
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {variants.map((variant, index) => {
                const isSelected = selectedVariantIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`shrink-0 p-3 rounded-2xl border text-left transition-all min-w-[120px] ${
                      isSelected
                        ? 'bg-[#EAF6E2] border-[#54B226] ring-2 ring-[#54B226]/30 shadow-xs'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-gray-900">
                      {variant.label}
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-black text-[#1F1F1F]">
                        ₹{variant.price}
                      </span>
                      {variant.mrp && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{variant.mrp}
                        </span>
                      )}
                    </div>
                    {variant.discount && (
                      <div className="text-[9px] font-extrabold text-[#1859C5] mt-0.5">
                        {variant.discount}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Row */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-xs text-red-600">
                {product.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900">
                  {product.name.split(' ')[0]}
                </div>
                <div className="text-[10px] text-gray-500">Explore all products ▸</div>
              </div>
            </div>
            <span className="text-xs text-gray-400">▸</span>
          </div>

          {/* DYNAMIC POLICY ROW — Customized by diagnosedFailure */}
          <div
            className={`rounded-2xl p-3.5 border transition-all ${
              policy.isPersonalized
                ? 'bg-gradient-to-r from-[#1F1F1F] via-[#2D2D2D] to-[#171717] text-white border-amber-300/40 shadow-md'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{policy.icon}</span>
                <div>
                  {policy.badge && (
                    <div className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border w-max mb-1 ${policy.badgeBg}`}>
                      {policy.badge}
                    </div>
                  )}
                  <div className={`text-xs font-extrabold ${policy.isPersonalized ? 'text-white' : 'text-gray-900'}`}>
                    {policy.title}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold ${policy.isPersonalized ? 'text-[#F8CB45]' : 'text-gray-400'}`}>
                ▸
              </span>
            </div>
          </div>

          {/* Similar Products Section Header */}
          <div className="pt-2">
            <h4 className="text-xs font-extrabold text-[#1F1F1F] mb-2">
              Similar products
            </h4>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center text-xs text-gray-500 font-medium">
              Browsing similar options for {product.name}...
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="bg-white border-t border-gray-200 p-3 flex items-center justify-between shrink-0 shadow-lg">
          <div>
            <div className="text-[10px] font-semibold text-gray-500">
              {currentVariant.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-[#1F1F1F]">
                ₹{currentVariant.price}
              </span>
              {currentVariant.mrp && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{currentVariant.mrp}
                </span>
              )}
            </div>
            <div className="text-[9px] text-gray-400">Inclusive of all taxes</div>
          </div>

          <button
            onClick={() => onAddToCart?.(product.id)}
            className="bg-[#54B226] hover:bg-[#3E8A1C] text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Add to cart</span>
            {cartQuantity > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs">
                ({cartQuantity})
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

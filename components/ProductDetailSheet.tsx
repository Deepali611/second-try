'use client';

import React, { useState } from 'react';
import { Product } from './ProductCard';

export type FailureType =
  | 'quality'
  | 'quality_expiry'
  | 'proof'
  | 'no_proof'
  | 'support'
  | 'support_unresolved'
  | 'highvalue'
  | 'high_value_hesitation'
  | null;

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
  const [activeAccordion, setActiveAccordion] = useState<string | null>('key_info');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);

  if (!isOpen || !product) return null;

  // Exact 4 policy-row lines from Solution Spec §3b mapping
  const getPolicyConfig = () => {
    switch (diagnosedFailure) {
      case 'quality':
      case 'quality_expiry':
        return {
          icon: '🧊',
          title: 'Freshness-verified batch · replace-first if it happens again',
          badge: 'SECOND TRY GUARANTEE',
          badgeBg: 'bg-[#EAF6E2] text-[#3E8A1C] border-[#54B226]/30',
          isPersonalized: true,
        };
      case 'proof':
      case 'no_proof':
        return {
          icon: '🔍',
          title: '1,240 verified buyers near you rated this 4.4★ in 30 days',
          badge: 'VERIFIED PROOF',
          badgeBg: 'bg-blue-50 text-[#1859C5] border-blue-200',
          isPersonalized: true,
        };
      case 'support':
      case 'support_unresolved':
        return {
          icon: '🎧',
          title: 'Priority resolution · named contact assigned',
          badge: 'RESOLUTION ASSIGNED',
          badgeBg: 'bg-purple-50 text-purple-900 border-purple-200',
          isPersonalized: true,
        };
      case 'highvalue':
      case 'high_value_hesitation':
        return {
          icon: '💳',
          title: '10-day money-back guarantee applied automatically',
          badge: 'RISK-FREE TRIAL',
          badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
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
      label: `6 × ${product.weight}`,
      price: Math.round(product.price * 5.8),
      mrp: Math.round((product.mrp || product.price) * 6),
      discount: '3% OFF',
    },
  ];

  const currentVariant = variants[selectedVariantIndex] || variants[0];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Swipeable Bottom Sheet Container */}
      <div className="relative bg-white w-full max-w-md mx-auto rounded-t-3xl h-[88vh] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl z-50 border-t border-gray-200 animate-slide-up">
        
        {/* Navigation Bar Top Row */}
        <div className="bg-white p-3.5 flex items-center justify-between border-b border-gray-100 shrink-0 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-700'}`}
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto min-h-0 flex-1 p-4 space-y-4 pb-6 overscroll-contain">
          {/* Centered Product Photo Carousel */}
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 relative flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-8xl filter drop-shadow-md select-none">
              {product.icon}
            </span>

            {/* Pagination dots */}
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F1F1F]" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Brand Strip Banner */}
          <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200 flex items-center justify-between text-xs font-bold text-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-green-600 bg-white flex items-center justify-center p-0.5 rounded-2xs">
                <div className="w-2 h-2 rounded-full bg-green-600" />
              </div>
              <span className="font-extrabold text-[#1F1F1F] text-sm">
                {product.name.split(' ')[0]}
              </span>
            </div>
            <span className="bg-[#FBE2DE] text-[#E8543E] font-black px-2 py-0.5 rounded text-xs border border-red-200">
              {currentVariant.label}
            </span>
          </div>

          {/* Attribute Chip Row (Highlights) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <div className="shrink-0 bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl px-3 py-2 flex flex-col justify-between font-bold min-w-[90px]">
              <span className="text-xs">🧊</span>
              <span className="text-xs font-bold text-blue-700 mt-1">Chilled</span>
            </div>

            <div className="shrink-0 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 flex flex-col justify-between min-w-[100px]">
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Sugar Profile</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5">Zero Sugar</span>
            </div>

            <div className="shrink-0 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 flex flex-col justify-between min-w-[90px]">
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Shelf Life</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5">120 days</span>
            </div>

            <button
              onClick={() => setShowAllDetails(!showAllDetails)}
              className="shrink-0 bg-[#EAF6E2] text-[#3E8A1C] border border-[#54B226]/40 rounded-2xl px-3 py-2 font-extrabold text-xs flex flex-col items-center justify-center min-w-[80px]"
            >
              <span>View</span>
              <span>details</span>
            </button>
          </div>

          {/* Meta Row: Delivery timing + Rating */}
          <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 7v5l3 2" />
              </svg>
              <span className="font-bold text-gray-900">{product.deliveryTime}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <span>★ ★ ★ ★ ★</span>
              <span className="text-gray-700 font-bold">{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h2 className="text-lg font-extrabold text-[#1F1F1F] leading-snug">
            {product.name}
          </h2>

          {/* Select Unit Section */}
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
                    className={`shrink-0 p-3 rounded-2xl border text-left transition-all min-w-[130px] ${
                      isSelected
                        ? 'bg-[#EAF6E2] border-[#54B226] ring-2 ring-[#54B226]/20 shadow-2xs'
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
                          MRP ₹{variant.mrp}
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
          <div className="bg-white rounded-2xl p-3 border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-xs text-red-600">
                {product.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900">
                  {product.name.split(' ')[0]}
                </div>
                <div className="text-[10px] text-gray-500">Explore all products</div>
              </div>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </div>

          {/* DYNAMIC POLICY ROW — Spec §3b mapping */}
          <div
            className={`rounded-2xl p-3.5 border transition-all ${
              policy.isPersonalized
                ? 'bg-gradient-to-r from-[#1F1F1F] via-[#2B2B2B] to-[#141414] text-white border-amber-300/40 shadow-md'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl shrink-0">{policy.icon}</span>
                <div>
                  {policy.badge && (
                    <div className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border w-max mb-1 ${policy.badgeBg}`}>
                      {policy.badge}
                    </div>
                  )}
                  <div className={`text-xs font-extrabold ${policy.isPersonalized ? 'text-white' : 'text-gray-900'}`}>
                    {policy.title}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold shrink-0 ml-2 ${policy.isPersonalized ? 'text-[#F8CB45]' : 'text-gray-400'}`}>
                ›
              </span>
            </div>
          </div>

          {/* All Details Accordion Sections (Matches screenshot 1) */}
          {showAllDetails && (
            <div className="space-y-2 pt-2 animate-fade-in">
              <h3 className="text-xs font-extrabold text-[#1F1F1F] uppercase tracking-wider">
                All details
              </h3>

              {/* Key Information */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'key_info' ? null : 'key_info')}
                  className="w-full p-3 text-left flex items-center justify-between font-extrabold text-xs text-gray-900"
                >
                  <span>Key Information</span>
                  <span>{activeAccordion === 'key_info' ? '▴' : '▾'}</span>
                </button>
                {activeAccordion === 'key_info' && (
                  <div className="px-3 pb-3 space-y-2 text-xs text-gray-600 border-t border-gray-200/60 pt-2">
                    <div className="flex justify-between">
                      <span>Beverage Type</span>
                      <span className="font-bold text-gray-900">Soft Drink</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sugar Profile</span>
                      <span className="font-bold text-gray-900">Zero Sugar</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Nutritional Information */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'nutrition' ? null : 'nutrition')}
                  className="w-full p-3 text-left flex items-center justify-between font-extrabold text-xs text-gray-900"
                >
                  <span>Nutritional Information</span>
                  <span>{activeAccordion === 'nutrition' ? '▴' : '▾'}</span>
                </button>
                {activeAccordion === 'nutrition' && (
                  <div className="px-3 pb-3 space-y-2 text-xs text-gray-600 border-t border-gray-200/60 pt-2">
                    <div className="flex justify-between">
                      <span>Total Sugar Per 100 g (g)</span>
                      <span className="font-bold text-gray-900">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Added Sugars Per 100 g (g)</span>
                      <span className="font-bold text-gray-900">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calories per 100g (Kcal)</span>
                      <span className="font-bold text-gray-900">0</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Similar Products Header */}
          <div className="pt-1">
            <h4 className="text-xs font-extrabold text-[#1F1F1F] mb-2">
              Similar products
            </h4>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center text-xs text-gray-500 font-medium">
              More options in this category...
            </div>
          </div>
        </div>

        {/* Sticky Add-To-Cart Bottom Bar */}
        <div className="bg-white border-t border-gray-200 p-3 flex items-center justify-between shrink-0 shadow-lg z-20">
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
            className="bg-[#54B226] hover:bg-[#3E8A1C] text-white font-extrabold text-sm px-7 py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Add to cart</span>
            {cartQuantity > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">
                ({cartQuantity})
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

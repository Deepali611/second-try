'use client';

import React, { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  mrp?: number;
  discountText?: string;
  icon: string;
  bgColor: string;
  badge?: string;
  rating: number;
  reviewCount: string;
  deliveryTime: string;
  actionLink?: string;
  tag?: string;
  veg?: boolean;
  egg?: boolean;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onAdd,
  onRemove,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="shrink-0 w-36 sm:w-40 bg-white rounded-2xl border border-gray-200 p-2.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative">
      {/* Top Image Container */}
      <div>
        <div
          className="w-full h-32 rounded-xl relative flex items-center justify-center p-2 mb-2 transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: product.bgColor }}
        >
          {/* Wishlist Heart Icon */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-2xs z-10"
          >
            <svg
              className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current'}`}
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Veg / Egg Badge */}
          {product.veg && (
            <div className="absolute bottom-2 left-2 w-4 h-4 border border-green-600 bg-white flex items-center justify-center p-0.5 rounded-2xs">
              <div className="w-2 h-2 rounded-full bg-green-600" />
            </div>
          )}
          {product.egg && (
            <div className="absolute bottom-2 right-2 bg-amber-800 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs">
              <span>🥚</span> EGG
            </div>
          )}

          {/* Product Icon / Visual Illustration */}
          <span className="text-4xl filter drop-shadow-sm select-none">{product.icon}</span>

          {/* ADD button overlapping bottom-right of image */}
          <div className="absolute -bottom-2 right-1 z-10">
            {quantity === 0 ? (
              <button
                onClick={() => onAdd(product.id)}
                className="bg-white border-1.5 border-[#54B226] text-[#54B226] hover:bg-[#54B226] hover:text-white font-extrabold text-xs px-3.5 py-1 rounded-lg shadow-sm transition-all active:scale-95 uppercase tracking-wide"
              >
                ADD
              </button>
            ) : (
              <div className="bg-[#54B226] text-white font-extrabold text-xs flex items-center gap-2 px-2 py-1 rounded-lg shadow-sm">
                <button
                  onClick={() => onRemove(product.id)}
                  className="hover:bg-black/20 w-4 h-4 rounded flex items-center justify-center leading-none text-sm"
                >
                  −
                </button>
                <span className="text-xs">{quantity}</span>
                <button
                  onClick={() => onAdd(product.id)}
                  className="hover:bg-black/20 w-4 h-4 rounded flex items-center justify-center leading-none text-sm"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pack Weight */}
        <div className="text-[11px] font-semibold text-gray-500 mt-1">
          {product.weight}
        </div>

        {/* Prices */}
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-sm font-extrabold text-[#1F1F1F]">
            ₹{product.price}
          </span>
          {product.mrp && (
            <span className="text-[11px] font-medium text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {/* Discount Callout */}
        {product.discountText && (
          <div className="text-[10px] font-bold text-[#1859C5] mt-0.5">
            {product.discountText}
          </div>
        )}

        {/* Product Title */}
        <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mt-1 leading-snug">
          {product.name}
        </h4>

        {/* Highlight Tag Pill */}
        {product.tag && (
          <div className="mt-1.5 inline-block bg-[#FFFBF2] border border-amber-200 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.tag}
          </div>
        )}

        {/* Rating Row */}
        <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-600">
          <div className="flex items-center text-amber-400">
            {'★'.repeat(Math.floor(product.rating))}
          </div>
          <span className="font-semibold text-gray-700">{product.rating}</span>
          <span className="text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500 font-medium">
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 7v5l3 2" />
          </svg>
          <span>{product.deliveryTime}</span>
        </div>
      </div>

      {/* Action Link at Bottom */}
      {product.actionLink && (
        <button className="mt-2.5 w-full bg-[#EAF6E2]/70 hover:bg-[#EAF6E2] text-[#3E8A1C] text-[10px] font-bold py-1 px-1.5 rounded-md text-center transition-colors truncate">
          {product.actionLink}
        </button>
      )}
    </div>
  );
};

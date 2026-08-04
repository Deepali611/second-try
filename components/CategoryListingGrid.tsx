'use client';

import React from 'react';
import { Product, ProductCard } from './ProductCard';

export const CATEGORY_PRODUCTS_DATA: Record<string, Product[]> = {
  Electronics: [
    {
      id: 'ele1',
      name: 'Compact Air Fryer, 4.1L',
      weight: '1 unit',
      price: 5499,
      mrp: 6999,
      discountText: '21% OFF on MRP',
      icon: '🍳',
      bgColor: '#E9E9F7',
      rating: 4.6,
      reviewCount: '14.2k',
      deliveryTime: '11 mins',
      tag: '10-day Guarantee',
    },
    {
      id: 'ele2',
      name: 'Active Noise Cancelling Earbuds',
      weight: '1 unit',
      price: 1999,
      mrp: 3999,
      discountText: '50% OFF on MRP',
      icon: '🎧',
      bgColor: '#E9E9F7',
      rating: 4.5,
      reviewCount: '28.9k',
      deliveryTime: '11 mins',
    },
    {
      id: 'ele3',
      name: 'USB Portable Blender, 400ml',
      weight: '1 unit',
      price: 899,
      mrp: 1499,
      discountText: '40% OFF on MRP',
      icon: '🥤',
      bgColor: '#E9E9F7',
      rating: 4.3,
      reviewCount: '5.1k',
      deliveryTime: '11 mins',
    },
    {
      id: 'ele4',
      name: 'Touch LED Desk Lamp',
      weight: '1 unit',
      price: 699,
      mrp: 999,
      discountText: '30% OFF on MRP',
      icon: '💡',
      bgColor: '#E9E9F7',
      rating: 4.4,
      reviewCount: '8.4k',
      deliveryTime: '11 mins',
    },
  ],
  Beauty: [
    {
      id: 'per1',
      name: 'Herbal Neem Face Wash, 100ml',
      weight: '100 ml',
      price: 179,
      mrp: 199,
      discountText: '10% OFF on MRP',
      icon: '🧴',
      bgColor: '#EAF6E2',
      rating: 4.6,
      reviewCount: '45.2k',
      deliveryTime: '11 mins',
    },
    {
      id: 'per2',
      name: 'Charcoal Deep Clean Face Wash',
      weight: '150 ml',
      price: 229,
      mrp: 299,
      discountText: '23% OFF on MRP',
      icon: '🧼',
      bgColor: '#EAF6E2',
      rating: 4.5,
      reviewCount: '19.8k',
      deliveryTime: '11 mins',
    },
    {
      id: 'per3',
      name: 'Hydrating Cocoa Body Lotion',
      weight: '200 ml',
      price: 249,
      mrp: 299,
      discountText: '16% OFF on MRP',
      icon: '🧴',
      bgColor: '#EAF6E2',
      rating: 4.7,
      reviewCount: '32.1k',
      deliveryTime: '11 mins',
    },
    {
      id: 'per4',
      name: 'Ultra Lightweight Sunscreen SPF50',
      weight: '50 g',
      price: 349,
      mrp: 449,
      discountText: '22% OFF on MRP',
      icon: '🧴',
      bgColor: '#EAF6E2',
      rating: 4.8,
      reviewCount: '62k',
      deliveryTime: '11 mins',
    },
  ],
  Pet: [
    {
      id: 'pet1',
      name: 'Everyday Adult Dog Food, 3kg',
      weight: '3 kg',
      price: 649,
      mrp: 749,
      discountText: '13% OFF on MRP',
      icon: '🐕',
      bgColor: '#FFF9E6',
      rating: 4.7,
      reviewCount: '18.3k',
      deliveryTime: '11 mins',
      tag: 'Freshness Verified',
    },
    {
      id: 'pet2',
      name: 'Grain-Free Puppy Starter Food',
      weight: '1.2 kg',
      price: 399,
      mrp: 499,
      discountText: '20% OFF on MRP',
      icon: '🐶',
      bgColor: '#FFF9E6',
      rating: 4.6,
      reviewCount: '9.2k',
      deliveryTime: '11 mins',
    },
    {
      id: 'pet3',
      name: 'Odor Control Clumping Cat Litter',
      weight: '5 L',
      price: 299,
      mrp: 399,
      discountText: '25% OFF on MRP',
      icon: '🐱',
      bgColor: '#FFF9E6',
      rating: 4.5,
      reviewCount: '11.4k',
      deliveryTime: '11 mins',
    },
  ],
  Kids: [
    {
      id: 'bab1',
      name: 'Baby Diapers Size M, 42 pcs',
      weight: '42 pcs',
      price: 549,
      mrp: 699,
      discountText: '21% OFF on MRP',
      icon: '🍼',
      bgColor: '#FBE2DE',
      rating: 4.8,
      reviewCount: '89k',
      deliveryTime: '11 mins',
    },
    {
      id: 'bab2',
      name: 'Gentle Fragrance-Free Baby Wipes',
      weight: '80 pcs',
      price: 149,
      mrp: 199,
      discountText: '25% OFF on MRP',
      icon: '🧻',
      bgColor: '#FBE2DE',
      rating: 4.7,
      reviewCount: '41k',
      deliveryTime: '11 mins',
    },
    {
      id: 'bab3',
      name: 'Anti-Colic Feeding Bottle, 250ml',
      weight: '1 unit',
      price: 249,
      mrp: 299,
      discountText: '16% OFF on MRP',
      icon: '🍼',
      bgColor: '#FBE2DE',
      rating: 4.6,
      reviewCount: '15.2k',
      deliveryTime: '11 mins',
    },
  ],
  Rakhi: [
    {
      id: 'rak1',
      name: 'Designer Avenger & Superhero Rakhi',
      weight: '1 set',
      price: 199,
      mrp: 299,
      discountText: '33% OFF on MRP',
      icon: '🎯',
      bgColor: '#FFF3E0',
      rating: 4.9,
      reviewCount: '24k',
      deliveryTime: '11 mins',
      tag: 'Festive Special',
    },
    {
      id: 'rak2',
      name: 'Rakhi Sweets & Dry Fruit Combo Box',
      weight: '500 g',
      price: 499,
      mrp: 699,
      discountText: '28% OFF on MRP',
      icon: '🍬',
      bgColor: '#FFF3E0',
      rating: 4.8,
      reviewCount: '17k',
      deliveryTime: '11 mins',
    },
  ],
  Decor: [
    {
      id: 'dec1',
      name: 'Ceramic Indoor Plant Pot Set',
      weight: '2 pcs',
      price: 399,
      mrp: 599,
      discountText: '33% OFF on MRP',
      icon: '🛋️',
      bgColor: '#EAF6E2',
      rating: 4.5,
      reviewCount: '6.2k',
      deliveryTime: '11 mins',
    },
    {
      id: 'dec2',
      name: 'Scented Soy Wax Candle Jar',
      weight: '200 g',
      price: 299,
      mrp: 499,
      discountText: '40% OFF on MRP',
      icon: '🕯️',
      bgColor: '#EAF6E2',
      rating: 4.7,
      reviewCount: '12.8k',
      deliveryTime: '11 mins',
    },
  ],
};

interface CategoryListingGridProps {
  categoryName: string;
  onBackToHome: () => void;
  onSelectProduct: (product: Product) => void;
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CategoryListingGrid: React.FC<CategoryListingGridProps> = ({
  categoryName,
  onBackToHome,
  onSelectProduct,
  cart,
  onAdd,
  onRemove,
}) => {
  // Normalize category name lookup
  const key =
    Object.keys(CATEGORY_PRODUCTS_DATA).find(
      (k) =>
        k.toLowerCase() === categoryName.toLowerCase() ||
        categoryName.toLowerCase().includes(k.toLowerCase())
    ) || 'Electronics';

  const products = CATEGORY_PRODUCTS_DATA[key] || CATEGORY_PRODUCTS_DATA['Electronics'];

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Category Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
          >
            ←
          </button>
          <div>
            <h2 className="text-base font-extrabold text-[#1F1F1F]">
              {categoryName}
            </h2>
            <p className="text-[11px] text-[#54B226] font-extrabold">
              {products.length} Items available • Delivered in 11 mins
            </p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="text-xs font-bold text-gray-500 hover:text-gray-900"
        >
          Close
        </button>
      </div>

      {/* Grid of Product Cards */}
      <div>
        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2.5">
          Tap any item to view full Product Details & Policy:
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={(id) => {
                  onAdd(id);
                }}
                onRemove={(id) => {
                  onRemove(id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

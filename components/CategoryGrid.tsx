'use client';

import React from 'react';
import { CategoryIcon } from './PlaceholderImages';

export interface CategoryItem {
  id: string;
  name: string;
  iconType: string;
}

export interface CategorySection {
  title: string;
  items: CategoryItem[];
}

const CATEGORY_SECTIONS: CategorySection[] = [
  {
    title: 'Grocery & Kitchen',
    items: [
      { id: 'veg', name: 'Vegetables & Fruits', iconType: 'veggies' },
      { id: 'atta', name: 'Atta, Rice & Dal', iconType: 'atta' },
      { id: 'oil', name: 'Oil, Ghee & Masala', iconType: 'oil' },
      { id: 'dairy', name: 'Dairy, Bread & Eggs', iconType: 'dairy' },
      { id: 'bakery', name: 'Bakery & Biscuits', iconType: 'bakery' },
      { id: 'dryfruits', name: 'Dry Fruits & Cereals', iconType: 'atta' },
      { id: 'meat', name: 'Chicken, Meat & Fish', iconType: 'oil' },
      { id: 'kitchenware', name: 'Kitchenware & Appliances', iconType: 'household' },
    ],
  },
  {
    title: 'Snacks & Drinks',
    items: [
      { id: 'chips', name: 'Chips & Namkeen', iconType: 'chips' },
      { id: 'sweets', name: 'Sweets & Chocolates', iconType: 'sweets' },
      { id: 'drinks', name: 'Drinks & Juices', iconType: 'drinks' },
      { id: 'tea', name: 'Tea, Coffee & Milk Drinks', iconType: 'tea' },
      { id: 'instant', name: 'Instant Food', iconType: 'instant' },
      { id: 'sauces', name: 'Sauces & Spreads', iconType: 'oil' },
      { id: 'paan', name: 'Paan Corner', iconType: 'sweets' },
      { id: 'icecream', name: 'Ice Creams & More', iconType: 'dairy' },
    ],
  },
  {
    title: 'Beauty & Personal Care',
    items: [
      { id: 'bath', name: 'Bath & Body', iconType: 'personal' },
      { id: 'hair', name: 'Hair', iconType: 'personal' },
      { id: 'skin', name: 'Skin & Face', iconType: 'personal' },
      { id: 'cosmetics', name: 'Beauty & Cosmetics', iconType: 'personal' },
      { id: 'hygiene', name: 'Feminine Hygiene', iconType: 'baby' },
      { id: 'baby', name: 'Baby Care', iconType: 'baby' },
      { id: 'pharma', name: 'Health & Pharma', iconType: 'household' },
      { id: 'wellness', name: 'Sexual Wellness', iconType: 'personal' },
    ],
  },
  {
    title: 'Household Essentials',
    items: [
      { id: 'home', name: 'Home & Lifestyle', iconType: 'household' },
      { id: 'cleaners', name: 'Cleaners & Repellents', iconType: 'household' },
      { id: 'electronics', name: 'Electronics', iconType: 'electronics' },
      { id: 'stationery', name: 'Stationery & Games', iconType: 'electronics' },
    ],
  },
];

interface CategoryGridProps {
  onCategoryClick?: (categoryName: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  return (
    <div className="space-y-6 my-4 px-4">
      {CATEGORY_SECTIONS.map((section) => (
        <div key={section.title}>
          {/* Section Header */}
          <h3 className="text-base font-extrabold text-[#1F1F1F] mb-3">
            {section.title}
          </h3>

          {/* 4-column Tile Grid */}
          <div className="grid grid-cols-4 gap-2.5">
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onCategoryClick?.(item.name)}
                className="flex flex-col items-center text-center group focus:outline-none"
              >
                {/* Tile Container with #E9F1F3 soft blue-gray background */}
                <div className="w-full aspect-square bg-[#E9F1F3] group-hover:bg-[#DFE9EB] transition-colors rounded-2xl flex items-center justify-center p-2 shadow-2xs border border-blue-900/5">
                  <CategoryIcon type={item.iconType} />
                </div>

                {/* Tile Label */}
                <span className="text-[11px] font-bold text-gray-800 leading-tight mt-1.5 line-clamp-2">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

'use client';

import React, { useState } from 'react';

export interface OrderScenario {
  orderId: string;
  categoryKey: string;
  categoryName: string;
  icon: string;
  date: string;
  failureType: 'quality' | 'proof' | 'support' | 'highvalue';
  signalQuote: string;
  kicker: string;
  title: string;
  body: string;
  productId: string;
  productName: string;
  productIcon: string;
  productColor: string;
  price: number;
  isFree?: boolean;
  reorderNote: string;
  guaranteeTag: string;
  status: 'issue' | 'resolved' | 'closed';
  buttonText: string;
}

const SAMPLE_ORDERS_INITIAL: OrderScenario[] = [
  {
    orderId: 'o1',
    categoryKey: 'pet',
    categoryName: 'Pet Supplies',
    icon: '🐾',
    date: 'Tue · first order',
    failureType: 'quality',
    signalQuote: 'This arrived already expired, had to throw the whole bag away.',
    kicker: 'ABOUT YOUR PET SUPPLIES ORDER',
    title: "That bag shouldn't have reached you like that.",
    body: "We've flagged this batch and moved your area to freshness-verified sourcing for pet supplies.",
    productId: 'pet1',
    productName: 'Everyday Adult Dog Food, 3kg',
    productIcon: '🐕',
    productColor: '#FFF9E6',
    price: 649,
    reorderNote: 'Verified-fresh batch · packed today',
    guaranteeTag: 'Freshness-verified · replace-first if this happens again',
    status: 'issue',
    buttonText: 'Try Pet Supplies again',
  },
  {
    orderId: 'o2',
    categoryKey: 'personal',
    categoryName: 'Personal Care',
    icon: '🧴',
    date: 'Mon · first order',
    failureType: 'proof',
    signalQuote: "Wasn't sure about this one, no reviews on the app to check before buying.",
    kicker: 'ABOUT YOUR PERSONAL CARE ORDER',
    title: "You weren't wrong to want proof first.",
    body: '1,240 verified buyers near you rated this exact product 4.4★ in the last 30 days.',
    productId: 'per1',
    productName: 'Herbal Face Wash, 100ml',
    productIcon: '🧼',
    productColor: '#EAF6E2',
    price: 179,
    reorderNote: '1,240 verified buyers · 4.4★ near you',
    guaranteeTag: 'Verified-buyer proof now shown on every listing',
    status: 'issue',
    buttonText: 'Try Personal Care again',
  },
  {
    orderId: 'o3',
    categoryKey: 'baby',
    categoryName: 'Baby Products',
    icon: '🍼',
    date: 'Sun · first order',
    failureType: 'support',
    signalQuote: 'Raised a ticket about a torn pack, support closed it without actually fixing anything.',
    kicker: 'ABOUT YOUR BABY PRODUCTS TICKET',
    title: "That ticket shouldn't have closed like that.",
    body: "We reopened it. Aditi from resolutions is your direct contact if it isn't right this time.",
    productId: 'bab1',
    productName: 'Baby Diapers, Size M, 42 pcs',
    productIcon: '🍼',
    productColor: '#FBE2DE',
    price: 0,
    isFree: true,
    reorderNote: 'Free replacement · ticket #48213 reopened',
    guaranteeTag: 'Named contact assigned · replacement free',
    status: 'issue',
    buttonText: 'Try Baby Products again',
  },
  {
    orderId: 'o4',
    categoryKey: 'electronics',
    categoryName: 'Electronics',
    icon: '🔌',
    date: 'Thu · first order',
    failureType: 'highvalue',
    signalQuote: 'Kept adding it to cart and removing it, too much money to risk if something\'s wrong.',
    kicker: 'ABOUT YOUR ELECTRONICS ORDER',
    title: "A big-ticket item shouldn't be a gamble.",
    body: 'Every electronics order now carries a plain 10-day money-back guarantee, shown before you pay.',
    productId: 'ele1',
    productName: 'Compact Air Fryer, 4.1L',
    productIcon: '🍳',
    productColor: '#E9E9F7',
    price: 5499,
    reorderNote: '10-day money-back guarantee applied',
    guaranteeTag: '10-day money-back · applied automatically',
    status: 'issue',
    buttonText: 'Try Electronics again',
  },
];

interface OrderAgainScreenProps {
  onShowToast: (msg: string) => void;
  orders: OrderScenario[];
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string) => void;
  onConvertOrder: (orderId: string) => void;
  onRetireOrder: (orderId: string) => void;
  isDiagnosing: boolean;
}

export const OrderAgainScreen: React.FC<OrderAgainScreenProps> = ({
  onShowToast,
  orders,
  selectedOrderId,
  onSelectOrder,
  onConvertOrder,
  onRetireOrder,
  isDiagnosing,
}) => {
  const selectedOrder = orders.find((o) => o.orderId === selectedOrderId);

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Customer-Facing Header (NO LCER or Internal Terms) */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1F1F1F]">Your Orders</h2>
          <p className="text-xs text-gray-500 font-medium">
            Delivering to • Bandra West
          </p>
        </div>
        <div className="text-xs font-bold text-gray-400">
          {orders.length} Past Orders
        </div>
      </div>

      {/* Customer Orders List */}
      <div className="space-y-2.5">
        <div className="text-xs font-extrabold text-[#1F1F1F] tracking-wide">
          Recent Purchases
        </div>

        {orders.map((o) => {
          const isSelected = selectedOrderId === o.orderId;
          return (
            <div
              key={o.orderId}
              onClick={() => onSelectOrder(o.orderId)}
              className={`bg-white rounded-2xl border p-3.5 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#54B226] shadow-md ring-2 ring-[#54B226]/20'
                  : 'border-gray-200 hover:border-gray-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFFBF2] border border-amber-200 flex items-center justify-center text-xl shrink-0">
                    {o.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">
                      {o.categoryName}
                    </h4>
                    <p className="text-[11px] text-gray-500">Delivered {o.date}</p>
                  </div>
                </div>

                <div>
                  {o.status === 'issue' ? (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                      Needs attention
                    </span>
                  ) : o.status === 'resolved' ? (
                    <span className="bg-[#EAF6E2] text-[#3E8A1C] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#54B226]/30">
                      Reordered ✓
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Order Detail Card (Pure Customer-Facing Language) */}
      {selectedOrder && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-300 p-4 shadow-xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedOrder.icon}</span>
              <h3 className="text-sm font-extrabold text-[#1F1F1F]">
                {selectedOrder.categoryName} Order
              </h3>
            </div>
            <button
              onClick={() => onSelectOrder('')}
              className="text-gray-400 hover:text-gray-700 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {selectedOrder.status === 'resolved' ? (
            <div className="bg-[#EAF6E2] border border-[#54B226]/30 rounded-xl p-4 text-center space-y-2 animate-fade-in">
              <span className="text-3xl">🎉</span>
              <h4 className="text-xs font-extrabold text-[#3E8A1C]">
                Reorder Confirmed for {selectedOrder.categoryName}
              </h4>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                Your order is packed and delivering in 11 minutes. Guarantee applied.
              </p>
              <button
                disabled
                className="w-full bg-gray-300 text-gray-600 font-extrabold text-xs py-2 px-3 rounded-xl cursor-not-allowed"
              >
                Reordered ✓
              </button>
            </div>
          ) : selectedOrder.status === 'closed' ? (
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-center space-y-2 animate-fade-in">
              <span className="text-3xl">📦</span>
              <h4 className="text-xs font-bold text-gray-700">
                Order Closed
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                This order summary has been closed.
              </p>
            </div>
          ) : isDiagnosing ? (
            <div className="py-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-600">
                <span>Checking order details...</span>
              </div>
            </div>
          ) : (
            /* Pure Customer-Facing Card */
            <div className="bg-gradient-to-br from-[#1F1F1F] via-[#2B2B2B] to-[#141414] text-white rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden">
              {/* Kicker */}
              <div className="text-[10px] font-bold text-[#F8CB45] uppercase tracking-widest">
                {selectedOrder.kicker}
              </div>

              {/* Title stating what happened */}
              <h4 className="text-base font-extrabold leading-snug">
                {selectedOrder.title}
              </h4>

              {/* Body explaining the specific fix in one sentence */}
              <p className="text-xs text-white/80 leading-relaxed">
                {selectedOrder.body}
              </p>

              {/* Product Reorder Preview */}
              <div className="bg-white/10 border border-white/15 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: selectedOrder.productColor }}
                  >
                    {selectedOrder.productIcon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {selectedOrder.productName}
                    </div>
                    <div className="text-[10px] text-[#F8CB45] font-mono">
                      {selectedOrder.reorderNote}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-white">
                    {selectedOrder.isFree ? (
                      <span className="text-[#54B226]">FREE</span>
                    ) : (
                      `₹${selectedOrder.price}`
                    )}
                  </div>
                </div>
              </div>

              {/* Guarantee Tag */}
              <div className="bg-white/5 border border-dashed border-white/20 rounded-lg p-2 text-center text-[10px] font-mono text-white/90">
                🛡️ {selectedOrder.guaranteeTag}
              </div>

              {/* Single Main Button & Ghost Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onConvertOrder(selectedOrder.orderId)}
                  className="flex-1 bg-[#54B226] hover:bg-[#3E8A1C] text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all active:scale-95 text-center"
                >
                  {selectedOrder.buttonText}
                </button>

                <button
                  onClick={() => onRetireOrder(selectedOrder.orderId)}
                  className="bg-white/10 hover:bg-white/20 text-white/80 font-bold text-xs py-2.5 px-3 rounded-xl transition-all text-center"
                >
                  Not now
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

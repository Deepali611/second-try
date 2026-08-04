'use client';

import React, { useState } from 'react';

export interface OrderScenario {
  orderId: string;
  categoryKey: string;
  categoryName: string;
  icon: string;
  date: string;
  failureType: 'quality' | 'proof' | 'support' | 'highvalue';
  diagnosis: string;
  confidence: string;
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
  isLiveDiagnosis?: boolean;
  liveModelUsed?: string;
  liveReasoning?: string;
}

const STATIC_FALLBACK_MAP: Record<string, 'quality' | 'proof' | 'support' | 'highvalue'> = {
  quality_expiry: 'quality',
  quality: 'quality',
  no_proof: 'proof',
  proof: 'proof',
  support_unresolved: 'support',
  support: 'support',
  high_value_hesitation: 'highvalue',
  highvalue: 'highvalue',
};

const SAMPLE_ORDERS_INITIAL: OrderScenario[] = [
  {
    orderId: 'o1',
    categoryKey: 'pet',
    categoryName: 'Pet Supplies',
    icon: '🐾',
    date: 'Tue · first order',
    failureType: 'quality',
    diagnosis: 'Quality / expiry',
    confidence: 'high',
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
  },
  {
    orderId: 'o2',
    categoryKey: 'personal',
    categoryName: 'Personal Care',
    icon: '🧴',
    date: 'Mon · first order',
    failureType: 'proof',
    diagnosis: 'No proof before buying',
    confidence: 'medium-high',
    signalQuote: "Wasn't sure about this one, no reviews on the app to check before buying.",
    kicker: 'ABOUT PERSONAL CARE',
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
  },
  {
    orderId: 'o3',
    categoryKey: 'baby',
    categoryName: 'Baby Products',
    icon: '🍼',
    date: 'Sun · first order',
    failureType: 'support',
    diagnosis: 'Support unresolved',
    confidence: 'high',
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
  },
  {
    orderId: 'o4',
    categoryKey: 'electronics',
    categoryName: 'Electronics',
    icon: '🔌',
    date: 'Thu · first order',
    failureType: 'highvalue',
    diagnosis: 'High-value hesitation',
    confidence: 'medium',
    signalQuote: 'Kept adding it to cart and removing it, too much money to risk if something\'s wrong.',
    kicker: 'ABOUT ELECTRONICS',
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
  },
];

interface OrderAgainScreenProps {
  onShowToast: (msg: string) => void;
}

export const OrderAgainScreen: React.FC<OrderAgainScreenProps> = ({ onShowToast }) => {
  const [orders, setOrders] = useState<OrderScenario[]>(SAMPLE_ORDERS_INITIAL);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [recoveredCount, setRecoveredCount] = useState(0);

  // Custom Complaint Input State
  const [customComplaintText, setCustomComplaintText] = useState('');

  const selectedOrder = orders.find((o) => o.orderId === selectedOrderId);

  const handleSelectOrder = async (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return;

    setSelectedOrderId(orderId);

    if (order.status === 'issue') {
      setIsDiagnosing(true);

      try {
        const res = await fetch('/api/diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ complaintText: order.signalQuote }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.category && data.category !== 'none') {
            const mappedType = STATIC_FALLBACK_MAP[data.category] || order.failureType;

            setOrders((prev) =>
              prev.map((item) =>
                item.orderId === orderId
                  ? {
                      ...item,
                      failureType: mappedType,
                      diagnosis: data.category.replace('_', ' / '),
                      confidence: data.confidence || 'high',
                      signalQuote: data.grounding_quote
                        ? data.grounding_quote
                        : item.signalQuote,
                      isLiveDiagnosis: true,
                      liveModelUsed: data.modelUsed || 'Groq AI Model',
                      liveReasoning: data.reasoning,
                    }
                  : item
              )
            );
          }
        }
      } catch (err) {
        console.warn('Live API call failed, using static fallback:', err);
      } finally {
        setTimeout(() => {
          setIsDiagnosing(false);
        }, 400);
      }
    }
  };

  const handleCustomDiagnosis = async () => {
    if (!customComplaintText.trim()) return;

    setIsDiagnosing(true);
    const targetOrderId = selectedOrderId || 'o1';

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintText: customComplaintText.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        const mappedType = STATIC_FALLBACK_MAP[data.category] || 'quality';

        setOrders((prev) =>
          prev.map((item) =>
            item.orderId === targetOrderId
              ? {
                  ...item,
                  failureType: mappedType,
                  diagnosis: data.category
                    ? data.category.replace('_', ' / ')
                    : 'Quality / expiry',
                  confidence: data.confidence || 'high',
                  signalQuote: customComplaintText.trim(),
                  isLiveDiagnosis: true,
                  liveModelUsed: data.modelUsed || 'Groq AI Model',
                  liveReasoning: data.reasoning,
                }
              : item
          )
        );
        setSelectedOrderId(targetOrderId);
        onShowToast('Diagnosed via Live Groq AI Model ✓');
      } else {
        onShowToast('Using offline scenario fallback');
      }
    } catch (err) {
      console.warn('Custom diagnosis call failed:', err);
      onShowToast('Using offline scenario fallback');
    } finally {
      setIsDiagnosing(false);
    }
  };

  // ONE-TAP REORDER ACTION
  const handleConvert = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order || order.status !== 'issue') return;

    // 1. Mark order as resolved (disables re-triggering / repeating)
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: 'resolved' } : o))
    );

    // 2. Increment recovered counter
    setRecoveredCount((prev) => prev + 1);

    // 3. Show success toast
    onShowToast(`✓ Second order placed — welcome back to ${order.categoryName}!`);
  };

  // CARD RETIRE ACTION
  const handleRetire = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order || order.status !== 'issue') return;

    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: 'closed' } : o))
    );

    onShowToast('Card retired — one-try guardrail active');
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#1F1F1F]">Your Orders</h2>
          <p className="text-xs text-gray-500 font-medium">
            Second Try AI Recovery Engine
          </p>
        </div>
        <div className="bg-[#FFFBF2] border border-amber-300 rounded-xl px-3 py-1.5 text-right shadow-2xs">
          <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">
            LCER Recovered
          </div>
          <div className="text-lg font-black text-[#54B226] leading-none">
            {recoveredCount} / 4
          </div>
        </div>
      </div>

      {/* Metric explanation card */}
      <div className="bg-gradient-to-r from-[#EAF6E2] to-[#F4FAEF] border border-[#54B226]/30 rounded-2xl p-3.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <div>
            <h4 className="text-xs font-extrabold text-[#3E8A1C]">
              Lapsed Category Expander Recovery Rate (LCER)
            </h4>
            <p className="text-[11px] text-gray-700 mt-0.5 leading-snug">
              Each <strong className="text-black">"Give it another try"</strong> tap simulates a lapsed trier converting into a repeat category purchaser.
            </p>
          </div>
        </div>
      </div>

      {/* Live AI Free-Text Complaint Tester Box */}
      <div className="bg-gray-900 text-white rounded-2xl p-3.5 space-y-2 border border-gray-800 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-[#F8CB45] flex items-center gap-1">
            <span>⚡</span> Live AI Complaint Tester (/api/diagnose)
          </span>
          <span className="text-[10px] text-gray-400 font-mono">Groq Llama 3.3</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customComplaintText}
            onChange={(e) => setCustomComplaintText(e.target.value)}
            placeholder="Type any complaint (e.g. expired item, no reviews, ticket closed)..."
            className="flex-1 bg-white/10 text-white text-xs px-3 py-2 rounded-xl placeholder-gray-400 focus:outline-none border border-white/10 focus:border-[#54B226]"
          />
          <button
            onClick={handleCustomDiagnosis}
            disabled={!customComplaintText.trim() || isDiagnosing}
            className="bg-[#54B226] hover:bg-[#3E8A1C] disabled:bg-gray-700 text-white font-extrabold text-xs px-3 py-2 rounded-xl transition-all shrink-0"
          >
            Diagnose Live
          </button>
        </div>
      </div>

      {/* Scenario Filter Quick Selector */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
          Simulate incoming complaint signals:
        </div>

        <div className="grid grid-cols-2 gap-2">
          {orders.map((o) => (
            <button
              key={o.orderId}
              onClick={() => handleSelectOrder(o.orderId)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedOrderId === o.orderId
                  ? 'border-[#54B226] bg-[#EAF6E2]/50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{o.icon}</span>
                <div>
                  <div className="text-xs font-bold text-gray-900 truncate">
                    {o.categoryName}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    {o.diagnosis}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-2.5">
        <div className="text-xs font-extrabold text-[#1F1F1F] tracking-wide">
          Recent Purchases
        </div>

        {orders.map((o) => {
          const isSelected = selectedOrderId === o.orderId;
          return (
            <div
              key={o.orderId}
              onClick={() => handleSelectOrder(o.orderId)}
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

                <div className="flex items-center gap-1.5">
                  {o.isLiveDiagnosis && (
                    <span className="bg-emerald-100 text-emerald-900 text-[9px] font-black px-1.5 py-0.5 rounded border border-emerald-300">
                      Live AI
                    </span>
                  )}
                  {o.status === 'issue' ? (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                      Needs attention
                    </span>
                  ) : o.status === 'resolved' ? (
                    <span className="bg-[#EAF6E2] text-[#3E8A1C] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#54B226]/30">
                      Second Try used ✓
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Card retired
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Order Detail / Diagnosis & Second Try Modal Card */}
      {selectedOrder && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-300 p-4 shadow-xl space-y-3 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedOrder.icon}</span>
              <h3 className="text-sm font-extrabold text-[#1F1F1F]">
                {selectedOrder.categoryName} Diagnosis
              </h3>
            </div>
            <button
              onClick={() => setSelectedOrderId(null)}
              className="text-gray-400 hover:text-gray-700 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {selectedOrder.status === 'resolved' ? (
            /* DISABLE REPEATING RECOVERY BANNER */
            <div className="bg-[#EAF6E2] border border-[#54B226]/30 rounded-xl p-4 text-center space-y-2 animate-fade-in">
              <span className="text-3xl">🎉</span>
              <h4 className="text-xs font-extrabold text-[#3E8A1C]">
                Second Try Already Converted for {selectedOrder.categoryName}
              </h4>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                One recovery per lapsed category — this customer already converted into a repeat purchaser. No repeat sends allowed by the guardrail.
              </p>
              <div className="pt-1">
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-600 font-extrabold text-xs py-2 px-3 rounded-xl cursor-not-allowed"
                >
                  Recovery Completed ✓ (Disabled)
                </button>
              </div>
            </div>
          ) : selectedOrder.status === 'closed' ? (
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-center space-y-2 animate-fade-in">
              <span className="text-3xl">🛡️</span>
              <h4 className="text-xs font-bold text-gray-700">
                One-Try Guardrail Enforced
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                You selected "Not now". The system retired the card and will not nag or re-fire automatically.
              </p>
            </div>
          ) : isDiagnosing ? (
            /* Animated AI Diagnosis Beat */
            <div className="py-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-gray-600">
                <span>Calling /api/diagnose engine</span>
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#54B226] rounded-full animate-ping" />
                  <span className="w-1.5 h-1.5 bg-[#54B226] rounded-full animate-ping delay-150" />
                  <span className="w-1.5 h-1.5 bg-[#54B226] rounded-full animate-ping delay-300" />
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                Model classifying complaint into taxonomy...
              </p>
            </div>
          ) : (
            /* Full Second Try Card */
            <div className="space-y-3">
              {/* Grounded Quote Box */}
              <div className="bg-[#FFFBF2] border border-amber-200 rounded-xl p-3 text-xs font-mono text-amber-950">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                    Grounded Signal Quote
                  </span>
                  {selectedOrder.isLiveDiagnosis ? (
                    <span className="text-[9px] font-bold bg-[#54B226] text-white px-1.5 py-0.2 rounded">
                      Live /api/diagnose
                    </span>
                  ) : (
                    <span className="text-[9px] text-gray-500 font-sans">
                      Offline Scenario
                    </span>
                  )}
                </div>
                "{selectedOrder.signalQuote}"
                {selectedOrder.liveReasoning && (
                  <div className="text-[10px] text-gray-600 font-sans mt-1.5 pt-1.5 border-t border-amber-200">
                    <strong className="text-black">Reasoning: </strong>
                    {selectedOrder.liveReasoning}
                  </div>
                )}
              </div>

              {/* Match Line */}
              <div className="flex items-center justify-between text-xs font-mono bg-gray-900 text-[#F8CB45] px-3 py-2 rounded-xl">
                <span>match → {selectedOrder.diagnosis}</span>
                <span className="text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded">
                  confidence: {selectedOrder.confidence}
                </span>
              </div>

              {/* Second Try Personalized Recommendation Card */}
              <div className="bg-gradient-to-br from-[#1F1F1F] via-[#2B2B2B] to-[#141414] text-white rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden">
                <div className="text-[10px] font-mono font-bold text-[#F8CB45] uppercase tracking-widest">
                  {selectedOrder.kicker}
                </div>

                <h4 className="text-base font-extrabold leading-snug">
                  {selectedOrder.title}
                </h4>

                <p className="text-xs text-white/80 leading-relaxed">
                  {selectedOrder.body}
                </p>

                {/* One-tap Reorder Item Preview */}
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

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleConvert(selectedOrder.orderId)}
                    className="flex-1 bg-[#54B226] hover:bg-[#3E8A1C] text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all active:scale-95 text-center"
                  >
                    Give it another try — Reorder now
                  </button>

                  <button
                    onClick={() => handleRetire(selectedOrder.orderId)}
                    className="bg-white/10 hover:bg-white/20 text-white/80 font-bold text-xs py-2.5 px-3 rounded-xl transition-all text-center"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

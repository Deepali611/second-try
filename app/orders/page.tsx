'use client';

import React, { useState } from 'react';
import { BlinkitHeader } from '@/components/BlinkitHeader';
import { BottomNav } from '@/components/BottomNav';
import { OrderAgainScreen, OrderScenario } from '@/components/OrderAgainScreen';
import { EvaluatorPanel } from '@/components/EvaluatorPanel';
import { FailureType } from '@/components/ProductDetailSheet';

const INITIAL_ORDERS: OrderScenario[] = [
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

export default function OrdersPage() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Evaluator Panel State
  const [diagnosedFailure, setDiagnosedFailure] = useState<FailureType>(null);
  const [orders, setOrders] = useState<OrderScenario[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [recoveredCount, setRecoveredCount] = useState(0);
  const [customComplaintText, setCustomComplaintText] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const handleConvertOrder = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order || order.status !== 'issue') return;

    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: 'resolved' } : o))
    );
    setRecoveredCount((prev) => prev + 1);
    showToast(`✓ Second order placed — welcome back to ${order.categoryName}!`);
  };

  const handleRetireOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: 'closed' } : o))
    );
    showToast('Order summary closed');
  };

  const handleRunCustomDiagnosis = async () => {
    if (!customComplaintText.trim()) return;

    setIsDiagnosing(true);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintText: customComplaintText.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        showToast(`Diagnosed as ${data.category} via Live Groq AI Model ✓`);
      } else {
        showToast('Using offline scenario fallback');
      }
    } catch (err) {
      showToast('Using offline scenario fallback');
    } finally {
      setIsDiagnosing(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF2] text-[#1F1F1F] font-sans antialiased py-6 px-4 selection:bg-[#F8CB45] selection:text-black">
      {/* Desktop Responsive Layout: Phone Frame Left + Evaluator Panel Right */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8">
        
        {/* Customer-Facing Mobile App Phone Frame */}
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative border-x border-gray-200 rounded-[36px] overflow-hidden shrink-0 mx-auto lg:mx-0">
          {/* App Top Bar Header */}
          <BlinkitHeader
            activeTab={activeHeaderTab}
            onTabChange={setActiveHeaderTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Order Again Main View */}
          <main className="pb-8">
            <OrderAgainScreen
              onShowToast={showToast}
              orders={orders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={setSelectedOrderId}
              onConvertOrder={handleConvertOrder}
              onRetireOrder={handleRetireOrder}
              isDiagnosing={false}
            />
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

        {/* Separated Evaluator & Grading Panel (Outside Phone Frame) */}
        <EvaluatorPanel
          diagnosedFailure={diagnosedFailure}
          onSelectPolicyFailure={setDiagnosedFailure}
          recoveredCount={recoveredCount}
          totalOrdersCount={orders.length}
          customComplaintText={customComplaintText}
          onCustomComplaintChange={setCustomComplaintText}
          onRunCustomDiagnosis={handleRunCustomDiagnosis}
          isDiagnosing={isDiagnosing}
        />

      </div>
    </div>
  );
}

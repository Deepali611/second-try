'use client';

import React, { useEffect, useState } from 'react';
import { BlinkitHeader } from '@/components/BlinkitHeader';
import { BottomNav } from '@/components/BottomNav';
import {
  OrderAgainScreen,
  ComputedOrderScenario,
  SEED_COMPLAINTS,
  classifyComplaintAlgorithm,
  computeCardFromDiagnosis,
} from '@/components/OrderAgainScreen';
import { EvaluatorPanel } from '@/components/EvaluatorPanel';
import { FailureType } from '@/components/ProductDetailSheet';

export default function OrdersPage() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Evaluator Panel State
  const [diagnosedFailure, setDiagnosedFailure] = useState<FailureType>(null);
  
  // Orders State (Initial Loading Skeletons for computed data)
  const [orders, setOrders] = useState<ComputedOrderScenario[]>(() =>
    SEED_COMPLAINTS.map((seed) => {
      const initialComputed = computeCardFromDiagnosis(seed.categoryName, 'quality_expiry');
      return {
        ...seed,
        ...initialComputed,
        isDiagnosing: true,
      };
    })
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('o1');
  const [recoveredCount, setRecoveredCount] = useState(0);

  // Evaluator Panel Live AI State
  const [customComplaintText, setCustomComplaintText] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // AUTOMATIC DATA-DERIVED DIAGNOSIS ON MOUNT FOR /orders
  useEffect(() => {
    let isMounted = true;

    async function diagnoseAllOrders() {
      for (const seed of SEED_COMPLAINTS) {
        try {
          const res = await fetch('/api/diagnose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaintText: seed.complaintText }),
          });

          if (res.ok) {
            const data = await res.json();
            if (isMounted && data && data.category) {
              const cardCopy = computeCardFromDiagnosis(seed.categoryName, data.category);
              setOrders((prev) =>
                prev.map((o) =>
                  o.orderId === seed.orderId
                    ? {
                        ...o,
                        ...cardCopy,
                        failureCategory: data.category,
                        groundingQuote: data.grounding_quote,
                        confidence: data.confidence,
                        reasoning: data.reasoning,
                        modelUsed: data.modelUsed || 'Groq AI Model',
                        isDiagnosing: false,
                      }
                    : o
                )
              );
            }
          } else {
            const fallback = classifyComplaintAlgorithm(seed.complaintText);
            const cardCopy = computeCardFromDiagnosis(seed.categoryName, fallback.category);
            if (isMounted) {
              setOrders((prev) =>
                prev.map((o) =>
                  o.orderId === seed.orderId
                    ? {
                        ...o,
                        ...cardCopy,
                        failureCategory: fallback.category,
                        groundingQuote: fallback.grounding_quote,
                        confidence: fallback.confidence,
                        reasoning: fallback.reasoning,
                        modelUsed: 'Local Classifier Algorithm',
                        isDiagnosing: false,
                      }
                    : o
                )
              );
            }
          }
        } catch (err) {
          const fallback = classifyComplaintAlgorithm(seed.complaintText);
          const cardCopy = computeCardFromDiagnosis(seed.categoryName, fallback.category);
          if (isMounted) {
            setOrders((prev) =>
              prev.map((o) =>
                o.orderId === seed.orderId
                  ? {
                      ...o,
                      ...cardCopy,
                      failureCategory: fallback.category,
                      groundingQuote: fallback.grounding_quote,
                      confidence: fallback.confidence,
                      reasoning: fallback.reasoning,
                      modelUsed: 'Local Classifier Algorithm',
                      isDiagnosing: false,
                    }
                  : o
                )
              );
          }
        }
      }
    }

    diagnoseAllOrders();

    return () => {
      isMounted = false;
    };
  }, []);

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
          orders={orders}
          selectedOrderId={selectedOrderId}
          onSelectOrder={setSelectedOrderId}
        />

      </div>
    </div>
  );
}

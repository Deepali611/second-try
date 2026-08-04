'use client';

import React, { useState } from 'react';
import { BlinkitHeader } from '@/components/BlinkitHeader';
import { PromoBanners } from '@/components/PromoBanners';
import { ProductCard, Product } from '@/components/ProductCard';
import { CategoryGrid } from '@/components/CategoryGrid';
import { BottomNav } from '@/components/BottomNav';
import { OrderAgainScreen, OrderScenario } from '@/components/OrderAgainScreen';
import { ProductDetailSheet, FailureType } from '@/components/ProductDetailSheet';
import { CategoryListingGrid } from '@/components/CategoryListingGrid';
import { EvaluatorPanel } from '@/components/EvaluatorPanel';

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

export default function Home() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Category Listing Grid View State
  const [selectedCategoryListing, setSelectedCategoryListing] = useState<string | null>(null);

  // PDP Sheet State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPdpOpen, setIsPdpOpen] = useState(false);
  const [diagnosedFailure, setDiagnosedFailure] = useState<FailureType>(null);

  // Orders State
  const [orders, setOrders] = useState<OrderScenario[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [recoveredCount, setRecoveredCount] = useState(0);

  // Evaluator Panel Live AI State
  const [customComplaintText, setCustomComplaintText] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);

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

  const handleHeaderTabChange = (tabId: string) => {
    setActiveHeaderTab(tabId);
    if (tabId === 'All') {
      setSelectedCategoryListing(null);
    } else {
      setSelectedCategoryListing(tabId);
    }
  };

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
        const mappedType: FailureType = data.category
          ? (data.category.replace('_expiry', '').replace('_unresolved', '').replace('_hesitation', '') as FailureType)
          : 'quality';

        setDiagnosedFailure(mappedType);
        showToast(`Diagnosed as ${data.category} via Live Groq AI Model ✓`);
        if (!selectedProduct) setSelectedProduct(PREVIOUSLY_BOUGHT_PRODUCTS[0]);
        setIsPdpOpen(true);
      } else {
        showToast('Using offline scenario fallback');
      }
    } catch (err) {
      console.warn('Custom diagnosis call failed:', err);
      showToast('Using offline scenario fallback');
    } finally {
      setIsDiagnosing(false);
    }
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
    <div className="min-h-screen bg-[#FFFBF2] text-[#1F1F1F] font-sans antialiased py-6 px-4 selection:bg-[#F8CB45] selection:text-black">
      {/* Desktop Responsive Layout: Phone Frame Left + Evaluator Panel Right */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8">
        
        {/* Customer-Facing Mobile App Phone Frame */}
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative border-x border-gray-200 rounded-[36px] overflow-hidden shrink-0 mx-auto lg:mx-0">
          
          {/* App Top Bar Header */}
          <BlinkitHeader
            activeTab={activeHeaderTab}
            onTabChange={handleHeaderTabChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* View Switcher: Order Again vs Category Product Listing vs Main Home View */}
          {activeNavTab === 'order-again' ? (
            <OrderAgainScreen
              onShowToast={showToast}
              orders={orders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={setSelectedOrderId}
              onConvertOrder={handleConvertOrder}
              onRetireOrder={handleRetireOrder}
              isDiagnosing={false}
            />
          ) : selectedCategoryListing ? (
            /* Category Product-Listing Grid View */
            <CategoryListingGrid
              categoryName={selectedCategoryListing}
              onBackToHome={() => {
                setSelectedCategoryListing(null);
                setActiveHeaderTab('All');
              }}
              onSelectProduct={(product) => handleOpenPdp(product, diagnosedFailure)}
              cart={cart}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          ) : (
            /* Main Home View */
            <main className="pb-8">
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
                  setSelectedCategoryListing(cat);
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
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#1F1F1F] text-[#F8CB45] text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in border border-[#F8CB45]/20">
              <span className="w-2 h-2 rounded-full bg-[#54B226]" />
              {toastMessage}
            </div>
          )}

          {/* Floating Bottom Navigation */}
          <BottomNav
            activeTab={activeNavTab}
            onNavChange={(tab) => {
              setActiveNavTab(tab);
              if (tab === 'home') {
                setSelectedCategoryListing(null);
              }
            }}
            cartCount={totalCartCount}
            cartTotal={totalCartPrice}
            onOpenCart={() => showToast(`Opening cart: ${totalCartCount} items (₹${totalCartPrice})`)}
          />
        </div>

        {/* Separated Evaluator & Grading Panel (Outside Phone Frame) */}
        <EvaluatorPanel
          diagnosedFailure={diagnosedFailure}
          onSelectPolicyFailure={(failure) => {
            setDiagnosedFailure(failure);
            if (!selectedProduct) setSelectedProduct(PREVIOUSLY_BOUGHT_PRODUCTS[0]);
            setIsPdpOpen(true);
          }}
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

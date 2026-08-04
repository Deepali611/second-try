'use client';

import React from 'react';
import { FailureType } from './ProductDetailSheet';
import { ComputedOrderScenario } from './OrderAgainScreen';

interface EvaluatorPanelProps {
  diagnosedFailure: FailureType;
  onSelectPolicyFailure: (failure: FailureType) => void;
  recoveredCount: number;
  totalOrdersCount: number;
  customComplaintText: string;
  onCustomComplaintChange: (text: string) => void;
  onRunCustomDiagnosis: () => void;
  isDiagnosing: boolean;
  orders?: ComputedOrderScenario[];
  selectedOrderId?: string | null;
  onSelectOrder?: (orderId: string) => void;
}

export const EvaluatorPanel: React.FC<EvaluatorPanelProps> = ({
  diagnosedFailure,
  onSelectPolicyFailure,
  recoveredCount,
  totalOrdersCount,
  customComplaintText,
  onCustomComplaintChange,
  onRunCustomDiagnosis,
  isDiagnosing,
  orders = [],
  selectedOrderId,
  onSelectOrder,
}) => {
  const selectedOrder = orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  return (
    <aside className="w-full max-w-sm bg-gradient-to-b from-[#FFFBF2] to-amber-50/60 border-2 border-dashed border-amber-300 rounded-3xl p-5 shadow-sm space-y-5">
      {/* Evaluator Panel Header */}
      <div className="border-b border-amber-200/80 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🧪</span> EVALUATOR PANEL
          </span>
          <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
            Grading & Testing Tooling
          </span>
        </div>
        <p className="text-[11px] text-amber-800 font-medium mt-1 leading-snug">
          This panel is for evaluator testing only. All UI inside the phone frame contains 100% real Blinkit customer-facing language.
        </p>
      </div>

      {/* 1. Live Diagnosis Inspection per Seed Order */}
      {orders.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-gray-900 flex items-center gap-1">
              <span>🤖</span> Data-Derived Diagnosis Engine
            </span>
            <span className="text-[10px] text-gray-500 font-mono">/api/diagnose</span>
          </div>
          <p className="text-[11px] text-gray-600">
            Diagnosis is computed dynamically from each order's <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10px]">complaintText</code> on page load:
          </p>

          {/* Seed Order Selector Chips */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {orders.map((o) => (
              <button
                key={o.orderId}
                onClick={() => onSelectOrder?.(o.orderId)}
                className={`text-[11px] font-bold p-2 rounded-xl border text-left transition-all ${
                  selectedOrderId === o.orderId
                    ? 'bg-gray-900 text-[#F8CB45] border-gray-900 shadow-2xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{o.icon}</span>
                  <span className="truncate">{o.categoryName}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Inspected Order Diagnosis Details */}
          {selectedOrder && (
            <div className="bg-gray-900 text-white rounded-2xl p-3.5 space-y-2 text-xs font-mono border border-gray-800 shadow-inner mt-2">
              <div className="flex items-center justify-between text-[10px] text-[#F8CB45]">
                <span className="font-extrabold uppercase">Computed /api/diagnose Output</span>
                {selectedOrder.isDiagnosing ? (
                  <span className="text-blue-400 animate-pulse">Running API...</span>
                ) : (
                  <span className="bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded text-[9px]">
                    {selectedOrder.modelUsed || 'Groq AI Model'}
                  </span>
                )}
              </div>

              <div className="bg-white/10 rounded-xl p-2 text-[11px]">
                <span className="text-gray-400">Input complaintText:</span>
                <div className="text-white font-sans text-xs italic mt-0.5">
                  "{selectedOrder.complaintText}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                  <span className="text-gray-400 block">Classified Category:</span>
                  <strong className="text-[#F8CB45] text-xs">
                    {selectedOrder.failureCategory || selectedOrder.failureType}
                  </strong>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                  <span className="text-gray-400 block">Confidence:</span>
                  <strong className="text-emerald-400 text-xs">
                    {selectedOrder.confidence || 'high'}
                  </strong>
                </div>
              </div>

              {selectedOrder.groundingQuote && (
                <div className="text-[10px] text-gray-300 border-t border-white/10 pt-1.5">
                  <span className="text-gray-400">Grounding Quote: </span>
                  <span className="text-[#F8CB45]">"{selectedOrder.groundingQuote}"</span>
                </div>
              )}

              {selectedOrder.reasoning && (
                <div className="text-[10px] text-gray-300 font-sans leading-tight">
                  <strong className="text-white">Reasoning: </strong>
                  {selectedOrder.reasoning}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. PDP Policy Simulator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-gray-900 flex items-center gap-1">
            <span>🔍</span> PDP Policy Simulator
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Spec §3b</span>
        </div>
        <p className="text-[11px] text-gray-600">
          Select a failure state to test how the PDP sheet policy row personalizes dynamically:
        </p>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {(
            [
              { id: null, label: 'Default Blinkit' },
              { id: 'quality', label: 'Quality / Expiry' },
              { id: 'proof', label: 'No Proof' },
              { id: 'support', label: 'Support Unresolved' },
              { id: 'highvalue', label: 'High-Value Hesitation' },
            ] as const
          ).map((item) => {
            const isActive = diagnosedFailure === item.id;
            return (
              <button
                key={String(item.id)}
                onClick={() => onSelectPolicyFailure(item.id)}
                className={`text-xs font-extrabold p-2 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-[#54B226] text-white border-[#54B226] shadow-2xs'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LCER Recovery Counter */}
      <div className="bg-white rounded-2xl border border-amber-200 p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wide">
            LCER Recovered Score
          </span>
          <span className="text-xl font-black text-[#54B226]">
            {recoveredCount} / {totalOrdersCount}
          </span>
        </div>
        <div className="text-[11px] text-gray-600 leading-snug">
          <strong className="text-gray-900">Formula: </strong>
          <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">
            LCER = (Recovered / Reached) × 100
          </code>
        </div>
      </div>

      {/* 4. Live AI Free-Text Complaint Tester */}
      <div className="bg-gray-900 text-white rounded-2xl p-4 space-y-2 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-[#F8CB45] flex items-center gap-1">
            <span>⚡</span> Free-Text Complaint Tester
          </span>
          <span className="text-[10px] text-gray-400 font-mono">Custom Input</span>
        </div>

        <div className="space-y-2 pt-1">
          <input
            type="text"
            value={customComplaintText}
            onChange={(e) => onCustomComplaintChange(e.target.value)}
            placeholder="Type any complaint (e.g. arrived damaged)..."
            className="w-full bg-white/10 text-white text-xs px-3 py-2 rounded-xl placeholder-gray-400 focus:outline-none border border-white/10 focus:border-[#54B226]"
          />
          <button
            onClick={onRunCustomDiagnosis}
            disabled={!customComplaintText.trim() || isDiagnosing}
            className="w-full bg-[#54B226] hover:bg-[#3E8A1C] disabled:bg-gray-700 text-white font-extrabold text-xs py-2 rounded-xl transition-all shadow-sm text-center"
          >
            {isDiagnosing ? 'Calling Groq AI Model...' : 'Diagnose Complaint Live'}
          </button>
        </div>
      </div>
    </aside>
  );
};

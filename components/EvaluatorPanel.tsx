'use client';

import React from 'react';
import { FailureType } from './ProductDetailSheet';
import { LapsedCandidateOrder, calculateLapsedCategoryScore } from './HomeSecondTryCard';

interface EvaluatorPanelProps {
  diagnosedFailure: FailureType;
  onSelectPolicyFailure: (failure: FailureType) => void;
  recoveredCount: number;
  totalOrdersCount: number;
  customComplaintText: string;
  onCustomComplaintChange: (text: string) => void;
  onRunCustomDiagnosis: () => void;
  isDiagnosing: boolean;
  candidateOrders: LapsedCandidateOrder[];
  activeOrder: LapsedCandidateOrder | null;
  resolvedOrderIds: string[];
  onResetStorage: () => void;
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
  candidateOrders,
  activeOrder,
  resolvedOrderIds,
  onResetStorage,
}) => {
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
          All simulation controls & scoring metrics live here outside the phone frame. The phone frame contains 100% real Blinkit customer language.
        </p>
      </div>

      {/* 1. Dynamic Category Scoring Function Inspector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-gray-900 flex items-center gap-1">
            <span>📊</span> Dynamic Category Scoring Engine
          </span>
          <button
            onClick={onResetStorage}
            className="text-[10px] font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 px-2 py-0.5 rounded"
          >
            Reset localStorage
          </button>
        </div>

        <p className="text-[11px] text-gray-600">
          Formula: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10px]">PriceVal(40%) + LapsedDays(35%) + Recency(25%)</code>
        </p>

        {/* Scoring Table */}
        <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden text-xs shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-100/60 text-amber-950 font-bold border-b border-amber-200 text-[10px] uppercase">
                <th className="p-2">Category</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-right">Lapsed</th>
                <th className="p-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {candidateOrders.map((o) => {
                const score = calculateLapsedCategoryScore(o);
                const isResolved = resolvedOrderIds.includes(o.orderId);
                const isActive = activeOrder?.orderId === o.orderId;

                return (
                  <tr
                    key={o.orderId}
                    className={
                      isActive
                        ? 'bg-gray-900 text-white font-bold'
                        : isResolved
                        ? 'bg-gray-50 text-gray-400 line-through'
                        : 'text-gray-800'
                    }
                  >
                    <td className="p-2 flex items-center gap-1">
                      <span>{o.icon}</span>
                      <span className="truncate">{o.categoryName}</span>
                    </td>
                    <td className="p-2 text-right">₹{o.price}</td>
                    <td className="p-2 text-right">{o.daysLapsed}d</td>
                    <td className="p-2 text-right font-black">
                      {isResolved ? (
                        <span className="text-gray-400 font-normal">Converted</span>
                      ) : (
                        <span className={isActive ? 'text-[#F8CB45]' : 'text-gray-900'}>
                          {score} {isActive && '★'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {activeOrder && (
          <div className="bg-gray-900 text-white rounded-xl p-2.5 text-[11px] font-mono">
            <div className="text-[#F8CB45] font-bold">
              Active Card on Home: {activeOrder.categoryName} (Score: {calculateLapsedCategoryScore(activeOrder)})
            </div>
            <div className="text-gray-300 text-[10px] mt-0.5 italic">
              "{activeOrder.complaintText}"
            </div>
          </div>
        )}
      </div>

      {/* 2. PDP Policy Simulator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-gray-900 flex items-center gap-1">
            <span>🔍</span> PDP Policy Simulator
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Spec §3b</span>
        </div>

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

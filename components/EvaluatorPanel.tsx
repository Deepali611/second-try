'use client';

import React from 'react';
import { FailureType } from './ProductDetailSheet';

interface EvaluatorPanelProps {
  diagnosedFailure: FailureType;
  onSelectPolicyFailure: (failure: FailureType) => void;
  recoveredCount: number;
  totalOrdersCount: number;
  customComplaintText: string;
  onCustomComplaintChange: (text: string) => void;
  onRunCustomDiagnosis: () => void;
  isDiagnosing: boolean;
  activeScenarioId?: string;
  onSelectScenario?: (orderId: string) => void;
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
          This panel is for evaluator testing only. All UI inside the phone frame contains 100% real Blinkit customer-facing language.
        </p>
      </div>

      {/* 1. PDP Policy Simulator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-gray-900 flex items-center gap-1">
            <span>🔍</span> PDP Policy Simulator
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Spec §3b</span>
        </div>
        <p className="text-[11px] text-gray-600">
          Select a diagnosed failure state to test how the Product Detail Sheet policy row personalizes dynamically:
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

      {/* 2. LCER Recovery Counter */}
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
        <p className="text-[11px] text-gray-500">
          Measures lapsed triers converting into repeat category purchasers via 1-tap reorders inside the Orders screen.
        </p>
      </div>

      {/* 3. Live AI Complaint Tester (/api/diagnose) */}
      <div className="bg-gray-900 text-white rounded-2xl p-4 space-y-2 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-[#F8CB45] flex items-center gap-1">
            <span>⚡</span> Live AI Complaint Tester
          </span>
          <span className="text-[10px] text-gray-400 font-mono">/api/diagnose</span>
        </div>
        <p className="text-[11px] text-gray-300">
          Test Groq Llama 3.3 models with custom free-text complaints:
        </p>

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

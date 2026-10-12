import React from 'react'

export default function EvaluationSteps() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
          KALKULASI
        </span>
        <h3 className="text-lg font-bold text-white">Evaluasi Probabilitas Skenario (Joint Likelihood)</h3>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        Peluang bersama urutan observasi fisik dan urutan status tersembunyi dihitung dengan formulasi rantai:
      </p>
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
        P(Y; X) = &pi;(X₁) &times; P(Y₁ | X₁) &times; P(X₂ | X₁) &times; P(Y₂ | X₂) &times; P(X₃ | X₂) &times; P(Y₃ | X₃)
      </div>
    </div>
  )
}
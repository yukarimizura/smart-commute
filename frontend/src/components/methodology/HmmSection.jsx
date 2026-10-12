import React from 'react'

export default function HmmSection() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
          TEORI 2
        </span>
        <h3 className="text-lg font-bold text-white">Hidden Markov Model (HMM)</h3>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        Digunakan ketika keadaan lingkungan sebenarnya (*hidden states: cuaca/tingkat kepadatan mikro*) tidak teramati langsung secara penuh, melainkan diinferensikan melalui observasi fisik (*emission states: waktu tempuh, ekspresi/status mood komuter*):
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-indigo-300">
          <strong className="text-white block mb-1">Transition Matrix (A):</strong>
          Peluang transisi dari kondisi cuaca kemarin ke hari ini.
        </div>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-indigo-300">
          <strong className="text-white block mb-1">Emission Matrix (B):</strong>
          P(Sad | Weather) vs P(Happy | Weather).
        </div>
      </div>
    </div>
  )
}
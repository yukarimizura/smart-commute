import React from 'react'

export default function MarkovSection() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono text-xs font-bold border border-sky-500/20">
          TEORI 1
        </span>
        <h3 className="text-lg font-bold text-white">Markov Chain &amp; Stationary Distribution</h3>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        Sistem memodelkan transisi kondisi cuaca harian menggunakan rantai Markov berhingga (*finite-state Markov chain*). Distribusi stasioner diperoleh melalui persamaan kesetimbangan:
      </p>
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
        &pi; A = &pi; &nbsp;&nbsp;&rArr;&nbsp;&nbsp; &pi; = [0.218 (Rainy), 0.273 (Cloudy), 0.509 (Sunny)]
      </div>
    </div>
  )
}
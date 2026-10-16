import React from 'react'

export default function NavBrand({ onNavigateHome }) {
  return (
    <div
      onClick={onNavigateHome}
      className="flex items-center gap-3 cursor-pointer group select-none"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
        <span className="text-base">🚦</span>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white tracking-tight">SmartCommute</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
            DSS ENGINE
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-light">Urban Mobility & Decision Support</p>
      </div>
    </div>
  )
}
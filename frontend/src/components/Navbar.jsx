import React from 'react'

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-12 items-center">
        
        {/* Sisi Kiri: Brand Logo (4 Kolom) */}
        <div className="col-span-4 flex items-center justify-start">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🚦</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">SmartCommute</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  DSS ENGINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Urban Mobility &amp; Decision Support</p>
            </div>
          </div>
        </div>

        {/* Tengah: Menu Navigasi - Presisi 100% Center (4 Kolom) */}
        <nav className="col-span-4 flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'text-sky-400 bg-sky-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Beranda
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'simulator'
                ? 'text-sky-400 bg-sky-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Simulasi Rute
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'methodology'
                ? 'text-sky-400 bg-sky-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Metodologi AI
          </button>
        </nav>

        {/* Sisi Kanan: Action Button (4 Kolom) */}
        <div className="col-span-4 flex items-center justify-end">
          <button
            onClick={() => setActiveTab('simulator')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all hover:scale-105"
          >
            Coba Simulasi Rute
          </button>
        </div>

      </div>
    </header>
  )
}
import React from 'react'

const NAV_ITEMS = [
  { id: 'home', label: 'Beranda' },
  { id: 'simulator', label: 'Simulasi Rute' },
  { id: 'methodology', label: 'Metodologi AI' }
]

export default function NavLinks({ activeTab, setActiveTab }) {
  return (
    <nav className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-2xl shadow-inner backdrop-blur-md">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setActiveTab(item.id)}
          className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === item.id
              ? 'bg-sky-500/15 text-sky-400 font-semibold shadow-sm border border-sky-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
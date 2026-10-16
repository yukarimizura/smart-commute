import React from 'react'

const TABS = [
  { id: 'profile', icon: '👤', label: 'Profil Saya' },
  { id: 'settings', icon: '⚙️', label: 'Pengaturan DSS' },
  { id: 'help', icon: '💡', label: 'Bantuan & FAQ' }
]

export default function SettingsSidebar({ activeTab, setActiveTab, onClose }) {
  return (
    <div className="w-full md:w-56 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800/80 p-4 flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span
            className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer hover:opacity-80"
            onClick={onClose}
            title="Tutup (Esc)"
          />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-[11px] font-mono text-slate-400 ml-2">Preferences</span>
        </div>

        <div className="space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-3 flex items-center justify-between">
        <span>v2.4 Core</span>
        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">ESC</span>
      </div>
    </div>
  )
}
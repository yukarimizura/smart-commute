import React from 'react'

export default function ProfileMenu({ currentUser, onOpenModal, onLogout }) {
  return (
    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl shadow-black/80 backdrop-blur-xl p-1.5 z-[9999] animate-in fade-in zoom-in-95 duration-100">
      <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
        <p className="text-xs font-semibold text-white truncate">{currentUser?.full_name}</p>
        <p className="text-[11px] text-slate-400 truncate font-mono">{currentUser?.email}</p>
      </div>

      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => onOpenModal('profile')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
        >
          <span>👤</span>
          <span>Profil Saya</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('settings')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
        >
          <span>⚙️</span>
          <span>Pengaturan DSS</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('help')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
        >
          <span>💡</span>
          <span>Pusat Bantuan</span>
        </button>
      </div>

      <div className="h-px bg-slate-800/80 my-1" />

      <button
        type="button"
        onClick={onLogout}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer font-medium"
      >
        <span>🚪</span>
        <span>Keluar</span>
      </button>
    </div>
  )
}
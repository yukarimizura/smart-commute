import React from 'react'
import ProfileDropdown from '../ProfileDropdown'

export default function NavActions({ currentUser, onLogout, onOpenAuth }) {
  return (
    <div className="flex items-center gap-3">
      {currentUser ? (
        <ProfileDropdown
          currentUser={currentUser}
          onLogout={onLogout}
        />
      ) : (
        <button
          type="button"
          onClick={onOpenAuth}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
        >
          Masuk / Daftar
        </button>
      )}
    </div>
  )
}
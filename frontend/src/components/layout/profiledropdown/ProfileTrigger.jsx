import React from 'react'

export default function ProfileTrigger({ currentUser, isOpen, onToggle }) {
  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl border transition-all cursor-pointer ${
        isOpen
          ? 'bg-slate-900 border-sky-500/50 ring-2 ring-sky-500/20'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
      }`}
    >
      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-sky-500/20">
        {getInitials(currentUser?.full_name)}
      </div>
      <div className="text-left hidden sm:block">
        <p className="text-xs font-semibold text-slate-200 leading-tight">
          {currentUser?.full_name || 'Pengguna'}
        </p>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </span>
      </div>
      <svg
        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180 text-sky-400' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}
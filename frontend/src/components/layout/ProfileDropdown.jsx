import React, { useState, useRef, useEffect } from 'react'

export default function ProfileDropdown({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="relative select-none" ref={menuRef}>
      {/* Tombol Trigger Avatar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
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

      {/* Dropdown Menu Standar */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl shadow-black/70 backdrop-blur-xl p-1.5 z-[9999] animate-in fade-in zoom-in-95 duration-100">
          
          {/* Info User */}
          <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
            <p className="text-xs font-semibold text-white truncate">
              {currentUser?.full_name}
            </p>
            <p className="text-[11px] text-slate-400 truncate font-mono">
              {currentUser?.email}
            </p>
          </div>

          {/* Navigasi Standar */}
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => {
                alert('Halaman Profil Pengguna')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profil Saya</span>
            </button>

            <button
              type="button"
              onClick={() => {
                alert('Halaman Pengaturan Akun')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Pengaturan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                alert('Pusat Bantuan & Dokumentasi')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Bantuan</span>
            </button>
          </div>

          <div className="h-px bg-slate-800/80 my-1" />

          {/* Tombol Logout */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              onLogout()
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
          >
            <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar</span>
          </button>

        </div>
      )}
    </div>
  )
}
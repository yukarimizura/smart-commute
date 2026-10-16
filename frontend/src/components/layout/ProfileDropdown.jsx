import React, { useState, useRef, useEffect } from 'react'
import UserSettingsModal from '../profile/UserSettingsModal'

export default function ProfileDropdown({ currentUser, onLogout, onUpdateUser }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleOpenAction = () => {
    setIsOpen(false)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="relative select-none" ref={menuRef}>
        {/* Trigger Button Avatar */}
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl shadow-black/80 backdrop-blur-xl p-1.5 z-[9999] animate-in fade-in zoom-in-95 duration-100">
            {/* Header Profil */}
            <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
              <p className="text-xs font-semibold text-white truncate">
                {currentUser?.full_name}
              </p>
              <p className="text-[11px] text-slate-400 truncate font-mono">
                {currentUser?.email}
              </p>
            </div>

            {/* Menu Items yang Membuka Modal */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={handleOpenAction}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
              >
                <span>👤</span>
                <span>Profil Saya</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAction}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
              >
                <span>⚙️</span>
                <span>Pengaturan DSS</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAction}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
              >
                <span>💡</span>
                <span>Pusat Bantuan</span>
              </button>
            </div>

            <div className="h-px bg-slate-800/80 my-1" />

            {/* Logout */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                onLogout()
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer font-medium"
            >
              <span>🚪</span>
              <span>Keluar</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal Settings & Profil */}
      <UserSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={onUpdateUser}
      />
    </>
  )
}
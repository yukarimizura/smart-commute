import React, { useState, useEffect } from 'react'
import AuthModal from '../auth/AuthModal'
import ProfileDropdown from './ProfileDropdown'

export default function Navbar({ activeTab, setActiveTab }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('smart_commute_user')
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved))
      } catch (e) {
        localStorage.removeItem('smart_commute_user')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('smart_commute_user')
    setCurrentUser(null)
  }

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'simulator', label: 'Simulasi Rute' },
    { id: 'methodology', label: 'Metodologi AI' }
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div 
            onClick={() => setActiveTab('home')}
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

          {/* Navigasi Segmented Bar */}
          <nav className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-2xl shadow-inner backdrop-blur-md">
            {navItems.map((item) => (
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

          {/* Pojok Kanan: Dropdown Menu Profil atau Tombol Masuk */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <ProfileDropdown
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Masuk / Daftar
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Modal Autentikasi */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </>
  )
}
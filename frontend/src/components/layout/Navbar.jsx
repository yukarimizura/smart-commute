import React, { useState, useEffect } from 'react'
import AuthModal from '../auth/AuthModal'
import NavBrand from './navbar/NavBrand'
import NavLinks from './navbar/NavLinks'
import NavActions from './navbar/NavActions'

export default function Navbar({ activeTab, setActiveTab }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('smart_commute_user')
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('smart_commute_user')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('smart_commute_user')
    setCurrentUser(null)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <NavBrand onNavigateHome={() => setActiveTab('home')} />
          <NavLinks activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavActions
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </>
  )
}
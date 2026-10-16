import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import SettingsSidebar from './usersettingsmodal/SettingsSidebar'
import ProfileTab from './usersettingsmodal/ProfileTab'
import PreferencesTab from './usersettingsmodal/PreferencesTab'
import HelpTab from './usersettingsmodal/HelpTab'

export default function UserSettingsModal({ isOpen, initialTab = 'profile', onClose, currentUser, onUpdateUser }) {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [animating, setAnimating] = useState(false)
  const [activeTab, setActiveTab] = useState(initialTab)
  const [fullName, setFullName] = useState(currentUser?.full_name || '')
  const [preferredMode, setPreferredMode] = useState(
    () => localStorage.getItem('smart_commute_pref_mode') || 'motorcycle'
  )
  const [driverSkill, setDriverSkill] = useState(
    () => localStorage.getItem('smart_commute_pref_skill') || 'normal'
  )
  const [autoBuffer, setAutoBuffer] = useState(
    () => localStorage.getItem('smart_commute_pref_buffer') !== 'false'
  )
  const [isSavedNotice, setIsSavedNotice] = useState(false)

  const handleSmoothClose = useCallback(() => {
    setAnimating(false)
    setTimeout(() => {
      setShouldRender(false)
      onClose()
    }, 250)
  }, [onClose])

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const t = setTimeout(() => setAnimating(true), 20)
      return () => clearTimeout(t)
    } else {
      setAnimating(false)
      const t = setTimeout(() => setShouldRender(false), 250)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Kunci Scroll & blur container utama jika ada
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleSmoothClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleSmoothClose])

  if (!shouldRender) return null

  const handleSavePreferences = (e) => {
    e.preventDefault()
    localStorage.setItem('smart_commute_pref_mode', preferredMode)
    localStorage.setItem('smart_commute_pref_skill', driverSkill)
    localStorage.setItem('smart_commute_pref_buffer', autoBuffer)

    if (fullName.trim() && currentUser) {
      const updated = { ...currentUser, full_name: fullName.trim() }
      localStorage.setItem('smart_commute_user', JSON.stringify(updated))
      if (onUpdateUser) onUpdateUser(updated)
    }

    setIsSavedNotice(true)
    setTimeout(() => setIsSavedNotice(false), 2000)
  }

  // Menggunakan createPortal agar modal menempel langsung di <body> dan tidak terkurung oleh header/navbar
  return createPortal(
    <div
      className={`fixed inset-0 top-0 left-0 w-screen h-screen z-[999999] flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        animating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop Gelap + Blur Ekstra Tebal */}
      <div
        className="fixed inset-0 w-full h-full bg-slate-950/85 transition-opacity duration-300"
        style={{
          backdropFilter: animating ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: animating ? 'blur(20px)' : 'blur(0px)'
        }}
        onClick={handleSmoothClose}
      />

      {/* macOS Style Dialog Window */}
      <div
        className={`relative z-10 w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row h-[480px] transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform ${
          animating ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} onClose={handleSmoothClose} />

        <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between bg-slate-900/90 overscroll-contain">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-5">
              <h3 className="text-sm font-bold text-white capitalize">
                {activeTab === 'profile' && 'Informasi Pengguna'}
                {activeTab === 'settings' && 'Preferensi Algoritma DSS'}
                {activeTab === 'help' && 'Pusat Dokumentasi & Bantuan'}
              </h3>
              <button
                type="button"
                onClick={handleSmoothClose}
                className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs flex items-center justify-center transition cursor-pointer"
                title="Tutup (Esc)"
              >
                ✕
              </button>
            </div>

            {activeTab === 'profile' && (
              <ProfileTab fullName={fullName} setFullName={setFullName} email={currentUser?.email} />
            )}
            {activeTab === 'settings' && (
              <PreferencesTab
                preferredMode={preferredMode}
                setPreferredMode={setPreferredMode}
                driverSkill={driverSkill}
                setDriverSkill={setDriverSkill}
                autoBuffer={autoBuffer}
                setAutoBuffer={setAutoBuffer}
              />
            )}
            {activeTab === 'help' && <HelpTab />}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            {isSavedNotice ? (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Preferensi tersimpan!
              </span>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSmoothClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Tutup
              </button>
              {activeTab !== 'help' && (
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
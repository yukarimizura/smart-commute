import React, { useState, useEffect } from 'react'

export default function UserSettingsModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('profile')
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

  // 1. Kunci scroll latar belakang & aktifkan tombol Esc untuk keluar
  useEffect(() => {
    if (!isOpen) return

    // Cegah halaman belakang ikut terscroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Tangani tombol Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

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

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 w-full h-full bg-slate-950/80 backdrop-blur-xl animate-fadeIn"
        onClick={onClose}
      />

      {/* macOS Style Settings Window */}
      <div 
        className="relative z-10 w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/90 overflow-hidden flex flex-col md:flex-row h-[480px] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sisi Kiri: Sidebar */}
        <div className="w-full md:w-56 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800/80 p-4 flex flex-col justify-between select-none">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer hover:opacity-80" onClick={onClose} title="Tutup (Esc)" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] font-mono text-slate-400 ml-2">Preferences</span>
            </div>

            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span>👤</span>
                <span>Profil Saya</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span>⚙️</span>
                <span>Pengaturan DSS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('help')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeTab === 'help'
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span>💡</span>
                <span>Bantuan & FAQ</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-3 flex items-center justify-between">
            <span>v2.4 Core</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">ESC</span>
          </div>
        </div>

        {/* Sisi Kanan: Panel Konten (Scrollable Mandiri) */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between bg-slate-900/90 overscroll-contain">
          <div>
            {/* Header Konten */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-5">
              <h3 className="text-sm font-bold text-white capitalize">
                {activeTab === 'profile' && 'Informasi Pengguna'}
                {activeTab === 'settings' && 'Preferensi Algoritma DSS'}
                {activeTab === 'help' && 'Pusat Dokumentasi & Bantuan'}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs flex items-center justify-center transition cursor-pointer"
                title="Tutup (Esc)"
              >
                ✕
              </button>
            </div>

            {/* TAB 1: PROFIL */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-sky-500/20">
                    {getInitials(fullName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{currentUser?.full_name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{currentUser?.email}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      MySQL Terhubung
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Ubah Nama Tampilan</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Alamat Email (Terkunci)</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || ''}
                    className="w-full bg-slate-950/50 border border-slate-800/60 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-not-allowed font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: PENGATURAN DSS */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Default Kendaraan Utama</label>
                  <select
                    value={preferredMode}
                    onChange={(e) => setPreferredMode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option value="motorcycle">🏍️ Sepeda Motor</option>
                    <option value="car">🚗 Mobil Pribadi</option>
                    <option value="krl">🚆 KRL / Transit Rel</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Gaya Berkendara (Driver Persona)</label>
                  <select
                    value={driverSkill}
                    onChange={(e) => setDriverSkill(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option value="pro">⚡ Sat-set / Agresif (Kecepatan +15%)</option>
                    <option value="normal">🚙 Normal / Sesuai Arus</option>
                    <option value="beginner">🔰 Pemula / Santai (Buffer Waktu Ekstra)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <p className="text-xs font-medium text-slate-200">Kalkulasi Buffer Parkir Otomatis</p>
                    <p className="text-[11px] text-slate-400">Tambahkan estimasi waktu mencari spot parkir</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoBuffer}
                    onChange={(e) => setAutoBuffer(e.target.checked)}
                    className="w-4 h-4 accent-sky-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: BANTUAN & FAQ */}
            {activeTab === 'help' && (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-white mb-1">Apa bedanya dengan Google Maps / Waze?</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Smart Commute DSS mengevaluasi probabilitas sebelum berangkat: risiko hujan satelit cuaca, penalti antrean parkir, hingga komputasi gram emisi karbon dalam satu perbandingan multimoda.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-white mb-1">Bagaimana cara mengganti titik rute?</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Ketik nama jalan di bar atas kanvas peta lalu klik tombol <b>Cari</b> atau tekan tombol <b>Enter</b>. Anda juga bisa langsung mengeklik titik mana pun pada peta Leaflet.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sisi Bawah */}
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
                onClick={onClose}
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
    </div>
  )
}
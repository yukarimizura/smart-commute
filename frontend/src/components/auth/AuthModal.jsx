import React, { useState } from 'react'
import { loginApi, registerApi } from '../../api/authApi'

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      if (isRegister) {
        await registerApi(fullName, email, password)
        setIsRegister(false)
        setErrorMsg('Akun berhasil dibuat! Silakan masuk.')
      } else {
        const data = await loginApi(email, password)
        localStorage.setItem('smart_commute_user', JSON.stringify(data.user))
        if (onLoginSuccess) onLoginSuccess(data.user)
        onClose()
      }
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center p-4">
      {/* 1. Backdrop Gelap Ngeblur Penuh */}
      <div 
        className="fixed inset-0 w-full h-full bg-slate-950/80 backdrop-blur-xl transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* 2. Kartu Dialog Modal (Tepat di Tengah Layar) */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800/90 p-6 shadow-2xl shadow-black/80 backdrop-blur-2xl">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs w-7 h-7 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
        >
          ✕
        </button>

        {/* Header Dialog */}
        <div className="text-center mb-5">
          <span className="text-3xl">🚦</span>
          <h2 className="text-lg font-bold text-white mt-2">
            {isRegister ? 'Buat Akun Komuter' : 'Masuk ke Smart Commute'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister
              ? 'Daftar untuk menyimpan riwayat & rute komuter'
              : 'Gunakan akun Anda untuk sinkronisasi DSS'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="cth. Rama Mahasiswa"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Memproses...' : isRegister ? 'Daftar Akun' : 'Masuk Sekarang'}
          </button>
        </form>

        {/* Switch Login / Register */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister)
              setErrorMsg('')
            }}
            className="ml-1 text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2 cursor-pointer"
          >
            {isRegister ? 'Masuk' : 'Daftar'}
          </button>
        </div>
      </div>
    </div>
  )
}
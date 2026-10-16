import React, { useState, useRef } from 'react'

export default function ProfileTab({ fullName, setFullName, email, avatarUrl, setAvatarUrl }) {
  const fileInputRef = useRef(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwdStatus, setPwdStatus] = useState({ type: '', text: '' })

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  }

  // Upload gambar lokal dan konversi ke Base64
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2 MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    setPwdStatus({ type: '', text: '' })

    if (!oldPassword || !newPassword) {
      setPwdStatus({ type: 'error', text: 'Semua kolom sandi harus diisi.' })
      return
    }
    if (newPassword.length < 6) {
      setPwdStatus({ type: 'error', text: 'Kata sandi baru minimal 6 karakter.' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPwdStatus({ type: 'error', text: 'Konfirmasi sandi baru tidak cocok.' })
      return
    }

    // Simulasi ganti password berhasil
    setPwdStatus({ type: 'success', text: 'Kata sandi berhasil diperbarui.' })
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="space-y-6">
      {/* 1. Header Profil & Avatar Uploader */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
        <div className="relative group">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500/40 shadow-lg shadow-sky-500/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-sky-500/20">
              {getInitials(fullName)}
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-sm font-semibold text-white">{fullName}</h4>
          <p className="text-xs text-slate-400 font-mono">{email}</p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-[11px] font-medium transition cursor-pointer"
            >
              Ganti Foto
            </button>
            {avatarUrl && (
              <button
                type="button"
                onClick={() => setAvatarUrl('')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] font-medium transition cursor-pointer"
              >
                Hapus Foto
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Informasi Akun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-400 block mb-1 font-medium">Nama Lengkap</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 transition"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1 font-medium">Alamat Email (Permanen)</label>
          <input
            type="email"
            disabled
            value={email || ''}
            className="w-full bg-slate-950/50 border border-slate-800/60 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-not-allowed font-mono"
          />
        </div>
      </div>

      {/* 3. Form Keamanan & Ganti Sandi */}
      <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80 space-y-3">
        <h5 className="text-xs font-bold text-white flex items-center gap-2">
          <span>🔒</span> Keamanan & Kata Sandi
        </h5>

        {pwdStatus.text && (
          <div
            className={`p-2 rounded-xl text-xs text-center ${
              pwdStatus.type === 'error'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}
          >
            {pwdStatus.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <input
            type="password"
            placeholder="Sandi Saat Ini"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
          />
          <input
            type="password"
            placeholder="Sandi Baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
          />
          <input
            type="password"
            placeholder="Ulangi Sandi Baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleChangePassword}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/20 text-xs font-medium transition cursor-pointer"
          >
            Perbarui Kata Sandi
          </button>
        </div>
      </div>
    </div>
  )
}
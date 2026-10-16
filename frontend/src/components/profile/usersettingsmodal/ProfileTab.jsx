import React from 'react'

export default function ProfileTab({ fullName, setFullName, email }) {
  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-sky-500/20">
          {getInitials(fullName)}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{fullName}</h4>
          <p className="text-xs text-slate-400 font-mono">{email}</p>
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
          value={email || ''}
          className="w-full bg-slate-950/50 border border-slate-800/60 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-not-allowed font-mono"
        />
      </div>
    </div>
  )
}
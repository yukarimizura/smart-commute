import React from 'react'

export default function ModeControls({
  selectedMode,
  setSelectedMode,
  driverSkill,
  setDriverSkill,
  onAnalyze,
  loading
}) {
  return (
    <div className="space-y-3 pt-1">
      <div className="grid grid-cols-2 gap-2">
        {/* Pilihan Moda */}
        <div className="space-y-1">
          <label className="text-[10px] text-slate-400 font-medium">Moda Kendaraan</label>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="motorcycle">🏍️ Sepeda Motor</option>
            <option value="car">🚗 Mobil Pribadi</option>
            <option value="krl">🚆 KRL / Transit Rel</option>
          </select>
        </div>

        {/* Gaya Nyetir */}
        <div className="space-y-1">
          <label className="text-[10px] text-slate-400 font-medium">Gaya Nyetir</label>
          <select
            value={driverSkill}
            onChange={(e) => setDriverSkill(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="pro">⚡ Sat-set / Pro</option>
            <option value="normal">🚙 Normal / Rata-rata</option>
            <option value="beginner">🔰 Pemula / Santai</option>
          </select>
        </div>
      </div>

      {/* Tombol Eksekusi DSS */}
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Menghitung Simulasi...
          </>
        ) : (
          'Analisis Keputusan Berangkat'
        )}
      </button>
    </div>
  )
}
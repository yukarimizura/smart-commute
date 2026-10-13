import React from 'react'

export default function CockpitBar({
  originText,
  setOriginText,
  destText,
  setDestText,
  selectedMode,
  setSelectedMode,
  driverSkill,
  setDriverSkill,
  departureTime,
  setDepartureTime,
  dayType,
  setDayType,
  targetArrivalTime,
  setTargetArrivalTime,
  onSearchOrigin,
  onSearchDest,
  onAnalyze,
  loading
}) {
  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-xl space-y-3">
      {/* Baris 1: Pencarian Alamat */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
        <div className="md:col-span-5 flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
          <span className="text-sky-400 text-sm">📍</span>
          <input
            type="text"
            value={originText}
            onChange={(e) => setOriginText(e.target.value)}
            placeholder="Cari lokasi asal..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onSearchOrigin}
            className="text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            Cari
          </button>
        </div>

        <div className="hidden md:flex md:col-span-1 justify-center text-slate-600 font-bold">
          ➔
        </div>

        <div className="md:col-span-6 flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
          <span className="text-rose-400 text-sm">🎯</span>
          <input
            type="text"
            value={destText}
            onChange={(e) => setDestText(e.target.value)}
            placeholder="Cari lokasi tujuan..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onSearchDest}
            className="text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Baris 2: Parameter & Action */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-center pt-1 border-t border-slate-800/60">
        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Moda</label>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="motorcycle">🏍️ Motor</option>
            <option value="car">🚗 Mobil</option>
            <option value="krl">🚆 KRL / Transit</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Gaya Nyetir</label>
          <select
            value={driverSkill}
            onChange={(e) => setDriverSkill(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="pro">⚡ Sat-set / Pro</option>
            <option value="normal">🚙 Normal</option>
            <option value="beginner">🔰 Pemula</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Jam Berangkat</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Target Tiba</label>
          <input
            type="time"
            value={targetArrivalTime}
            onChange={(e) => setTargetArrivalTime(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Hari</label>
          <select
            value={dayType}
            onChange={(e) => setDayType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="weekday">Hari Kerja</option>
            <option value="weekend">Akhir Pekan</option>
            <option value="holiday">Hari Libur</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex items-end">
          <button
            onClick={onAnalyze}
            disabled={loading}
            className="w-full py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-md hover:shadow-sky-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Menghitung...' : '⚡ Analisis DSS'}
          </button>
        </div>
      </div>
    </div>
  )
}
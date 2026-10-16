import React from 'react'

export default function PreferencesTab({
  preferredMode,
  setPreferredMode,
  driverSkill,
  setDriverSkill,
  autoBuffer,
  setAutoBuffer
}) {
  return (
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
  )
}
import React from 'react'

export default function LocationInputs({
  originText,
  setOriginText,
  destText,
  setDestText,
  onSearchOrigin,
  onSearchDest,
  onPickPreset
}) {
  return (
    <div className="space-y-3">
      {/* Input Titik Asal */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
          <span className="text-sky-400">📍</span> Lokasi Asal (Kos / Rumah)
        </label>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={originText}
            onChange={(e) => setOriginText(e.target.value)}
            placeholder="Ketik alamat asal..."
            className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
          <button
            onClick={onSearchOrigin}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Input Titik Tujuan */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
          <span className="text-rose-400">🎯</span> Lokasi Tujuan (Kampus / Kantor)
        </label>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={destText}
            onChange={(e) => setDestText(e.target.value)}
            placeholder="Ketik lokasi tujuan..."
            className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
          <button
            onClick={onSearchDest}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Preset Lokasi Cepat jika disediakan handler */}
      {onPickPreset && (
        <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
          <span>Preset Cepat:</span>
          <button
            type="button"
            onClick={() => onPickPreset('BINUS Anggrek')}
            className="hover:text-sky-400 underline decoration-slate-600 underline-offset-2"
          >
            BINUS Anggrek
          </button>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => onPickPreset('Citra 2 Ext')}
            className="hover:text-sky-400 underline decoration-slate-600 underline-offset-2"
          >
            Citra 2 Ext
          </button>
        </div>
      )}
    </div>
  )
}
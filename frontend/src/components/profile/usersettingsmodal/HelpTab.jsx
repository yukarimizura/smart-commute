import React from 'react'

export default function HelpTab() {
  return (
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
  )
}
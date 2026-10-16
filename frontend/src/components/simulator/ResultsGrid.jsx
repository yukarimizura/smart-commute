import React from 'react'

export default function ResultsGrid({ results }) {
  // 1. Validasi array langsung dari prop 'results'
  if (!results || !Array.isArray(results) || results.length === 0) return null

  // Helper format durasi cerdas bawaanmu
  const formatDuration = (totalMinutes) => {
    const rounded = Math.round(totalMinutes)
    if (rounded < 60) return `${rounded} menit`
    const hours = Math.floor(rounded / 60)
    const minutes = rounded % 60
    return minutes > 0 ? `${hours} jam ${minutes} mnt` : `${hours} jam`
  }

  // 2. Pisahkan moda pilihan utama user (Hero) dan moda komparasi (Alternatif)
  const selectedOption = results.find((opt) => opt.is_selected) || results[0]
  const alternatives = results.filter((opt) => opt.key !== selectedOption.key)

  const getModeIcon = (key) => {
    if (key === 'motorcycle') return '🏍️'
    if (key === 'car') return '🚗'
    if (key === 'krl') return '🚆'
    return '⏱️'
  }

  const getLateColor = (prob) => {
    if (prob < 0.2) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    if (prob < 0.5) return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20'
  }

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- KARTU UTAMA (HERO CARD): Opsi Terpilih --- */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="p-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl drop-shadow-md">{getModeIcon(selectedOption.key)}</span>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {selectedOption.mode}
                  </h3>
                  <span className="text-[11px] text-sky-400 font-semibold tracking-wide">PILIHAN UTAMA ANDA</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-1">
                {selectedOption.detail}
              </p>
              {selectedOption.recommended && (
                <div className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  ✨ Paling Direkomendasikan Algoritma
                </div>
              )}
            </div>
            
            <div className="text-left md:text-right bg-slate-950/50 p-3 rounded-2xl border border-slate-800/80 w-full md:w-auto">
              <p className="text-xs text-slate-400 font-medium mb-1">Total Waktu Tempuh</p>
              <p className="text-3xl font-black text-white">
                {formatDuration(selectedOption.duration_min)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border ${getLateColor(selectedOption.p_late)}`}>
              <p className="text-[10px] uppercase tracking-wider font-bold mb-1 opacity-80">Risiko Terlambat</p>
              <p className="text-2xl font-bold">
                {Math.round(selectedOption.p_late * 100)}%
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Jejak Emisi CO₂</p>
              <p className="text-xl font-bold text-slate-200 font-mono">
                {selectedOption.co2_grams > 1000 
                  ? `${(selectedOption.co2_grams / 1000).toFixed(1)} kg` 
                  : `${selectedOption.co2_grams} g`}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Paparan AQI</p>
              <p className="text-xs font-bold text-slate-200 leading-tight">
                {selectedOption.aqi_risk}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- KARTU ALTERNATIF (WHAT-IF) --- */}
      {alternatives.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 pl-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Komparasi Cerdas
            </p>
            <span className="text-[10px] text-slate-500">*vs moda pilihan Anda</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alternatives.map((alt) => {
              const timeDiff = Math.round(alt.duration_min - selectedOption.duration_min)
              const timeText = timeDiff > 0 ? `Lebih lambat ${timeDiff} mnt` : `Lebih cepat ${Math.abs(timeDiff)} mnt`
              const timeColor = timeDiff > 0 ? 'text-rose-400 bg-rose-400/10' : 'text-emerald-400 bg-emerald-400/10'

              return (
                <div key={alt.key} className="relative flex flex-col justify-center p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 transition group overflow-hidden">
                  {alt.recommended && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
                  )}
                  
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform">{getModeIcon(alt.key)}</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">{alt.mode}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {formatDuration(alt.duration_min)} • {Math.round(alt.p_late * 100)}% telat
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-current opacity-80 ${timeColor}`}>
                        {timeText}
                      </span>
                      {alt.recommended && (
                        <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">
                          Rekomendasi
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      
    </div>
  )
}
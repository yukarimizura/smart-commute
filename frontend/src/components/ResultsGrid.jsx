export default function ResultsGrid({ results }) {
    if (!results) return null

    // Helper format durasi cerdas
    const formatDuration = (totalMinutes) => {
    const rounded = Math.round(totalMinutes)
    if (rounded < 60) {
        return `${rounded} menit`
    }
    const hours = Math.floor(rounded / 60)
    const minutes = rounded % 60
    return minutes > 0 ? `${hours} jam ${minutes} menit` : `${hours} jam`
    }

    return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-200">Perbandingan Opsi Transportasi Nyata:</h2>
        <span className="text-xs text-slate-400">*Termasuk estimasi hambatan simpang, filter kabin, & parkir</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((opt, idx) => (
            <div 
            key={idx} 
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                opt.recommended 
                ? 'bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/30' 
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
            >
            <div>
                <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-xl font-extrabold text-white">{opt.mode}</h3>
                    {opt.is_selected && (
                    <span className="text-[11px] text-sky-400 font-semibold">Pilihan Utama Anda</span>
                    )}
                </div>
                {opt.recommended && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                    Paling Direkomendasikan
                    </span>
                )}
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed">{opt.detail}</p>

                <div className="space-y-3 text-sm border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Waktu Tempuh:</span>
                    <strong className="text-base md:text-lg text-white font-bold">
                    {formatDuration(opt.duration_min)}
                    </strong>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Peluang Telat:</span>
                    <strong className={`font-bold ${opt.p_late >= 0.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {(opt.p_late * 100).toFixed(0)}%
                    </strong>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Emisi CO₂:</span>
                    <span className="text-slate-200 font-mono font-medium">{opt.co2_grams} g</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Paparan Polusi:</span>
                    <span className="text-xs text-slate-300 font-medium text-right">{opt.aqi_risk}</span>
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
    )
}
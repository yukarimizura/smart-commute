export default function TelemetryBanner({ summary }) {
    if (!summary) return null

    return (
    <div className="space-y-4">
        {/* Banner Telemetri Metrik */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="p-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Jarak Rute (OSRM)</p>
            <p className="text-2xl font-black text-white mt-1">{summary.distance_km} <span className="text-sm font-normal text-slate-400">km</span></p>
        </div>
        <div className="p-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Rencana Keberangkatan</p>
            <p className="text-xl font-bold text-sky-400 mt-1">{summary.planned_departure}</p>
            <span className="text-[11px] text-slate-400">{summary.day_status}</span>
        </div>
        <div className="p-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Cuaca Satelit Live</p>
            <p className="text-lg font-bold text-amber-400 mt-1">
            {summary.weather_live.condition} ({summary.weather_live.temp}°C)
            </p>
        </div>
        <div className="p-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Kondisi Koridor Jalan</p>
            <p className={`text-sm md:text-base font-bold mt-1 ${summary.traffic_status.includes('Macet') ? 'text-rose-400' : 'text-emerald-400'}`}>
            {summary.traffic_factor_desc}
            </p>
        </div>
        </div>

        {/* Box Rekomendasi Cerdas (AI / Smart Commute Advice) */}
        {summary.optimal_window && (
        <div className="bg-gradient-to-r from-sky-950/40 to-slate-900 border border-sky-500/30 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
                <h4 className="text-sm font-bold text-sky-300">Rekomendasi Waktu Keberangkatan Pintar</h4>
                <p className="text-xs text-slate-300 mt-0.5">{summary.optimal_window.advice}</p>
            </div>
            </div>
            {summary.optimal_window.saved_minutes > 0 && (
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold whitespace-nowrap">
                Hemat ~{summary.optimal_window.saved_minutes} Menit
            </span>
            )}
        </div>
        )}
    </div>
    )
}
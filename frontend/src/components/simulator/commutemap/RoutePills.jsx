import React from 'react'

export default function RoutePills({ routesPreview = [], selectedRouteId = 0, onSelectRoute }) {
  if (!routesPreview.length) return null

  return (
    <div className="absolute top-3 right-3 z-[1000] flex flex-wrap gap-2 max-w-[85%] justify-end">
      {routesPreview.map((r) => {
        const isSelected = r.id === selectedRouteId
        return (
          <div key={r.id} className="relative group">
            <button
              onClick={() => onSelectRoute && onSelectRoute(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md transition-all shadow-lg flex items-center gap-2 border ${
                isSelected
                  ? 'bg-sky-500/90 text-slate-950 font-bold border-sky-400 ring-2 ring-sky-400/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="truncate max-w-[150px] sm:max-w-[190px] group-hover:max-w-[300px] transition-all duration-300">
                {r.label}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-slate-950 text-sky-400 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {r.duration_minutes}m
              </span>
            </button>

            {/* Tooltip Hover */}
            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-slate-950/95 border border-slate-700/80 text-slate-100 text-[11px] p-2.5 rounded-xl shadow-2xl backdrop-blur-md min-w-[210px] pointer-events-none z-[1100]">
              <div className="font-semibold text-sky-300 mb-1 border-b border-slate-800 pb-1">
                {r.label}
              </div>
              <div className="flex justify-between text-slate-300 text-[10px] pt-0.5">
                <span>Jarak Total:</span>
                <strong className="text-white font-mono">{r.distance_km} km</strong>
              </div>
              <div className="flex justify-between text-slate-300 text-[10px] pt-0.5">
                <span>Estimasi:</span>
                <strong className="text-emerald-400 font-mono">±{r.duration_minutes} menit</strong>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
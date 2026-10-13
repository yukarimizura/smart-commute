import React from 'react'
import CommuteMap from './CommuteMap'
import TelemetryBanner from './TelemetryBanner'
import ResultsGrid from './ResultsGrid'

export default function Simulator(props) {
  const { summary, results, errorMsg } = props

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-mono text-[11px] font-bold border border-sky-500/20">
              DSS ENGINE v2.0
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Smart Commute <span className="text-sky-400">Global Studio</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulasi Multimoda Global: Analisis Probabilitas Kemacetan, Waktu Tempuh & Mitigasi Emisi
          </p>
        </div>
      </header>

      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/40 p-3 rounded-2xl text-rose-400 text-xs">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Peta Terintegrasi Penuh (Cockpit Navigation Bar + Map Canvas) */}
      <CommuteMap {...props} onSelectRoute={props.setSelectedRouteId} />

      {/* Hasil Telemetri & Analisis */}
      {summary && <TelemetryBanner summary={summary} />}
      {results && <ResultsGrid results={results} />}
    </div>
  )
}
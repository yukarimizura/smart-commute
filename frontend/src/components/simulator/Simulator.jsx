import React from 'react'
import CommuteMap from './CommuteMap'
import ControlPanel from './ControlPanel'
import TelemetryBanner from './TelemetryBanner'
import ResultsGrid from './ResultsGrid'

export default function Simulator({
  originCoords,
  destCoords,
  originText,
  setOriginText,
  destText,
  setDestText,
  activeFocus,
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
  summary,
  results,
  loading,
  errorMsg,
  onSearchOrigin,
  onSearchDest,
  onPickOrigin,
  onAnalyze,
  routesPreview = [],
  selectedRouteId = 0,
  onSelectRoute
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8 space-y-6">
      
      {/* Subheader Simulator */}
      <header className="border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-xs font-bold border border-sky-500/30">
              AOL PROTOTYPE
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Smart Commute <span className="text-sky-400">DSS</span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Decision Support System Mobilitas Mahasiswa: Pola Kemacetan Jakarta, Waktu Keberangkatan &amp; Mitigasi Emisi
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-300">
          Tujuan: <strong className="text-emerald-400">{destText}</strong>
        </div>
      </header>

      {/* Pesan Error */}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/40 p-3.5 rounded-xl text-rose-400 text-xs md:text-sm">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Grid: Map & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7">
          <CommuteMap 
            originCoords={originCoords}
            destCoords={destCoords}
            onPickOrigin={onPickOrigin}
            activeFocus={activeFocus}
            routesPreview={routesPreview}
            selectedRouteId={selectedRouteId}
            onSelectRoute={onSelectRoute}
          />
        </div>

        <div className="lg:col-span-5">
          <ControlPanel 
            originText={originText}
            setOriginText={setOriginText}
            destText={destText}
            setDestText={setDestText}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            driverSkill={driverSkill}
            setDriverSkill={setDriverSkill}
            departureTime={departureTime}
            setDepartureTime={setDepartureTime}
            dayType={dayType}
            setDayType={setDayType}
            targetArrivalTime={targetArrivalTime}
            setTargetArrivalTime={setTargetArrivalTime}
            onSearchOrigin={onSearchOrigin}
            onSearchDest={onSearchDest}
            onAnalyze={onAnalyze}
            loading={loading}
          />
        </div>
      </div>

      {/* Hasil Analisis Telemetry & Rekomendasi Moda */}
      {summary && <TelemetryBanner summary={summary} />}
      {results && <ResultsGrid results={results} />}

    </div>
  )
}
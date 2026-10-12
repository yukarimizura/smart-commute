import React from 'react'
import CommuteMap from './CommuteMap'
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
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-6 space-y-6">
      
      {/* Pengenalan / Tajuk Halaman */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-mono text-[11px] font-bold border border-sky-500/20">
              DSS PLATFORM v2.0
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Smart Commute <span className="text-sky-400">Global Studio</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sistem Sokongan Keputusan Mobiliti Pintar dengan Simulasi Multimodal Antarabangsa & Analisis Emisi
          </p>
        </div>
      </header>

      {/* Paparan Mesej Ralat Jika Ada */}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/40 p-3 rounded-2xl text-rose-400 text-xs">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* KANVAS PETA TUNGGAL BERSEPADU PENUH */}
      <div className="w-full">
        <CommuteMap 
          originCoords={originCoords}
          destCoords={destCoords}
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
          onPickOrigin={onPickOrigin}
          onAnalyze={onAnalyze}
          loading={loading}
          activeFocus={activeFocus}
          routesPreview={routesPreview}
          selectedRouteId={selectedRouteId}
          onSelectRoute={onSelectRoute}
        />
      </div>

      {/* Bahagian Hasil Analisis Statistik */}
      {summary && <TelemetryBanner summary={summary} />}
      {results && <ResultsGrid results={results} />}

    </div>
  )
}
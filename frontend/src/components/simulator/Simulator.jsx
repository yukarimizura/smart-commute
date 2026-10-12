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
  onAnalyze
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Subheader Simulator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono text-[10px] font-bold border border-sky-500/20">
              SIMULATOR ENGINE
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Peta Analisis &amp; Penentuan Keputusan
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulasi mobilitas, evaluasi probabilitas kemacetan, dan estimasi waktu tiba.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-300">
          Tujuan: <strong className="text-emerald-400">{destText}</strong>
        </div>
      </div>

      {/* Alert Error */}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl text-rose-400 text-xs sm:text-sm">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Grid: Map & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <CommuteMap 
            originCoords={originCoords}
            destCoords={destCoords}
            onPickOrigin={onPickOrigin}
            activeFocus={activeFocus}
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

      {/* Output Section */}
      {summary && <TelemetryBanner summary={summary} />}
      {results && <ResultsGrid results={results} />}

    </div>
  )
}
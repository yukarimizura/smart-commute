import React from 'react'
import LocationInputs from './controlpanel/LocationInputs'
import ScheduleControls from './controlpanel/ScheduleControls'
import ModeControls from './controlpanel/ModeControls'

export default function ControlPanel(props) {
  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      {/* Header Panel */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Parameter Perjalanan
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
          DSS v2.0
        </span>
      </div>

      {/* 1. Kontrol Input Titik Lokasi */}
      <LocationInputs {...props} />

      {/* 2. Kontrol Waktu & Kalender */}
      <ScheduleControls {...props} />

      {/* 3. Kontrol Moda & Tombol Analisis */}
      <ModeControls {...props} />
    </div>
  )
}
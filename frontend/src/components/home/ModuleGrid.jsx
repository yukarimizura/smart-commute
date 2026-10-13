import React from 'react'

export default function ModuleGrid({ onStart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
      {/* Modul 1: Simulator */}
      <div
        onClick={onStart}
        className="group p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-sky-500/40 transition-all cursor-pointer backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-base p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            🧭
          </span>
          <span className="text-[10px] font-mono text-slate-400 group-hover:text-sky-400 transition-colors">
            MODUL 01 &rarr;
          </span>
        </div>
        <h3 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
          Simulator Multimoda
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-light leading-snug">
          Kombinasi rute motor, mobil, dan segmen rel stasiun transit secara global.
        </p>
      </div>

      {/* Modul 2: Cuaca & Emisi */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ☁️
          </span>
          <span className="text-[10px] font-mono text-slate-400">MODUL 02</span>
        </div>
        <h3 className="text-sm font-medium text-slate-200">
          Telemetri Lingkungan
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-light leading-snug">
          Integrasi satelit cuaca waktu-nyata dan perhitungan estimasi jejak karbon CO₂.
        </p>
      </div>

      {/* Modul 3: Persona Nyetir */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            ⚡
          </span>
          <span className="text-[10px] font-mono text-slate-400">MODUL 03</span>
        </div>
        <h3 className="text-sm font-medium text-slate-200">
          Analitik Driver Persona
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-light leading-snug">
          Penyesuaian kecepatan berdasar gaya berkendara dan buffer kemacetan puncak.
        </p>
      </div>
    </div>
  )
}
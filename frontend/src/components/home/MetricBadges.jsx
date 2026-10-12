import React from 'react'

export default function MetricBadges() {
  const metrics = [
    { title: 'TomTom & OSRM', desc: 'Live Traffic Geometries', color: 'sky' },
    { title: 'Open-Meteo', desc: 'Satelit Cuaca & Hujan', color: 'indigo' },
    { title: 'Multi-Criteria', desc: 'Evaluasi Waktu & Emisi', color: 'emerald' },
    { title: 'Driver Personas', desc: 'Skill Sat-Set vs Normal', color: 'amber' }
  ]

  const colorStyles = {
    sky: 'border-sky-500/40 text-sky-400 shadow-sky-500/10',
    indigo: 'border-indigo-500/40 text-indigo-400 shadow-indigo-500/10',
    emerald: 'border-emerald-500/40 text-emerald-400 shadow-emerald-500/10',
    amber: 'border-amber-500/40 text-amber-400 shadow-amber-500/10'
  }

  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-2xl bg-slate-900/80 border shadow-lg backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1 ${colorStyles[item.color]}`}
        >
          <div className="text-xl sm:text-2xl font-bold">{item.title}</div>
          <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
        </div>
      ))}
    </div>
  )
}
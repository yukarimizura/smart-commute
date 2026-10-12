import React from 'react'
import MetricBadges from './MetricBadges'

export default function HeroSection({ onStart }) {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center flex flex-col items-center justify-center">
      
      {/* Badge Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 text-xs text-sky-400 shadow-lg backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span className="font-medium tracking-wide">Decision Support System Berbasis Real-Time Telemetry</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight text-center">
        <span className="bg-gradient-to-r from-sky-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
          Navigasi Rute Cerdas
        </span>
      </h1>

      <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-center font-normal">
        Bukan sekadar penunjuk arah biasa. Smart Commute DSS mengevaluasi rute jalan, satelit cuaca, risiko keterlambatan kelas, penalti parkir, hingga jejak emisi karbon untuk memberikan rekomendasi moda transportasi terbaik bagi mahasiswa.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full">
        <button
          onClick={onStart}
          className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all"
        >
          Buka Simulasi Rute 🚀
        </button>
        <a
          href="https://github.com/yukarimizura/smart-commute"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all backdrop-blur-md"
        >
          Lihat Kode di GitHub ↗
        </a>
      </div>

      {/* Sub-komponen Badges */}
      <MetricBadges />
    </section>
  )
}
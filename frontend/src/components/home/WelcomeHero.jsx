import React, { useState, useEffect } from 'react'

export default function WelcomeHero({ onStart }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Stage 1: Tampilkan "Hello." secara perlahan
    const t1 = setTimeout(() => setStage(1), 150)
    // Stage 2: Tampilkan judul utama & deskripsi setelah "Hello." terbaca
    const t2 = setTimeout(() => setStage(2), 700)
    // Stage 3: Munculkan tombol navigasi
    const t3 = setTimeout(() => setStage(3), 1100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div className="my-auto py-12 flex flex-col items-center text-center">
      {/* 1. macOS Hello (Cursive / Serif Glow Animation) */}
      <div
        className={`transition-all duration-1000 transform ${
          stage >= 1
            ? 'opacity-100 translate-y-0 filter blur-0'
            : 'opacity-0 translate-y-6 filter blur-sm'
        }`}
      >
        <span className="font-serif italic text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-slate-400 tracking-tight drop-shadow-[0_0_35px_rgba(56,189,248,0.25)] select-none">
          Hello.
        </span>
      </div>

      {/* 2. Sub-Header & Content (Fade-in menyusul) */}
      <div
        className={`mt-4 transition-all duration-1000 delay-100 transform ${
          stage >= 2
            ? 'opacity-100 translate-y-0 filter blur-0'
            : 'opacity-0 translate-y-6 filter blur-sm'
        }`}
      >
        <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white max-w-2xl leading-tight">
          Mobilitas cerdas, <br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-indigo-400">
            tanpa tebak-tebakan rute.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl font-light leading-relaxed">
          Platform penunjang keputusan perjalanan harian. Menyatukan koridor jalan raya, jaringan transit rel global, probabilitas cuaca, hingga optimasi emisi karbon dalam satu kanvas navigasi terintegrasi.
        </p>
      </div>

      {/* 3. Action Buttons (Muncul terakhir dengan transisi halus) */}
      <div
        className={`mt-8 flex items-center gap-3.5 transition-all duration-700 transform ${
          stage >= 3
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={onStart}
          className="group px-6 py-2.5 rounded-2xl bg-white text-slate-950 font-semibold text-xs sm:text-sm shadow-xl shadow-white/10 hover:bg-slate-200 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Mulai Navigasi</span>
          <span className="text-xs group-hover:translate-x-1 transition-transform">&rarr;</span>
        </button>

        <a
          href="https://github.com/yukarimizura/smart-commute"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium border border-slate-800/80 hover:border-slate-700 transition-all backdrop-blur-md"
        >
          GitHub Repository
        </a>
      </div>
    </div>
  )
}
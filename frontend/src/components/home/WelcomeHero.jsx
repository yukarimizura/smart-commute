import React from 'react'

export default function WelcomeHero({ onStart }) {
  return (
    <div className="my-auto py-10 flex flex-col items-center text-center">
      {/* Tipografi kaligrafi elegan bergaya macOS Hello */}
      <span className="font-serif italic text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-slate-400 mb-2 tracking-normal">
        Hello.
      </span>

      <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white max-w-2xl leading-tight">
        Mobilitas cerdas, <br />
        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
          tanpa tebak-tebakan rute.
        </span>
      </h1>

      <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl font-light leading-relaxed">
        Platform penunjang keputusan perjalanan harian. Menyatukan koridor jalan raya, jaringan transit rel global, probabilitas cuaca, hingga optimasi emisi karbon dalam satu kanvas navigasi terintegrasi.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center gap-3.5">
        <button
          onClick={onStart}
          className="px-6 py-2.5 rounded-2xl bg-white text-slate-950 font-semibold text-xs sm:text-sm shadow-xl shadow-white/10 hover:bg-slate-200 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Buka Simulator Navigasi</span>
          <span className="text-xs">&rarr;</span>
        </button>

        <a
          href="https://github.com/yukarimizura/smart-commute"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium border border-slate-800 transition-all"
        >
          GitHub Repository
        </a>
      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react'

export default function GlassyLoader({ isVisible, message = "Memuat Sistem Navigasi..." }) {
  const [shouldRender, setShouldRender] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    } else {
      // Beri waktu 500ms agar animasi fade-out selesai sebelum dicopot dari DOM
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-2xl transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glow halo aura */}
        <div className="absolute w-28 h-28 bg-sky-500/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Spinner ring ganda */}
        <div className="w-12 h-12 rounded-full border-2 border-slate-700/50 border-t-sky-400 animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border-2 border-slate-700/30 border-b-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]" />
      </div>

      <div className="mt-5 flex flex-col items-center gap-1.5 font-mono">
        <span className="text-xs tracking-widest text-slate-200 uppercase animate-pulse">
          Smart Commute OS
        </span>
        <span className="text-[11px] text-slate-400 font-light tracking-wide">
          {message}
        </span>
      </div>
    </div>
  )
}
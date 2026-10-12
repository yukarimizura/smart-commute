import React from 'react'
import HeroSection from './HeroSection'
import FeatureGrid from './FeatureGrid'

export default function Home({ onStart }) {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Multi-Color Ambient Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-cyan-500/25 blur-[100px]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-72 rounded-full bg-indigo-600/30 blur-[110px]" />
        <div className="absolute top-10 -right-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      {/* Bagian Hero */}
      <HeroSection onStart={onStart} />

      {/* Bagian Fitur */}
      <FeatureGrid />

    </div>
  )
}
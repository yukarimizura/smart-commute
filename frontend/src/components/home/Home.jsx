import React from 'react'
import SystemStatusBar from './SystemStatusBar'
import WelcomeHero from './WelcomeHero'
import ModuleGrid from './ModuleGrid'

export default function Home({ onStart }) {
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between px-6 py-8 max-w-6xl mx-auto select-none">
      {/* Background Glow Halus */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* 1. Header Status Sistem */}
      <SystemStatusBar />

      {/* 2. Hero Sambutan macOS "Hello" */}
      <WelcomeHero onStart={onStart} />

      {/* 3. Drawer Modul Aplikasi */}
      <ModuleGrid onStart={onStart} />
    </div>
  )
}
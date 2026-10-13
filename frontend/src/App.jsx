import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home'
import Methodology from './components/methodology/Methodology'
import Simulator from './components/simulator/Simulator'
import GlassyLoader from './components/layout/GlassyLoader'
import { useCommuteSimulator } from './hooks/UseCommuteSimulator'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('smart_commute_tab') || 'home'
  })
  const simulator = useCommuteSimulator()

  // 1. Inisialisasi awal saat refresh halaman
  useEffect(() => {
    // Biarkan halaman terpasang di belakang layar terlebih dahulu, lalu hilangkan loader
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 450)
    return () => clearTimeout(timer)
  }, [])

  // 2. Perpindahan tab yang mulus (Background Pre-mount)
  const handleTabChange = (nextTab) => {
    if (nextTab === activeTab) return

    // Tutup layar dengan loader
    setIsLoading(true)
    localStorage.setItem('smart_commute_tab', nextTab)

    // Mount halaman baru langsung di belakang loader agar elemen/peta ter-render duluan
    setActiveTab(nextTab)

    // Beri jeda 350ms agar DOM selesai memuat elemen, lalu buka loader secara bertahap
    setTimeout(() => {
      setIsLoading(false)
    }, 350)
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-sky-500/30">
      {/* Glassy Loader dengan animasi masuk dan keluar (fade-out) */}
      <GlassyLoader
        isVisible={isLoading}
        message={activeTab === 'home' ? 'Menyiapkan Kanvas Navigasi...' : 'Memuat Modul Komputasi...'}
      />

      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="flex-1 w-full">
        {activeTab === 'home' && <Home onStart={() => handleTabChange('simulator')} />}
        {activeTab === 'simulator' && <Simulator {...simulator} />}
        {activeTab === 'methodology' && <Methodology />}
      </main>

      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Smart Commute Real-Time Engine &copy; 2026 &bull; Decision Support System Mobilitas Global
      </footer>
    </div>
  )
}
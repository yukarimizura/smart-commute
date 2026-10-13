import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home'
import Methodology from './components/methodology/Methodology'
import Simulator from './components/simulator/Simulator'
import { useCommuteSimulator } from './hooks/UseCommuteSimulator'

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator')
  const simulator = useCommuteSimulator()

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 w-full">
        {activeTab === 'home' && <Home onStart={() => setActiveTab('simulator')} />}
        {activeTab === 'simulator' && <Simulator {...simulator} />}
        {activeTab === 'methodology' && <Methodology />}
      </main>

      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Smart Commute Real-Time Engine &copy; 2026 &bull; Decision Support System Mobilitas Global
      </footer>
    </div>
  )
}
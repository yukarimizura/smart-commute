import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home'
import Methodology from './components/methodology/Methodology'
import Simulator from './components/simulator/Simulator'
import { analyzeRouteApi, geocodeSearch, getRoutePreviewApi } from './api/commuteApi'

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator')

  const [originCoords, setOriginCoords] = useState([-6.1301, 106.6930])
  const [destCoords, setDestCoords] = useState([-6.2018, 106.7822])
  const [originText, setOriginText] = useState("Citra 2 Extension, Jakarta Barat")
  const [destText, setDestText] = useState("BINUS Anggrek")
  const [activeFocus, setActiveFocus] = useState(null)

  // State untuk menyimpan opsi rute dinamis (mobil, motor, transit kereta)
  const [routesPreview, setRoutesPreview] = useState([])
  const [selectedRouteId, setSelectedRouteId] = useState(0)

  const [selectedMode, setSelectedMode] = useState("motorcycle")
  const [driverSkill, setDriverSkill] = useState("pro")

  // State Jadwal & Hari
  const [departureTime, setDepartureTime] = useState("07:30")
  const [dayType, setDayType] = useState("weekday")
  const [targetArrivalTime, setTargetArrivalTime] = useState("09:00")

  const [summary, setSummary] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  // Fetch rute dinamis otomatis ketika koordinat asal, tujuan, atau moda kendaraan berubah
  useEffect(() => {
    if (!originCoords || !destCoords) return

    let isMounted = true
    getRoutePreviewApi(originCoords, destCoords, selectedMode)
      .then((data) => {
        if (isMounted && data.routes && data.routes.length > 0) {
          setRoutesPreview(data.routes)
          setSelectedRouteId(0)
        }
      })
      .catch((err) => {
        console.error("Gagal memuat rute otomatis:", err)
      })

    return () => {
      isMounted = false
    }
  }, [originCoords, destCoords, selectedMode])

  const handleSearchOrigin = async () => {
    setErrorMsg(null)
    const res = await geocodeSearch(originText)
    if (res) {
      setOriginCoords([res.lat, res.lng])
      setActiveFocus([res.lat, res.lng])
    } else {
      setErrorMsg(`Alamat asal '${originText}' tidak ditemukan.`)
    }
  }

  const handleSearchDest = async () => {
    setErrorMsg(null)
    const res = await geocodeSearch(destText)
    if (res) {
      setDestCoords([res.lat, res.lng])
      setActiveFocus([res.lat, res.lng])
    } else {
      setErrorMsg(`Tujuan '${destText}' tidak ditemukan.`)
    }
  }

  const handlePickOrigin = (coords) => {
    setOriginCoords(coords)
    setActiveFocus(coords)
    setOriginText(`Titik Peta (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`)
  }

  const handleAnalyze = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const activeRoute = routesPreview.find(r => r.id === selectedRouteId) || routesPreview[0] || null
      const data = await analyzeRouteApi({
        originCoords,
        destCoords,
        selectedMode,
        driverSkill,
        departureTime,
        dayType,
        targetArrivalTime,
        selectedRoute: activeRoute
      })
      setSummary(data.summary)
      setResults(data.options)
      if (data.routes_preview && data.routes_preview.length > 0) {
        setRoutesPreview(data.routes_preview)
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setErrorMsg("Tidak dapat terhubung ke server Backend. Pastikan 'python run.py' aktif di port 8000.")
      } else {
        setErrorMsg(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* 1. Header Navbar Global */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Isi Halaman Berdasarkan Tab */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <Home onStart={() => setActiveTab('simulator')} />
        )}

        {activeTab === 'simulator' && (
          <Simulator
            originCoords={originCoords}
            destCoords={destCoords}
            originText={originText}
            setOriginText={setOriginText}
            destText={destText}
            setDestText={setDestText}
            activeFocus={activeFocus}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            driverSkill={driverSkill}
            setDriverSkill={setDriverSkill}
            departureTime={departureTime}
            setDepartureTime={setDepartureTime}
            dayType={dayType}
            setDayType={setDayType}
            targetArrivalTime={targetArrivalTime}
            setTargetArrivalTime={setTargetArrivalTime}
            summary={summary}
            results={results}
            loading={loading}
            errorMsg={errorMsg}
            onSearchOrigin={handleSearchOrigin}
            onSearchDest={handleSearchDest}
            onPickOrigin={handlePickOrigin}
            onAnalyze={handleAnalyze}
            routesPreview={routesPreview}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
          />
        )}

        {activeTab === 'methodology' && (
          <Methodology />
        )}
      </main>

      {/* 3. Footer Global */}
      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Smart Commute Real-Time Engine &copy; 2026 &bull; Decision Support System Mobilitas Mahasiswa
      </footer>
    </div>
  )
}
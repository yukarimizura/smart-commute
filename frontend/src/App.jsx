import { useState } from 'react'
import CommuteMap from './components/CommuteMap'
import ControlPanel from './components/ControlPanel'
import TelemetryBanner from './components/TelemetryBanner'
import ResultsGrid from './components/ResultsGrid'
import { analyzeRouteApi, geocodeSearch } from './api/commuteApi'

export default function App() {
  const [originCoords, setOriginCoords] = useState([-6.1301, 106.6930])
  const [destCoords, setDestCoords] = useState([-6.2018, 106.7822])
  const [originText, setOriginText] = useState("Citra 2 Extension, Jakarta Barat")
  const [destText, setDestText] = useState("BINUS Anggrek")
  const [activeFocus, setActiveFocus] = useState(null)
  
  const [selectedMode, setSelectedMode] = useState("car")
  const [driverSkill, setDriverSkill] = useState("pro")
  
  // State Baru: Jadwal & Hari
  const [departureTime, setDepartureTime] = useState("07:30")
  const [dayType, setDayType] = useState("weekday")
  const [targetArrivalTime, setTargetArrivalTime] = useState("09:00")

  const [summary, setSummary] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

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
      const data = await analyzeRouteApi({
        originCoords,
        destCoords,
        selectedMode,
        driverSkill,
        departureTime,
        dayType,
        targetArrivalTime
      })
      setSummary(data.summary)
      setResults(data.options)
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 px-4 py-6 md:px-8 md:py-8 font-sans antialiased">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        <header className="border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-xs font-bold border border-sky-500/30">
                AOL PROTOTYPE
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Smart Commute <span className="text-sky-400">DSS</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Decision Support System Mobilitas Mahasiswa: Pola Kemacetan Jakarta, Waktu Keberangkatan & Mitigasi Emisi
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-300">
            Tujuan: <strong className="text-emerald-400">{destText}</strong>
          </div>
        </header>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/40 p-3.5 rounded-xl text-rose-400 text-xs md:text-sm">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-7">
            <CommuteMap 
              originCoords={originCoords}
              destCoords={destCoords}
              onPickOrigin={handlePickOrigin}
              activeFocus={activeFocus}
            />
          </div>

          <div className="lg:col-span-5">
            <ControlPanel 
              originText={originText}
              setOriginText={setOriginText}
              destText={destText}
              setDestText={setDestText}
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
              onSearchOrigin={handleSearchOrigin}
              onSearchDest={handleSearchDest}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          </div>
        </div>

        <TelemetryBanner summary={summary} />

        <ResultsGrid results={results} />

      </div>
    </div>
  )
}
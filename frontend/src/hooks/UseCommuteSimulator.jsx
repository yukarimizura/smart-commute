import { useState, useEffect } from 'react'
import { analyzeRouteApi, geocodeSearch, getRoutePreviewApi } from '../api/commuteApi'

export function useCommuteSimulator() {
  // Koordinat & input teks
  const [originCoords, setOriginCoords] = useState([-6.1301, 106.6930])
  const [destCoords, setDestCoords] = useState([-6.2018, 106.7822])
  const [originText, setOriginText] = useState("Citra 2 Extension, Jakarta Barat")
  const [destText, setDestText] = useState("BINUS Anggrek")
  const [activeFocus, setActiveFocus] = useState(null)

  // Opsi rute dinamis (OSRM / Rail)
  const [routesPreview, setRoutesPreview] = useState([])
  const [selectedRouteId, setSelectedRouteId] = useState(0)

  // Parameter perjalanan & kendaraan
  const [selectedMode, setSelectedMode] = useState("motorcycle")
  const [driverSkill, setDriverSkill] = useState("pro")
  const [departureTime, setDepartureTime] = useState("07:30")
  const [dayType, setDayType] = useState("weekday")
  const [targetArrivalTime, setTargetArrivalTime] = useState("09:00")

  // Hasil evaluasi analitik & status
  const [summary, setSummary] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  // Ambil rute otomatis tiap kali asal, tujuan, atau moda berubah
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
        console.error("Gagal memuat rute:", err)
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
      if (data.routes_preview?.length > 0) {
        setRoutesPreview(data.routes_preview)
      }
    } catch (err) {
      setErrorMsg(err.message || "Gagal memproses analisis rute.")
    } finally {
      setLoading(false)
    }
  }

  return {
    originCoords,
    destCoords,
    originText,
    setOriginText,
    destText,
    setDestText,
    activeFocus,
    routesPreview,
    selectedRouteId,
    setSelectedRouteId,
    selectedMode,
    setSelectedMode,
    driverSkill,
    setDriverSkill,
    departureTime,
    setDepartureTime,
    dayType,
    setDayType,
    targetArrivalTime,
    setTargetArrivalTime,
    summary,
    results,
    loading,
    errorMsg,
    handleSearchOrigin,
    handleSearchDest,
    handlePickOrigin,
    handleAnalyze
  }
}
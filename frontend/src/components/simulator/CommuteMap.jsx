import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapController({ centerCoords }) {
  const map = useMap()
  useEffect(() => {
    if (centerCoords) {
      map.flyTo(centerCoords, 13, { duration: 1.2 })
    }
  }, [centerCoords, map])
  return null
}

function MapPicker({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

export default function CommuteMap({
  originCoords,
  destCoords,
  originText,
  setOriginText,
  destText,
  setDestText,
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
  onSearchOrigin,
  onSearchDest,
  onPickOrigin,
  onAnalyze,
  loading,
  activeFocus,
  routesPreview = [],
  selectedRouteId = 0,
  onSelectRoute
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      
      {/* 1. TOP COCKPIT BAR (INTEGRASI SEMUA KONTROL DI ATAS PETA) */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-xl space-y-3">
        {/* Baris 1: Input Alamat Asal dan Tujuan */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-5 flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-sky-400 text-sm">📍</span>
            <input
              type="text"
              value={originText}
              onChange={(e) => setOriginText(e.target.value)}
              placeholder="Cari lokasi asal..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onSearchOrigin}
              className="text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
            >
              Cari
            </button>
          </div>

          <div className="hidden md:flex md:col-span-1 justify-center text-slate-600 font-bold">
            ➔
          </div>

          <div className="md:col-span-6 flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-rose-400 text-sm">🎯</span>
            <input
              type="text"
              value={destText}
              onChange={(e) => setDestText(e.target.value)}
              placeholder="Cari lokasi tujuan..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onSearchDest}
              className="text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Baris 2: Parameter Filter & Tombol Eksekusi Analisis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-center pt-1 border-t border-slate-800/60">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Moda</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="motorcycle">🏍️ Motor</option>
              <option value="car">🚗 Mobil</option>
              <option value="krl">🚆 KRL / Transit</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Gaya Nyetir</label>
            <select
              value={driverSkill}
              onChange={(e) => setDriverSkill(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="pro">⚡ Sat-set / Pro</option>
              <option value="normal">🚙 Normal</option>
              <option value="beginner">🔰 Pemula</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Jam Berangkat</label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Target Tiba</label>
            <input
              type="time"
              value={targetArrivalTime}
              onChange={(e) => setTargetArrivalTime(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Hari</label>
            <select
              value={dayType}
              onChange={(e) => setDayType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="weekday">Hari Kerja</option>
              <option value="weekend">Akhir Pekan</option>
              <option value="holiday">Hari Libur</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex items-end">
            <button
              onClick={onAnalyze}
              disabled={loading}
              className="w-full py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-md hover:shadow-sky-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Menghitung...' : '⚡ Analisis DSS'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. KANVAS PETA UTAMA BERSIH (LEAFLET VIEWPORT) */}
      <div className="relative w-full h-[540px] lg:h-[620px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <MapContainer
          center={originCoords || [-6.1754, 106.8272]}
          zoom={12}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles-dark"
          />

          <MapController centerCoords={activeFocus} />
          <MapPicker onPick={onPickOrigin} />

          {originCoords && (
            <Marker position={originCoords}>
              <Popup>
                <div className="text-xs font-sans">
                  <span className="font-bold text-sky-400">Titik Asal</span><br />{originText}
                </div>
              </Popup>
            </Marker>
          )}

          {destCoords && (
            <Marker position={destCoords}>
              <Popup>
                <div className="text-xs font-sans">
                  <span className="font-bold text-rose-400">Titik Tujuan</span><br />{destText}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Render Garis Polyline Sesuai Moda */}
          {routesPreview.map((route) => {
            const isSelected = route.id === selectedRouteId

            if (route.mode_type === 'krl' && route.segments) {
              return (
                <React.Fragment key={route.id}>
                  <Polyline
                    positions={route.segments.first_mile}
                    pathOptions={{ color: '#0ea5e9', weight: 4, dashArray: '5, 8', opacity: 0.95 }}
                  >
                    <Popup>Jalan Kaki ke {route.segments.origin_station}</Popup>
                  </Polyline>

                  <Polyline
                    positions={route.segments.rail}
                    pathOptions={{ color: '#f43f5e', weight: 6, opacity: 1.0 }}
                  >
                    <Popup>Jalur Kereta: {route.segments.origin_station} ➔ {route.segments.dest_station}</Popup>
                  </Polyline>

                  <Polyline
                    positions={route.segments.last_mile}
                    pathOptions={{ color: '#0ea5e9', weight: 4, dashArray: '5, 8', opacity: 0.95 }}
                  >
                    <Popup>Jalan Kaki dari {route.segments.dest_station} ke Kampus</Popup>
                  </Polyline>
                </React.Fragment>
              )
            }

            return (
              <Polyline
                key={route.id}
                positions={route.coordinates}
                pathOptions={{
                  color: isSelected ? route.color : '#475569',
                  weight: isSelected ? 6 : 3.5,
                  opacity: isSelected ? 0.95 : 0.4,
                  dashArray: isSelected ? null : '5, 8'
                }}
                eventHandlers={{
                  click: () => onSelectRoute && onSelectRoute(route.id)
                }}
              >
                <Popup>
                  <div className="text-xs font-sans">
                    <strong>{route.label}</strong><br />
                    Jarak: {route.distance_km} km<br />
                    Durasi: &plusmn;{route.duration_minutes} menit
                  </div>
                </Popup>
              </Polyline>
            )
          })}
        </MapContainer>

        {/* 3. FLOATING ROUTE PILLS (RAMPING DI KANAN ATAS, TIDAK MENUTUPI PETA) */}
        {routesPreview.length > 0 && (
          <div className="absolute top-3 right-3 z-[1000] flex flex-wrap gap-1.5 max-w-[80%] justify-end">
            {routesPreview.map((r) => {
              const isSelected = r.id === selectedRouteId
              return (
                <button
                  key={r.id}
                  onClick={() => onSelectRoute && onSelectRoute(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md transition-all shadow-lg flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-sky-500/90 text-slate-950 font-bold border-sky-400'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate max-w-[140px] sm:max-w-[190px]">{r.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-950 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                    {r.duration_minutes}m
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* 4. PETUNJUK RINGKAS DI SUDUT BAWAH */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3 py-1 rounded-lg text-[11px] text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Jalur Rel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span> Jalan Kaki/Arteri
          </span>
          <span className="hidden sm:inline text-slate-500">• Klik peta untuk set titik asal</span>
        </div>

      </div>
    </div>
  )
}
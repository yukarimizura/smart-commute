import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

// Konfigurasi icon default Leaflet agar pin terbaca di React Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Komponen helper untuk auto-pan/zoom kamera peta saat koordinat berubah
function MapController({ centerCoords }) {
  const map = useMap()
  useEffect(() => {
    if (centerCoords) {
      map.flyTo(centerCoords, 13, { duration: 1.2 })
    }
  }, [centerCoords, map])
  return null
}

// Komponen helper untuk mengambil titik koordinat klik pengguna di peta
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
  onPickOrigin,
  activeFocus,
  routesPreview = [],
  selectedRouteId = 0,
  onSelectRoute
}) {
  return (
    <div className="relative w-full h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <MapContainer
        center={originCoords || [-6.1754, 106.8272]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController centerCoords={activeFocus} />
        <MapPicker onPick={onPickOrigin} />

        {/* Marker Titik Asal */}
        {originCoords && (
          <Marker position={originCoords}>
            <Popup>Titik Asal (Kos / Rumah)</Popup>
          </Marker>
        )}

        {/* Marker Titik Tujuan Kampus */}
        {destCoords && (
          <Marker position={destCoords}>
            <Popup>Titik Tujuan (BINUS Campus)</Popup>
          </Marker>
        )}

        {/* Render 2 - 3 Polylines Garis Rute Posibilitas */}
        {routesPreview.map((route) => {
          const isSelected = route.id === selectedRouteId
          return (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: isSelected ? route.color : '#94a3b8',
                weight: isSelected ? 6 : 4,
                opacity: isSelected ? 0.95 : 0.45,
                dashArray: isSelected ? null : '6, 8'
              }}
              eventHandlers={{
                click: () => onSelectRoute && onSelectRoute(route.id)
              }}
            >
              <Popup>
                <div className="text-xs">
                  <strong className="text-slate-900">{route.label}</strong><br />
                  Jarak: {route.distance_km} km<br />
                  Waktu: &plusmn;{route.duration_minutes} menit
                </div>
              </Popup>
            </Polyline>
          )
        })}
      </MapContainer>

      {/* Floating Card: Pemilih 2-3 Opsi Rute di atas Peta */}
      {routesPreview.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl shadow-xl space-y-1.5 max-w-[210px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Posibilitas Rute ({routesPreview.length})
          </div>
          {routesPreview.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelectRoute && onSelectRoute(r.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                r.id === selectedRouteId
                  ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/40 shadow'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <span className="truncate pr-1">{r.label}</span>
              <span className="font-mono text-[10px] whitespace-nowrap opacity-80">{r.duration_minutes}m</span>
            </button>
          ))}
        </div>
      )}

      {/* Petunjuk Interaksi */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-400">
        Klik peta untuk set titik asal &bull; Klik garis/tombol untuk pilih rute
      </div>
    </div>
  )
}
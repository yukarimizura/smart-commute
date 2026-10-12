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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController centerCoords={activeFocus} />
        <MapPicker onPick={onPickOrigin} />

        {/* Marker Titik Asal */}
        {originCoords && (
          <Marker position={originCoords}>
            <Popup>Titik Asal</Popup>
          </Marker>
        )}

        {/* Marker Titik Tujuan */}
        {destCoords && (
          <Marker position={destCoords}>
            <Popup>Titik Tujuan</Popup>
          </Marker>
        )}

        {/* Render Rute */}
        {routesPreview.map((route) => {
          const isSelected = route.id === selectedRouteId

          // JIKA MODA KRL: Gambar segmen first-mile, rel, dan last-mile secara bersih
          if (route.mode_type === 'krl' && route.segments) {
            return (
              <React.Fragment key={route.id}>
                {/* 1. First-Mile Jalan Kaki ke Stasiun */}
                <Polyline
                  positions={route.segments.first_mile}
                  pathOptions={{ color: '#38bdf8', weight: 4, dashArray: '4, 8', opacity: 0.9 }}
                >
                  <Popup>Jalan Kaki / Feeder ke {route.segments.origin_station}</Popup>
                </Polyline>

                {/* 2. Jalur Rel Kereta / KRL */}
                <Polyline
                  positions={route.segments.rail}
                  pathOptions={{ color: '#ef4444', weight: 6, opacity: 1.0 }}
                >
                  <Popup>Jalur Kereta Api: {route.segments.origin_station} ➔ {route.segments.dest_station}</Popup>
                </Polyline>

                {/* 3. Last-Mile Jalan Kaki dari Stasiun ke Tujuan */}
                <Polyline
                  positions={route.segments.last_mile}
                  pathOptions={{ color: '#38bdf8', weight: 4, dashArray: '4, 8', opacity: 0.9 }}
                >
                  <Popup>Jalan Kaki dari {route.segments.dest_station} ke Tujuan</Popup>
                </Polyline>
              </React.Fragment>
            )
          }

          // JIKA MOBIL ATAU MOTOR: Gambar garis polyline biasa
          return (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: isSelected ? route.color : '#64748b',
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
                  <strong>{route.label}</strong><br />
                  Jarak: {route.distance_km} km<br />
                  Waktu: &plusmn;{route.duration_minutes} menit
                </div>
              </Popup>
            </Polyline>
          )
        })}
      </MapContainer>

      {/* Floating Card: Pemilih Rute */}
      {routesPreview.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl shadow-xl space-y-1.5 max-w-[230px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Opsi Rute ({routesPreview.length})
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

      {/* Petunjuk Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/85 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-300 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Rel Kereta
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span> Jalan Kaki/Arteri
        </span>
      </div>
    </div>
  )
}
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import CockpitBar from './commutemap/CockpitBar'
import RoutePills from './commutemap/RoutePills'
import RouteLayers from './commutemap/RouteLayers'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapController({ centerCoords }) {
  const map = useMap()
  useEffect(() => {
    if (centerCoords) map.flyTo(centerCoords, 13, { duration: 1.2 })
  }, [centerCoords, map])
  return null
}

function MapPicker({ onPick }) {
  useMapEvents({
    click(e) { onPick([e.latlng.lat, e.latlng.lng]) },
  })
  return null
}

export default function CommuteMap(props) {
  const {
    originCoords,
    onPickOrigin,
    activeFocus,
    routesPreview,
    selectedRouteId,
    onSelectRoute,
    onAnalyze,
    loading
  } = props

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 1. Cockpit Kontrol Atas (Teruskan onAnalyze dan loading) */}
      <CockpitBar
        {...props}
        onAnalyze={onAnalyze}
        loading={loading}
      />

      {/* 2. Kanvas Peta Leaflet */}
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
          <RouteLayers
            {...props}
            selectedRouteId={selectedRouteId}
            onSelectRoute={onSelectRoute}
          />
        </MapContainer>

        {/* 3. Floating Route Pills */}
        <RoutePills
          routesPreview={routesPreview}
          selectedRouteId={selectedRouteId}
          onSelectRoute={onSelectRoute}
        />

        {/* 4. Legend Mini */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3 py-1 rounded-lg text-[11px] text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Rel Kereta</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400"></span> Jalan Raya</span>
          <span className="hidden sm:inline text-slate-500">• Klik peta untuk titik asal</span>
        </div>
      </div>
    </div>
  )
}
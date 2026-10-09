import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Auto-center kamera peta saat koordinat berubah
function MapController({ centerCoords }) {
    const map = useMap()
    useEffect(() => {
    if (centerCoords) {
        map.flyTo(centerCoords, 13, { duration: 1.2 })
    }
    }, [centerCoords, map])
    return null
    }

    function MapPicker({ position, onPick }) {
    useMapEvents({
    click(e) {
        onPick([e.latlng.lat, e.latlng.lng])
    },
    })
    return position ? (
    <Marker position={position}>
        <Popup>📍 Titik Asal Mahasiswa</Popup>
    </Marker>
    ) : null
    }

    export default function CommuteMap({ originCoords, destCoords, onPickOrigin, activeFocus }) {
    return (
    <div className="w-full h-[320px] sm:h-[380px] md:h-[420px] xl:h-[460px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative">
        <MapContainer 
        center={originCoords} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        >
        <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController centerCoords={activeFocus || originCoords} />
        <MapPicker position={originCoords} onPick={onPickOrigin} />
        <Marker position={destCoords}>
            <Popup>🎯 Titik Tujuan Kampus</Popup>
        </Marker>
        </MapContainer>
        
        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-300">
        Klik peta untuk set titik asal langsung
        </div>
    </div>
    )
}
import React from 'react'
import { Marker, Popup, Polyline } from 'react-leaflet'

export default function RouteLayers({
  originCoords,
  destCoords,
  originText,
  destText,
  routesPreview = [],
  selectedRouteId = 0,
  onSelectRoute
}) {
  return (
    <>
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

      {routesPreview.map((route) => {
        const isSelected = route.id === selectedRouteId

        // 1. RENDER KHUSUS KRL DENGAN SEGMEN (First Mile -> Rail -> Last Mile)
        if (route.mode_type === 'krl' && route.segments) {
          return (
            <React.Fragment key={route.id}>
              {/* Segmen 1: Jalan Kaki / Ojek ke Stasiun Keberangkatan */}
              <Polyline
                positions={route.segments.first_mile}
                pathOptions={{ color: '#0ea5e9', weight: 4, dashArray: '5, 8', opacity: 0.95 }}
              >
                <Popup>Menuju {route.segments.origin_station}</Popup>
              </Polyline>

              {/* Segmen 2: Jalur Kereta (Style Rel Ganda: Base Gelap + Dashed Cerah) */}
              <Polyline
                positions={route.segments.rail}
                pathOptions={{ color: '#0f172a', weight: 8, opacity: isSelected ? 1.0 : 0.4 }} // Rel Dasar
              />
              <Polyline
                positions={route.segments.rail}
                pathOptions={{ color: '#f43f5e', weight: 4, dashArray: '10, 15', opacity: isSelected ? 1.0 : 0.5 }} // Garis Putus Rel
                eventHandlers={{ click: () => onSelectRoute && onSelectRoute(route.id) }}
              >
                <Popup>
                  <div className="text-xs font-sans">
                    <strong>KRL Commuter Line</strong><br />
                    {route.segments.origin_station} ➔ {route.segments.dest_station}
                  </div>
                </Popup>
              </Polyline>

              {/* Segmen 3: Jalan Kaki dari Stasiun ke Tujuan Akhir */}
              <Polyline
                positions={route.segments.last_mile}
                pathOptions={{ color: '#0ea5e9', weight: 4, dashArray: '5, 8', opacity: 0.95 }}
              >
                <Popup>Dari {route.segments.dest_station} ke Tujuan</Popup>
              </Polyline>
            </React.Fragment>
          )
        }

        // 2. FALLBACK KRL (Jika backend tidak mengirim 'segments' tapi mode-nya KRL)
        if (route.mode_type === 'krl') {
          return (
            <React.Fragment key={route.id}>
              <Polyline positions={route.coordinates} pathOptions={{ color: '#0f172a', weight: isSelected ? 8 : 4, opacity: isSelected ? 0.9 : 0.3 }} />
              <Polyline
                positions={route.coordinates}
                pathOptions={{ color: '#f43f5e', weight: isSelected ? 4 : 2, dashArray: '10, 15', opacity: isSelected ? 1.0 : 0.4 }}
                eventHandlers={{ click: () => onSelectRoute && onSelectRoute(route.id) }}
              >
                <Popup>
                  <div className="text-xs font-sans">
                    <strong>{route.label}</strong><br />
                    Jarak: {route.distance_km} km<br />
                    Durasi: &plusmn;{route.duration_minutes} menit
                  </div>
                </Popup>
              </Polyline>
            </React.Fragment>
          )
        }

        // 3. RENDER REGULER: Mobil dan Motor (Jalan Raya Aspal)
        return (
          <Polyline
            key={route.id}
            positions={route.coordinates}
            pathOptions={{
              color: isSelected ? (route.color || '#0ea5e9') : '#475569',
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
    </>
  )
}
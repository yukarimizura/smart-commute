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
                <Popup>Jalan Kaki dari {route.segments.dest_station} ke Tujuan</Popup>
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
    </>
  )
}
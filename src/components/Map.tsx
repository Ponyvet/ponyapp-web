import {
  Map as GoogleMap,
  Marker,
  type MapCameraChangedEvent,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps'
import { useState, useCallback } from 'react'

interface MapProps {
  defaultCenter?: { lat: number; lng: number }
  defaultZoom?: number
  onLocationChange?: (location: { lat: number; lng: number }) => void
  className?: string
  markerPosition?: { lat: number; lng: number } | null
  showMarker?: boolean
  onMarkerPositionChange?: (position: { lat: number; lng: number }) => void
}

const Map = ({
  defaultCenter = { lat: 20.229, lng: -98.9984 },
  defaultZoom = 13,
  onLocationChange,
  className = 'h-64 w-full rounded-md border',
  markerPosition,
  showMarker = true,
  onMarkerPositionChange,
}: MapProps) => {
  const [center, setCenter] = useState(defaultCenter)

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      if (ev.detail.center) {
        const newCenter = {
          lat: ev.detail.center.lat,
          lng: ev.detail.center.lng,
        }
        setCenter(newCenter)
        onLocationChange?.(newCenter)
      }
    },
    [onLocationChange],
  )

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (event.detail.latLng) {
        const newPosition = {
          lat: event.detail.latLng.lat,
          lng: event.detail.latLng.lng,
        }
        onMarkerPositionChange?.(newPosition)
      }
    },
    [onMarkerPositionChange],
  )

  const handleMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        }
        onMarkerPositionChange?.(newPosition)
      }
    },
    [onMarkerPositionChange],
  )

  return (
    <div className={className}>
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        center={markerPosition || center}
        onCameraChanged={handleCameraChange}
        onClick={handleMapClick}
        mapId="clientLocationMap"
        gestureHandling="greedy"
        disableDefaultUI={false}
        clickableIcons={true}
        styles={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
          },
        ]}
      >
        {showMarker && markerPosition && (
          <Marker
            position={markerPosition}
            draggable={!!onMarkerPositionChange}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default Map

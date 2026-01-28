import {
  Map as GoogleMap,
  type MapCameraChangedEvent,
} from '@vis.gl/react-google-maps'
import { useState, useCallback } from 'react'

interface MapProps {
  defaultCenter?: { lat: number; lng: number }
  defaultZoom?: number
  onLocationChange?: (location: { lat: number; lng: number }) => void
  className?: string
}

const Map = ({
  defaultCenter = { lat: 19.4326, lng: -99.1332 },
  defaultZoom = 13,
  onLocationChange,
  className = 'h-64 w-full rounded-md border',
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

  return (
    <div className={className}>
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        center={center}
        onCameraChanged={handleCameraChange}
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
      />
    </div>
  )
}

export default Map

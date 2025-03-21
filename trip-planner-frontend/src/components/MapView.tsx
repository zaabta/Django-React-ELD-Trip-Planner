import { useCallback, useState } from 'react'
import polylineLib from '@mapbox/polyline';
import { GoogleMap, LoadScript, MarkerF, PolylineF } from '@react-google-maps/api'
import type { MapViewProps } from '../types'
import LocationOverlay from './LocationOverlay'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 41.0082,
  lng: 28.9784,
}

export default function MapView({
  currentLocation,
  pickupLocation,
  dropoffLocation,
  route,
}: MapViewProps): JSX.Element {
  const [loadedMap, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  return (
    <div className="relative mb-8 w-full rounded-xl shadow-md h-[500px] max-sm:h-[300px]">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY || ''}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad}>
          <MarkerF
            position={currentLocation.coordinates}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
          <MarkerF
            position={pickupLocation.coordinates}
            icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          />
          <MarkerF
            position={dropoffLocation.coordinates}
            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          />
          {route && (
            <PolylineF
              path={polylineLib.decode(route).map(([lat, lng]) => ({ lat, lng }))}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 4,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <LocationOverlay
        currentLocation="Current Location"
        pickupLocation="Pickup Location"
        dropoffLocation="Dropoff Location"
      />
    </div>
  )
}

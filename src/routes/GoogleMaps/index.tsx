import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { useCallback, useState, useRef } from 'hooks'
import styles from './maps.module.scss'

const center = {
  lat: -3.745,
  lng: -38.523,
}

const request = {
  query: '맛집',
  fields: ['name', 'geometry'],
}

const GoogleMaps = () => {
  const mapRef = useRef<google.maps.Map>()
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    libraries: ['places'],
  })

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance

    const service = new google.maps.places.PlacesService(mapInstance)
    service.textSearch(request, (res, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && res) {
        setResults(res)

        if (res[0].geometry?.location) {
          mapInstance.setCenter(res[0].geometry.location)
        }
      }
    })
  }, [])

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={{
          width: '400px',
          height: '400px',
        }}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {results.map((place) => {
          const lat = place.geometry?.location?.lat() ?? 0
          const lng = place.geometry?.location?.lng() ?? 0

          return <Marker key={place.place_id} position={{ lat, lng }} />
        })}
      </GoogleMap>
    )
  }

  return <div className={styles.maps}>{isLoaded ? renderMap() : <p>로딩...</p>}</div>
}

export default GoogleMaps

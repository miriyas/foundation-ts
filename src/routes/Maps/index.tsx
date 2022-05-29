import { MouseEvent } from 'react'
import { Map, MapMarker, MapTypeId, Roadview } from 'react-kakao-maps-sdk'

import styles from './maps.module.scss'

import { useState } from 'hooks'

// https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/roadview/basicRoadview2

const Maps = () => {
  const [mapTypeId, setMapTypeId] = useState<kakao.maps.MapTypeId>()
  const [roadViewLat, setRoadViewLat] = useState<number | undefined>()
  const [roadViewLon, setRoadViewLon] = useState<number | undefined>()

  const setMapType = (e: MouseEvent<HTMLButtonElement>) => {
    const newMapTypeId = e.currentTarget.dataset.target as unknown as kakao.maps.MapTypeId
    setMapTypeId(newMapTypeId)
  }

  const onClickMapRoadViewCoords = (_: kakao.maps.Map, event: kakao.maps.event.MouseEvent) => {
    setRoadViewLat(event.latLng?.getLat() ?? 0)
    setRoadViewLon(event.latLng?.getLng() ?? 0)
  }

  return (
    <div className={styles.maps}>
      <Map
        className={styles.mapWrapper}
        center={{ lat: 33.450701, lng: 126.570667 }}
        // style={{ width: '60%', height: '100%' }}
        onClick={onClickMapRoadViewCoords}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
          <div style={{ color: '#000' }}>Hello World!</div>
        </MapMarker>
        {mapTypeId && <MapTypeId type={mapTypeId} />}
      </Map>
      {roadViewLat && roadViewLon && (
        <Roadview
          className={styles.roadViewWrapper}
          position={{
            lat: roadViewLat,
            lng: roadViewLon,
            radius: 50,
          }}
          style={{
            width: '100%',
            height: '450px',
          }}
        />
      )}

      <button type='button' id='btnRoadmap' data-target={kakao.maps.MapTypeId.TRAFFIC} onClick={setMapType}>
        교통정보
      </button>
      <button type='button' id='btnSkyview' data-target={kakao.maps.MapTypeId.ROADVIEW} onClick={setMapType}>
        로드뷰
      </button>
    </div>
  )
}

export default Maps

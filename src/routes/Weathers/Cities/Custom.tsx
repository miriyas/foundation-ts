import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import styles from './Cities.module.scss'

import { useMount, useState } from 'hooks'
import { getWeatherForecast5DaysApi } from 'services/weather'
import WeatherItem from 'routes/Weathers/Item'

const WeatherCustom = () => {
  const [searchParams] = useSearchParams()
  const [lat, setLat] = useState(searchParams.get('lat') ?? '')
  const [lon, setLon] = useState(searchParams.get('lon') ?? '')

  useMount(() => {
    if (!lat || !lon) return
    handleSubmit()
  })

  const { data, refetch } = useQuery(
    ['getWeatherForecast5DaysApi', lat, lon],
    () => getWeatherForecast5DaysApi({ lat: Number(lat), lon: Number(lon) }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      staleTime: 6 * 10 * 1000,
    }
  )

  const handleSubmit = () => {
    refetch()
  }

  const handleLatChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLat(e.currentTarget.value)
  }

  const handleLonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLon(e.currentTarget.value)
  }

  return (
    <section className={styles.city}>
      <h1>{data ? data.city.name : 'Custom location'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.leftWing}>
          <input type='text' onChange={handleLatChange} value={lat} placeholder='lat' />
          <input type='text' onChange={handleLonChange} value={lon} placeholder='lon' />
        </div>
        <button type='submit'>확인</button>
      </form>
      <div className={styles.forecast}>
        <h2>Next forecast</h2>
        {data ? (
          <ul>
            {data.list.map((item) => (
              <WeatherItem key={item.dt_txt} item={item} />
            ))}
          </ul>
        ) : (
          <div className={styles.placeholderMsg}>Enter lat/lon</div>
        )}
      </div>
    </section>
  )
}

export default WeatherCustom

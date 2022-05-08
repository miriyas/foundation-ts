// import dayjs from 'dayjs'
import styles from './Weather.module.scss'

import { useMount, useState } from 'hooks'
import { getWeatherApi } from 'services/weather'
import { IWeatherAPIRes } from 'types/weather.d'
import WeatherItem from 'routes/Weathers/Item'

const Weather = () => {
  const [data, setData] = useState<IWeatherAPIRes>()

  useMount(() => {
    getWeatherApi({
      appid: '62ddf1108af7c922d3645ed650fe5ee9',
      lat: 37.494958,
      lon: 126.844128,
      units: 'metric',
    }).then((res) => {
      setData(res.data)
    })
  })

  if (!data) return null

  return (
    <section className={styles.weather}>
      <h1>{data.city.name}</h1>
      <div className={styles.forecast}>
        <h2>Next forecast</h2>
        <ul>
          {data.list.map((item) => (
            <WeatherItem key={item.dt_txt} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Weather

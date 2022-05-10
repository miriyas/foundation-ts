import styles from './Cities.module.scss'

import { useMount, useState, useUnmount } from 'hooks'
import { getWeatherForecast5DaysApi } from 'services/weather'
import { IWeatherAPIRes } from 'types/weather.d'
import WeatherItem from 'routes/Weathers/Item'

let interval: NodeJS.Timeout

const WeatherKwangmyung = () => {
  const [data, setData] = useState<IWeatherAPIRes>()

  useMount(() => {
    interval = setInterval(() => {
      getWeatherForecast5DaysApi({
        lat: 37.494958,
        lon: 126.844128,
      }).then((res) => {
        setData(res.data)
      })
    }, 3000)
  })

  useUnmount(() => {
    clearInterval(interval)
  })

  if (!data) return null

  return (
    <section className={styles.city}>
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

export default WeatherKwangmyung

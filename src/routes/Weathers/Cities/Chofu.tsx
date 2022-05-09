import styles from './Cities.module.scss'

import { useMount, useState } from 'hooks'
import { getWeatherForecast5DaysApi } from 'services/weather'
import { IWeatherAPIRes } from 'types/weather.d'
import WeatherItem from 'routes/Weathers/Item'

const WeatherChofu = () => {
  const [data, setData] = useState<IWeatherAPIRes>()

  useMount(() => {
    getWeatherForecast5DaysApi({
      lat: 35.661131270779514,
      lon: 139.58462970568925,
      units: 'metric',
    }).then((res) => {
      setData(res.data)
    })
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

export default WeatherChofu

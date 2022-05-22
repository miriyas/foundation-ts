import { useQuery } from 'react-query'
import styles from './cities.module.scss'

import { getWeatherForecast5DaysApi } from 'services/weather'
import { isAxiosError } from 'utils/axios'
import List from 'routes/Weathers/Cities/List'

const WeatherKwangmyung = () => {
  const lat = 37.494958
  const lon = 126.844128

  const { data, isLoading } = useQuery(
    ['getWeatherForecast5DaysApi', lat, lon],
    () => getWeatherForecast5DaysApi({ lat, lon }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 3000,
      onError(err) {
        if (isAxiosError(err)) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
      },
    }
  )

  return (
    <section className={styles.city}>
      {isLoading && 'loading...'}
      <List data={data} />
    </section>
  )
}

export default WeatherKwangmyung

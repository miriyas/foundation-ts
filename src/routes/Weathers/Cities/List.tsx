import styles from './cities.module.scss'

import { IWeatherAPIRes } from 'types/weather.d'

import WeatherItem from 'routes/Weathers/Item'

interface Props {
  data?: IWeatherAPIRes
}

const List = ({ data }: Props) => {
  if (!data) return null

  return (
    <>
      <h1>{data.city.name}</h1>
      <div className={styles.forecast}>
        <h2>Next forecast</h2>
        <ul>
          {data.list.map((item) => (
            <WeatherItem key={item.dt_txt} item={item} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default List

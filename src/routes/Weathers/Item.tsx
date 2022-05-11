import cx from 'classnames'
import dayjs from 'dayjs'
import styles from './Weather.module.scss'

import { IListItem } from 'types/weather.d'
import { getWeatherIcon } from 'utils/weather'

interface Props {
  item: IListItem
}

const WeatherItem = ({ item }: Props) => {
  const WeatherIcon = getWeatherIcon(item.weather[0].main)

  return (
    <li key={item.dt_txt}>
      <dl>
        <div>
          <dt>날짜</dt>
          <dd>
            <time dateTime={`${item.dt}`}>{dayjs(item.dt_txt).format('dddd')}</time>
            <time dateTime={`${item.dt}`}>{dayjs(item.dt_txt).format('MMM, D')}</time>
          </dd>
        </div>
        <div className={styles.temp}>
          <dt>온도</dt>
          <dd>
            {Math.floor(item.main.temp)}
            <sup>℃</sup>
          </dd>
        </div>
        <div>
          <dt>날씨</dt>
          <dd>
            <WeatherIcon />
          </dd>
        </div>
      </dl>
    </li>
  )
}

export default WeatherItem
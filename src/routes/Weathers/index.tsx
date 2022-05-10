import cx from 'classnames'
import styles from './Weather.module.scss'
import { Link, NavLink, useParams } from 'react-router-dom'

import WeatherCustom from './Cities/Custom'
import WeatherChofu from './Cities/Chofu'
import WeatherKwangmyung from './Cities/Kwangmyung'
import { Suspense } from 'react'

const Weather = () => {
  const { city } = useParams<{ city: string }>()

  return (
    <main className={styles.weather}>
      <nav className={styles.lnb}>
        <ul>
          <li>
            <Link to='' className={cx({ [styles.isActive]: !city })}>
              Custom
            </Link>
          </li>
          <li>
            <NavLink to='kwangmyung' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              Kwangmyung
            </NavLink>
          </li>
          <li>
            <NavLink to='chofu' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              Chofu
            </NavLink>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<div>로딩.....................</div>}>
        {!city && <WeatherCustom />}
        {city === 'chofu' && <WeatherChofu />}
        {city === 'kwangmyung' && <WeatherKwangmyung />}
      </Suspense>
    </main>
  )
}

export default Weather

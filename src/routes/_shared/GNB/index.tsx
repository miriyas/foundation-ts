import cx from 'classnames'
import styles from './GNB.module.scss'
import { NavLink } from 'react-router-dom'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='todo' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Todo
          </NavLink>
        </li>
        <li>
          <NavLink to='weather' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Weather
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB

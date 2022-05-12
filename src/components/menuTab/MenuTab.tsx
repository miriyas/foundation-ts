import { NavLink } from 'react-router-dom'

import { cx } from 'styles'
import styles from './MenuTab.module.scss'
import { ImSearch } from 'react-icons/im'
import { FaStar } from 'react-icons/fa'

// TODO: Navlink로 변경, 현재 페이지 표시, 분리
const MenuTab = () => {
  return (
    <nav className={cx(styles.wrapper)}>
      <NavLink to='/' className={({ isActive }) => cx(styles.menu, { [styles.active]: isActive })}>
        <ImSearch size='1.4em' />
      </NavLink>
      <NavLink to='/favorites' className={({ isActive }) => cx(styles.menu, { [styles.active]: isActive })}>
        <FaStar size='1.6em' />
      </NavLink>
    </nav>
  )
}

export default MenuTab

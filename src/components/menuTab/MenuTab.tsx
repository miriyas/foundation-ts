import React from 'react'
import { Link } from 'react-router-dom'

import { cx } from 'styles'
import styles from './MenuTab.module.scss'
import { HiOutlineViewList } from 'react-icons/hi'
import { FiStar } from 'react-icons/fi'

// TODO: Navlink로 변경, 현재 페이지 표시, 분리
const MenuTab = () => {
  return (
    <nav className={cx(styles.wrapper)}>
      <Link to='/' className={cx(styles.menu)}>
        <HiOutlineViewList size='1.6em' />
      </Link>
      <Link to='/favorites' className={cx(styles.menu)}>
        <FiStar size='1.6em' />
      </Link>
    </nav>
  )
}

export default MenuTab

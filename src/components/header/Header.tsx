import { useState } from 'react'
import { BsFillMoonFill } from 'react-icons/bs'
import { IoMdSunny } from 'react-icons/io'
import { useLocation } from 'react-router-dom'

import { cx } from 'styles'
import styles from './Header.module.scss'

// TODO: search bar 분리, onClick 페이지마다 이벤트 받아오기
const Header = () => {
  const { pathname } = useLocation()

  const [toggleDarkMode, settoggleDarkMode] = useState(false)

  const handleClickDarkMode = () => {
    settoggleDarkMode((prev) => !prev)
  }

  return (
    <header className={cx(styles.wrapper)}>
      {/* <SearchBar pathname={pathname} setToggleSearchBar={setToggleSearchBar} toggleSearchBar={toggleSearchBar} /> */}

      <h3 className={cx(styles.title)}>
        <strong>{pathname === '/' ? 'Movies' : 'Favorites'}</strong>
      </h3>

      <div className={cx(styles.darkMode)}>
        <button type='button' onClick={handleClickDarkMode}>
          {toggleDarkMode ? <BsFillMoonFill size='1.1em' color='yellow' /> : <IoMdSunny size='1.5em' color='white' />}
        </button>
      </div>
    </header>
  )
}

export default Header

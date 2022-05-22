import store from 'store'
import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './GNB.module.scss'

import i18n from 'utils/locale'
import { useAppDispatch, useAppSelector, useEffect, useGA, useI18n, useState } from 'hooks'
import { getTheme, toggleTheme } from 'states/system'

const storedLang = store.get('wanted.language') || 'EN'

const GNB = () => {
  const t = useI18n()
  const { gaEvent } = useGA()
  const [lang, setLang] = useState(storedLang)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(getTheme)

  const handleLangClick = () => {
    setLang(lang === 'EN' ? 'KO' : 'EN')
    i18n.changeLanguage(lang.toLowerCase())
    gaEvent({ action: 'language-changed', data: { lang } })
  }

  const handleThemeClick = () => {
    dispatch(toggleTheme())
    gaEvent({ action: 'theme-changed', data: { theme: theme === 'light' ? 'dark' : 'light' } })
  }

  useEffect(() => {
    store.set('wanted.language', lang)
  }, [lang])

  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='corona' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            {`${t('front:gnb.corona')}`}
          </NavLink>
        </li>
        <li>
          <NavLink to='todo' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            {`${t('front:gnb.todo')}`}
          </NavLink>
        </li>
        <li>
          <NavLink to='weather' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            {`${t('front:gnb.weather')}`}
          </NavLink>
        </li>
      </ul>
      <div className={styles.rightWing}>
        <button type='button' onClick={handleThemeClick} className={styles.theme}>
          {theme}
        </button>
        <button type='button' onClick={handleLangClick} className={styles.language}>
          {lang}
        </button>
      </div>
    </nav>
  )
}

export default GNB

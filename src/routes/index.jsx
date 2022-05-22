import { useMount } from 'react-use'
import { Routes, Route, useLocation } from 'react-router-dom'
import styles from './routes.module.scss'

import { useAppSelector, useEffect, useGA } from 'hooks'
import { getTheme } from 'states/system'

import Corona from './Corona'
import TodoList from './TodoList'
import Weather from './Weathers'
import GNB from 'routes/_shared/GNB'

const App = () => {
  const theme = useAppSelector(getTheme)
  const { initializeGA, gaPV } = useGA()
  const { pathname, search } = useLocation()

  useMount(() => {
    initializeGA()
    document.documentElement.setAttribute('color-theme', theme)
  })

  useEffect(() => {
    gaPV(`${pathname}${search}`)
  }, [gaPV, pathname, search])

  return (
    <div className={styles.appWrapper}>
      <GNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<TodoList />} />
          <Route path='corona' element={<Corona />} />
          <Route path='todo' element={<TodoList />} />
          <Route path='weather' element={<Weather />}>
            <Route path=':city' element={<Weather />} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

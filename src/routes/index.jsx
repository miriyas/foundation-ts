import { useMount } from 'react-use'
import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import { useAppSelector, useGA } from 'hooks'
import { getTheme } from 'states/system'

import TodoList from './TodoList'
import Weather from './Weathers'
import GNB from 'routes/_shared/GNB'

const App = () => {
  const theme = useAppSelector(getTheme)
  const { initializeGA } = useGA()

  useMount(() => {
    initializeGA()
    document.documentElement.setAttribute('color-theme', theme)
  })

  return (
    <div className={styles.appWrapper}>
      <GNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<TodoList />} />
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

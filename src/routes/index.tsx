import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'

import MainPage from './mainPage'
import FavoritePage from './favoritePage'

import Container from 'components/container/Container'
import Header from 'components/header/Header'
import MenuTab from 'components/menuTab/MenuTab'
import { Suspense } from 'react'

// TODO: 추후 라우팅, outlet
const App = () => {
  return (
    <div className={styles.app}>
      <Container>
        <Suspense
          fallback={
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '500px',
                height: '500px',
                backgroundColor: 'yellow',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
              }}
            >
              loading...
            </div>
          }
        >
          <Header />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='favorites' element={<FavoritePage />} />
          </Routes>
          <MenuTab />
        </Suspense>
      </Container>
    </div>
  )
}

export default App

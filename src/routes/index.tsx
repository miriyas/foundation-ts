import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'

import MainPage from './MainPage'
import FavoritePage from './FavoritePage'

import Container from 'components/container/Container'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Suspense } from 'react'
import Loading from 'components/Loading'

// TODO: 추후 라우팅, outlet
const App = () => {
  return (
    <div className={styles.app}>
      <Container>
        <Suspense fallback={<Loading />}>
          <Header />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='favorites' element={<FavoritePage />} />
          </Routes>
          <Footer />
        </Suspense>
        <div className={styles.night}>
          <div className={styles.shootingStar} />
          <div className={styles.shootingStar} />
          <div className={styles.shootingStar} />
          <div className={styles.shootingStar} />

          <div className={styles.shootingStar} />
          <div className={styles.shootingStar} />
        </div>
      </Container>
    </div>
  )
}

export default App

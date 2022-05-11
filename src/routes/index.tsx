import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'

import MainPage from './mainPage'
import FavoritePage from './favoritePage'

import Container from 'components/container/Container'
import Header from 'components/header/Header'
import MenuTab from 'components/menuTab/MenuTab'

// 추후 라우팅
const App = () => {
  return (
    <div className={styles.app}>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/favorites' element={<FavoritePage />} />
        </Routes>
        <MenuTab />
      </Container>
    </div>
  )
}

export default App

import { lazy, Suspense, useState } from 'react'
import store from 'store'
import { cx } from 'styles'
import styles from './MainPage.module.scss'
import { useRecoilValue, useRecoil } from 'hooks/state/'
import { IMovieItem } from 'types/movie'
import { errorMovieState, moviesState } from 'states/movieItem'
import FavoriteModal from 'components/favoriteModal/FavoriteModal'
import { favoritesState } from 'states/favoriteItem'
import useIntersectionObserver from 'hooks/infiniteScroll'

const LazyMovieListItem = lazy(() => import('components/movieListItem/MovieListItem'))

const MainPage = () => {
  const [movies, ,] = useRecoil(moviesState)
  const [, setFavoriteMovies] = useRecoil(favoritesState)
  const findError = useRecoilValue(errorMovieState)

  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddFavorite = () => {
    // TODO: 이미 존재하는 경우 => 모달도 변경?
    if (selectedMovie) {
      setFavoriteMovies((prev) => {
        store.set('favorite_movies', [...prev, selectedMovie])
        return [...prev, selectedMovie]
      })
    }
    setModalVisible(false)
  }

  const handleOpenModal = (value: IMovieItem) => {
    setSelectedMovie(value)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const onIntersect: IntersectionObserverCallback = ([entries], observer) => {
    if (entries.isIntersecting) {
      console.log('결과 observer', observer)
    }
  }

  const { setTarget } = useIntersectionObserver({
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  })
  // TODO: 검색바 분리해서 AXIOS CALL 함수 넘겨서 로딩화면 만들기

  return (
    <main className={styles.wrapper}>
      {modalVisible && <FavoriteModal onClick={handleAddFavorite} onCancel={handleCloseModal} content='추가' />}
      <div className={styles.infoText}>
        {findError.isError && <p>Error: {findError.error}</p>}
        {!findError.isError && movies?.length === 0 && <p>검색 결과가 없습니다.</p>}
      </div>
      {/* article? 확인, undefined 뜨면 []로 초기화 */}

      <Suspense fallback={<div>setTarget</div>}>
        {movies.length > 0 && (
          <ul className={cx({ [styles.movieLists]: movies.length > 0 })}>
            {movies.map((value) => (
              <LazyMovieListItem key={value.imdbID} movie={value} onClick={() => handleOpenModal(value)} />
            ))}
            <li ref={setTarget} />
          </ul>
        )}
      </Suspense>
    </main>
  )
}

export default MainPage

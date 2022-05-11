import React, { Suspense, useRef, useState, lazy } from 'react'
import store from 'store'
import { useRecoilState, useRecoilValue, useRecoil } from 'hooks/state/'
import MovieListItem from 'components/movieListItem/MovieListItem'
import styles from './FavoritePage.module.scss'
import { favoritesState } from 'states/favoriteItem'
import FavoriteModal from 'components/favoriteModal/FavoriteModal'
import { IMovieItem } from 'types/movie'
import useIntersectionObserver from 'hooks/infiniteScroll'

const LazyMovieListItem = lazy(() => import('components/movieListItem/MovieListItem'))

const FavoritePage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [favoriteMovies, setFavoriteMovies, resetFavoriteMovies] = useRecoil(favoritesState)
  const [selectedFavoriteMovie, setSelectedFavoriteMovie] = useState<IMovieItem | null>(null)

  const handleOpenModal = (value: IMovieItem) => {
    setSelectedFavoriteMovie(value)
    setModalVisible(true)
  }
  const handleRemoveFavorite = () => {
    const storedFavoriteMovies = store.get('favorite_movies')
    if (selectedFavoriteMovie) {
      setFavoriteMovies((prev) => prev.filter((value) => value.imdbID !== selectedFavoriteMovie.imdbID))
      const newFavorites = storedFavoriteMovies.filter(
        (value: IMovieItem) => value.imdbID !== selectedFavoriteMovie.imdbID
      )
      // TODO: 아래 상수로 변경
      store.set('favorite_movies', newFavorites)
    }
    setModalVisible(false)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const observerRoot = useRef<HTMLElement>(null)

  const onIntersect: IntersectionObserverCallback = ([entries], observer) => {
    console.log('결과 ', entries)
    console.log('결과 observer', observer)
  }
  const { setTarget } = useIntersectionObserver({
    root: observerRoot.current,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  })

  // TODO: WTF Lazy
  return (
    <main className={styles.wrapper}>
      <ul className={styles.movieLists} ref={setTarget}>
        <Suspense fallback={<div>Loading...</div>}>
          {favoriteMovies?.length > 0 &&
            favoriteMovies.map((value) => (
              <LazyMovieListItem key={value.imdbID} movie={value} onClick={() => handleOpenModal(value)} />
            ))}
        </Suspense>
      </ul>

      {modalVisible && <FavoriteModal onClick={handleRemoveFavorite} onCancel={handleCloseModal} content='제거' />}
    </main>
  )
}

export default FavoritePage

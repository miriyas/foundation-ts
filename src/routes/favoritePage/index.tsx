import React, { Suspense, useRef, useState, lazy } from 'react'
import store from 'store'
import { useRecoilState, useRecoilValue, useRecoil } from 'hooks/state/'
import MovieItem from 'components/movieItem/MovieItem'
import styles from './FavoritePage.module.scss'
import { favoritesState } from 'states/favoriteItem'
import FavoriteModal from 'components/favoriteModal/FavoriteModal'
import { IMovieItem } from 'types/movie'
import useIntersectionObserver from 'hooks/infiniteScroll'
import SearchBar from 'components/searchBar'
import { moviesState } from 'states/movieItem'

const LazyMovieItem = lazy(() => import('components/movieItem/MovieItem'))

const FavoritePage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [favoriteMovies, setFavoriteMovies, resetFavoriteMovies] = useRecoil(favoritesState)
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
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

      setMovies((prevMovies) => {
        return prevMovies.map((prevValue) => {
          if (prevValue.imdbID === selectedFavoriteMovie.imdbID && prevValue.title === selectedFavoriteMovie.title) {
            return { ...selectedFavoriteMovie, isLiked: false }
          }
          return prevValue
        })
      })
    }
    setModalVisible(false)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // TODO: WTF Lazy
  return (
    <>
      <SearchBar />
      <main className={styles.wrapper}>
        <ul className={styles.movieLists}>
          <Suspense fallback={<div>Loading...</div>}>
            {favoriteMovies?.length > 0 &&
              favoriteMovies.map((value) => (
                <LazyMovieItem key={value.imdbID} movie={value} onClick={() => handleOpenModal(value)} />
              ))}
          </Suspense>
        </ul>

        {modalVisible && <FavoriteModal onClick={handleRemoveFavorite} onCancel={handleCloseModal} content='제거' />}
      </main>
    </>
  )
}

export default FavoritePage

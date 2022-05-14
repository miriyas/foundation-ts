import React, { Suspense, useRef, useState, lazy } from 'react'
import store from 'store'
import { useRecoilState, useRecoilValue, useRecoil } from 'hooks/state/'
import styles from './FavoritePage.module.scss'
import { favoritesState } from 'states/favoriteItem'
import { IMovieItem } from 'types/movie'
import useIntersectionObserver from 'hooks/infiniteScroll'
import { moviesState } from 'states/movieItem'
import { MovieItem, Modal, SearchBar } from 'components'
import DragList from './DragList'
// import MovieItem from 'components/MovieItem'
// import Modal from 'components/Modal'
// import SearchBar from 'components/SearchBar'

const LazyMovieItem = lazy(() => import('components/MovieItem'))

const FavoritePage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [favoriteMovies, setFavoriteMovies, resetFavoriteMovies] = useRecoil(favoritesState)
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
  const [selectedFavoriteMovie, setSelectedFavoriteMovie] = useState<IMovieItem | null>(null)
  const [grab, setGrab] = useState<HTMLLIElement | null>(null)

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

  // TODO: Favorite search
  // TODO: or main은 위에 두고 똑같은 ref 갖고 오기?
  return (
    <>
      <SearchBar />
      <DragList />
      <main className={styles.wrapper}>
        <ul className={styles.movieLists}>
          <Suspense fallback={<div>Loading...</div>}>
            {favoriteMovies?.length > 0 &&
              favoriteMovies.map((value, index) => (
                <LazyMovieItem
                  dragOk
                  index={index}
                  grab={grab}
                  setGrab={setGrab}
                  key={`${value.imdbID}-list-${index + 1}`}
                  movie={value}
                  onClick={() => handleOpenModal(value)}
                />
              ))}
          </Suspense>
        </ul>

        {modalVisible && selectedFavoriteMovie && (
          <Modal
            onClick={handleRemoveFavorite}
            onCancel={handleCloseModal}
            movie={selectedFavoriteMovie}
            content='제거'
          />
        )}
      </main>
    </>
  )
}

export default FavoritePage

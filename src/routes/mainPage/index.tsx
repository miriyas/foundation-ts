import { lazy, Suspense, useRef, useState } from 'react'
import store from 'store'
import { ImSpinner2 } from 'react-icons/im'

import { cx } from 'styles'
import styles from './MainPage.module.scss'
import { useRecoilValue, useRecoil } from 'hooks/state/'
import { IMovieItem } from 'types/movie'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import FavoriteModal from 'components/favoriteModal/FavoriteModal'
import { favoritesState } from 'states/favoriteItem'
import useIntersectionObserver from 'hooks/infiniteScroll'
import { getMoreMoviesList } from 'services/movie'
import MovieItem from 'components/movieItem/MovieItem'
import SearchBar from 'components/searchBar'

const LazyMovieListItem = lazy(() => import('components/movieItem/MovieItem'))

const MainPage = () => {
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoritesState)
  const [currentPage, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [searchError, setSearchError, resetSearchError] = useRecoil(errorMovieState)

  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const mainRef = useRef<HTMLElement>(null)

  // TODO: hook으로 빼기
  // TODO: 분기 이미 좋아하는지..
  const handleModalOnClick = () => {
    if (!selectedMovie) {
      setModalVisible(false)
      return
    }

    if (!selectedMovie.isLiked) {
      setFavoriteMovies((prev) => {
        store.set('favorite_movies', [...prev, { ...selectedMovie, isLiked: true }])
        return [...prev, { ...selectedMovie, isLiked: true }]
      })
    } else {
      setFavoriteMovies((prev) =>
        prev.filter((favorite) => favorite.title !== selectedMovie.title && favorite.imdbID !== selectedMovie.imdbID)
      )

      let localFavorites = store.get('favorite_movies')
      localFavorites = localFavorites.filter(
        (favorite: IMovieItem) => favorite.title !== selectedMovie.title && favorite.imdbID !== selectedMovie.imdbID
      )

      store.remove('favorite_movies')
      store.set('favorite_movies', localFavorites)
    }
    // movies 검색 목록에서 isLiked 수정
    setMovies((prevMovies) => {
      return prevMovies.map((prevValue) => {
        if (prevValue.imdbID === selectedMovie.imdbID && prevValue.title === selectedMovie.title) {
          return { ...selectedMovie, isLiked: !selectedMovie.isLiked }
        }
        return prevValue
      })
    })
    setModalVisible(false)
  }

  const handleOpenModal = (value: IMovieItem) => {
    setSelectedMovie(value)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // TODO: 분리
  const onIntersect: IntersectionObserverCallback = ([entries], observer) => {
    if (entries.isIntersecting) {
      setIsFetching(true)
      const { searchText, page, totalResults } = currentPage
      if (totalResults <= page * 10) {
        setIsFetching(false)
        return
      }
      const pageNumber = page + 1
      setTimeout(() => {
        getMoreMoviesList({ searchText, pageNumber })
          .then((res) => {
            setMovies((prev) => [...prev, ...res.data.movieList])
            setCurrentPage((prev) => ({ ...prev, page: pageNumber }))
          })
          .catch((err) => {
            resetMovies()
            resetCurrentPage()
            setSearchError(err.data.error)
          })
          .finally(() => {
            setTimeout(() => {
              setIsFetching(false)
            }, 200)
          })
      }, 5000)
    }
  }

  const { setTarget } = useIntersectionObserver({
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  })

  // TODO: 검색바 분리해서 AXIOS CALL 함수 넘겨서 로딩화면 만들기
  // TODO: suspense 제대로 쓰기
  // TODO: movie list에 별표 하기
  return (
    <>
      <SearchBar scrollRef={mainRef} />
      <main ref={mainRef} className={styles.wrapper}>
        {modalVisible && (
          <FavoriteModal
            onClick={handleModalOnClick}
            onCancel={handleCloseModal}
            content={selectedMovie?.isLiked ? '제거' : '추가'}
          />
        )}

        {searchError.isError && (
          <div className={styles.infoText}>
            <p>Error: {searchError.error}</p>{' '}
          </div>
        )}
        {!searchError.isError && movies?.length === 0 && (
          <div className={styles.infoText}>
            <p>검색 결과가 없습니다.</p>{' '}
          </div>
        )}
        {/* {isFetching && <ImSpinner2 className={styles.spinner} size='5em' color='orange' rotate={1} />} */}

        {movies.length > 0 && (
          <ul className={cx({ [styles.movieLists]: movies.length > 0 })}>
            {movies.map((value, index) => (
              <Suspense
                key={`${value.imdbID}-${index + 1}`}
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
                <LazyMovieListItem
                  key={`${value.imdbID}-${index + 1}`}
                  movie={value}
                  onClick={() => handleOpenModal(value)}
                />
              </Suspense>
            ))}
            <li ref={setTarget} />
          </ul>
        )}
      </main>
    </>
  )
}

export default MainPage

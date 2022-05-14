import { lazy, Suspense, useRef, useState } from 'react'
import store from 'store'

import { IMovieAPIRes, IMovieItem } from 'types/movie'
import { useRecoilValue, useRecoil } from 'hooks/state/'
import useIntersectionObserver from 'hooks/infiniteScroll'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import { favoritesState } from 'states/favoriteItem'
import { getMoreMoviesList } from 'services/movie'

import { Modal, Loading, SearchBar, MovieItem } from 'components'
import { cx } from 'styles'
import styles from './MainPage.module.scss'

const LazyMovieItem = lazy(() => import('components/MovieItem'))

const MainPage = () => {
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoritesState)
  const [rootTarget, setRootTarget] = useState<HTMLElement | null | undefined>(null)
  const [currentPage, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [searchError, setSearchError, resetSearchError] = useRecoil(errorMovieState)

  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const mainRef = useRef<HTMLUListElement>(null)

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

      if (totalResults <= movies.length) {
        setIsFetching(false)
        return
      }

      const pageNumber = page + 1

      getMoreMoviesList({ searchText, pageNumber })
        .then((res) => {
          setMovies((prev) => [...prev, ...res.data.movieList])
          setCurrentPage((prev) => {
            return { ...prev, page: pageNumber }
          })
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
    }
  }

  const { setTarget } = useIntersectionObserver({
    root: rootTarget,
    rootMargin: '10px',
    threshold: 0,
    onIntersect,
  })

  const hadleMainScrollTop = () => {
    if (mainRef?.current) {
      mainRef.current.scrollTo(0, 0)
    }
  }

  // TODO: suspense 제대로 쓰기
  return (
    <>
      <SearchBar hadleMainScrollTop={hadleMainScrollTop} />
      <main className={styles.wrapper} ref={setRootTarget}>
        {searchError.isError && (
          <div className={styles.infoText}>
            <p>Error: {searchError.error}</p>
          </div>
        )}
        {!searchError.isError && movies?.length === 0 && (
          <div className={styles.infoText}>
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
        {isFetching && <Loading />}

        {movies.length > 0 && (
          <ul className={cx({ [styles.movieLists]: movies.length > 0 })} ref={mainRef}>
            {/* {movies.map((value, index) => {
              return (
                <LazyMovieItem
                  index={index}
                  key={`${value.imdbID}-${index + 1}`}
                  movie={value}
                  draggable={false}
                  onClick={() => handleOpenModal(value)}
                />
              )
            })} */}
            {!isFetching && <li ref={setTarget} className={styles.scrollTargetLi} />}
          </ul>
        )}
        {modalVisible && selectedMovie && (
          <Modal
            onClick={handleModalOnClick}
            onCancel={handleCloseModal}
            content={selectedMovie?.isLiked ? '제거' : '추가'}
            movie={selectedMovie}
          />
        )}
      </main>
    </>
  )
}

export default MainPage

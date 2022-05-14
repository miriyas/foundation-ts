import { lazy, Suspense, useRef, useState } from 'react'
import { IMovieItem } from 'types/movie'
import { useRecoil } from 'hooks/state/'
import useIntersectionObserver from 'hooks/infiniteScroll'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import { getMoreMoviesList } from 'services/movie'

import { Modal, Loading, SearchBar } from 'components'
import { cx } from 'styles'
import styles from './MainPage.module.scss'

const LazyMovieItem = lazy(() => import('components/MovieItem'))

const MainPage = () => {
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
  const [currentPage, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [searchError, setSearchError] = useRecoil(errorMovieState)

  const [rootTarget, setRootTarget] = useState<HTMLElement | null | undefined>(null)
  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const mainRef = useRef<HTMLUListElement>(null)

  const handleOpenModal = (value: IMovieItem) => {
    setSelectedMovie(value)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // TODO: 분리
  const onIntersect: IntersectionObserverCallback = ([entries]) => {
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
          setIsFetching(false)
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
        {/* {isFetching && <Loading />} */}

        {movies.length > 0 && (
          <ul className={cx({ [styles.movieLists]: movies.length > 0 })} ref={mainRef}>
            <Suspense fallback={<Loading />}>
              {movies.map((value, index) => {
                return (
                  <LazyMovieItem
                    index={index}
                    key={`${value.imdbID}-${index + 1}`}
                    movie={value}
                    isDraggable={false}
                    onClick={() => handleOpenModal(value)}
                  />
                )
              })}
              {!isFetching && <li ref={setTarget} className={styles.scrollTargetLi} />}
            </Suspense>
          </ul>
        )}
        {modalVisible && selectedMovie && (
          <Modal onCancel={handleCloseModal} isRemove={selectedMovie?.isLiked} movie={selectedMovie} />
        )}
      </main>
    </>
  )
}

export default MainPage

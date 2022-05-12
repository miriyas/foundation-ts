import { useRecoil } from 'hooks/state'
import { MouseEvent } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import store from 'store'

import { favoritesState } from 'states/favoriteItem'
import { moviesState } from 'states/movieItem'
import { IMovieItem } from 'types/movie'
import { cx } from 'styles'
import styles from './MovieItem.module.scss'

interface MovieItemProps {
  movie: IMovieItem
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const MovieItem = ({ movie, onClick }: MovieItemProps) => {
  // TODO: store랑 recoil 한 번에 분리
  const [, setMovieItem] = useRecoil(moviesState)
  const [, setFavoriteItem] = useRecoil(favoritesState)

  const changeIsLiked = (value: IMovieItem) => {
    return { ...value, isLiked: !value.isLiked }
  }

  const changeMovieLike = (movieItem: IMovieItem) => {
    setMovieItem((prev) =>
      prev.map((value) => {
        if (value.imdbID === movieItem.imdbID && value.title === movieItem.title) {
          return changeIsLiked(value)
        }
        return value
      })
    )
  }

  const removeFromFavorite = (movieItem: IMovieItem) => {
    setFavoriteItem((prev) =>
      prev.filter((favorite) => favorite.title !== movieItem.title && favorite.imdbID !== movieItem.imdbID)
    )

    let localFavorites = store.get('favorite_movies')
    localFavorites = localFavorites.filter(
      (favorite: IMovieItem) => favorite.title !== movieItem.title && favorite.imdbID !== movieItem.imdbID
    )

    store.remove('favorite_movies')
    store.set('favorite_movies', localFavorites)
  }

  // TODO: plugin? https://github.com/shengnian/store.js
  const addToFavorite = (movieItem: IMovieItem) => {
    const likeItem = changeIsLiked(movieItem)
    setFavoriteItem((prev) => [...prev, { ...likeItem, isLiked: true }])

    const localFavorites = store.get('favorite_movies')
    if (localFavorites) {
      localFavorites.push({ ...movieItem, isLiked: true })
      store.set('favorite_movies', localFavorites)
    } else {
      store.set('favorite_movies', [likeItem])
    }
  }

  const handleClickStar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (movie.isLiked) {
      removeFromFavorite(movie)
    } else {
      addToFavorite(movie)
    }
    changeMovieLike(movie)
  }

  return (
    <li className={styles.itemWrapper} title={movie.title}>
      <button type='button' onClick={onClick} className={styles.contentButton}>
        <div className={styles.poster}>
          <img src={movie.poster} alt='movie poster' />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.type}>{movie.type}</div>
          <div className={styles.year}>{movie.year}</div>
        </div>
      </button>
      <button type='button' className={styles.likes} onClick={handleClickStar}>
        {movie.isLiked ? <FaStar /> : <FaRegStar color='black' />}
      </button>
    </li>
  )
}

export default MovieItem

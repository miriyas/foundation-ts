import { useRecoil } from 'hooks/state'
import { Dispatch, LegacyRef, MouseEvent, RefObject, DragEvent, useRef, useState, SetStateAction } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import store from 'store'

import { favoritesState } from 'states/favoriteItem'
import { moviesState } from 'states/movieItem'
import { IMovieItem } from 'types/movie'
import { cx } from 'styles'
import styles from './MovieItem.module.scss'
import defaultImg from 'assets/defaultImg2.png'

interface MovieItemProps {
  movie: IMovieItem
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  dragOk: boolean
  index: number
  grab: HTMLLIElement | null
  setGrab: Dispatch<SetStateAction<HTMLLIElement | null>>
}

const MovieItem = ({ movie, onClick, dragOk, index, grab, setGrab }: MovieItemProps) => {
  // TODO: store랑 recoil 한 번에 분리
  const [, setMovieItem] = useRecoil(moviesState)
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoritesState)

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
    setFavoriteMovies((prev) =>
      prev.filter((favorite) => favorite.title !== movieItem.title && favorite.imdbID !== movieItem.imdbID)
    )

    let localFavorites = store.get('favorite_movies')
    localFavorites = localFavorites.filter(
      (favorite: IMovieItem) => favorite.title !== movieItem.title && favorite.imdbID !== movieItem.imdbID
    )

    store.remove('favorite_movies')
    store.set('favorite_movies', localFavorites)
  }

  const addToFavorite = (movieItem: IMovieItem) => {
    const likeItem = changeIsLiked(movieItem)
    setFavoriteMovies((prev) => [...prev, { ...likeItem, isLiked: true }])

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

  const handleImgOnError = (e: MouseEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImg
  }

  const onDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const onDragStart = (e: DragEvent<HTMLLIElement>) => {
    setGrab(e.currentTarget)
    e.currentTarget.classList.add(styles.grabbing)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.currentTarget.toString())
  }

  const onDragEnd = (e: DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove('grabbing')
    e.dataTransfer.dropEffect = 'move'
    setGrab(null)
  }

  const onDrop = (e: DragEvent<HTMLLIElement>) => {
    let grabPosition
    if (grab) {
      grabPosition = Number(grab.dataset.position)
      const targetPosition = Number(e.currentTarget.dataset.position)

      const list = [...favoriteMovies]

      list[grabPosition] = list.splice(targetPosition, 1, list[grabPosition])[0]
      store.remove('favorite_movies')
      store.set('favorite_movies', list)
      setFavoriteMovies(list)
    }
  }

  const onDragEnter = (e: DragEvent<HTMLLIElement>) => {
    console.log('drag-enter', grab, e.currentTarget)
    if (grab) {
      const grabPosition = Number(grab.dataset.position)
      const targetPosition = Number(e.currentTarget.dataset.position)
      console.log('grabPosition: ', grabPosition, ' targetPosition: ', targetPosition)
      if (grabPosition < targetPosition) e.currentTarget.classList.add(styles.moveUp)
      else if (grabPosition > targetPosition) e.currentTarget.classList.add(styles.moveDown)
    }
  }
  const onDragLeave = (e: DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove(styles.moveUp)
    e.currentTarget.classList.remove(styles.moveDown)
  }

  return (
    <li
      className={styles.itemWrapper}
      title={movie.title}
      draggable={dragOk}
      data-position={index}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <button type='button' onClick={onClick} className={styles.contentButton}>
        <div className={styles.poster}>
          <img src={movie.poster} alt='movie poster' onError={handleImgOnError} />
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

import React from 'react'
import { cx } from 'styles'
import { IMovieItem } from 'types/movie'
import styles from './MovieListItem.module.scss'

interface MovieListItemProps {
  movie: IMovieItem
  onClick: React.MouseEventHandler<HTMLElement>
}

const MovieListItem = ({ movie, onClick }: MovieListItemProps) => {
  return (
    <li className={cx(styles.itemWrapper)}>
      <button type='button' onClick={onClick}>
        <div className={cx(styles.poster)}>
          <img src={movie.poster} alt='movie poster' />
        </div>
        <div>
          <div>{movie.title}</div>
          <div>{movie.year}</div>
          <div>{movie.type}</div>
        </div>
      </button>
    </li>
  )
}

export default MovieListItem

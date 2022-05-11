import store from 'store'
import { IMovieItem } from 'types/movie'
// src/recoil/Movie.ts
import { atom } from 'hooks/state/index'

// TODO: 아직 사용x isChecked 추가?
export interface IFavoriteItem {
  poster: string
  title: string
  year: string
  imdbID: string
  type: string
}

const storedFavoriteMovies = store.get('favorite_movies')

export const favoritesState = atom<IMovieItem[]>({
  key: 'favoriteMovies',
  default: storedFavoriteMovies ?? [],
})

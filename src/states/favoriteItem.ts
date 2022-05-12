import store from 'store'
import { IMovieItem } from 'types/movie'
// src/recoil/Movie.ts
import { atom } from 'hooks/state/index'

// TODO: 아직 사용x isChecked 추가?

const storedFavoriteMovies = store.get('favorite_movies')
console.log('storedFavoriteMovies ', storedFavoriteMovies)
export const favoritesState = atom<IMovieItem[]>({
  key: 'favoriteMovies',
  default: storedFavoriteMovies ?? [],
})

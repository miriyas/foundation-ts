import { IMovieErrorResponse, IMovieItem, ICurrentMovie } from 'types/movie'
// src/recoil/Movie.ts
import { atom } from 'hooks/state/index'

// Movie Search Input에서 입력하는 값을 atom으로 관리
export const currentMovieState = atom<ICurrentMovie>({
  key: 'currentMovieState',
  default: {
    title: '',
    page: 1,
  },
})

// Movie Search Input에서 입력하는 값을 atom으로 관리
export const errorMovieState = atom<IMovieErrorResponse>({
  key: 'errorMovieState',
  default: {
    isError: false,
    message: '',
    code: '',
    error: '',
  },
})

// 업데이트 시킬 Movies atom 배열
export const moviesState = atom<IMovieItem[]>({
  key: 'movies',
  default: [],
})

interface IMovieItem {
  poster: string
  title: string
  type: string
  year: string
  imdbID: string
  isLiked: boolean
}

interface ICurrentMovie {
  searchText: string
  page: number
  totalResults: number
}

interface IMovieErrorResponse {
  code?: string
  isError: boolean
  error: string
  message?: string
}

interface IMovieAPIRes {
  movieList: IMovieItem[]
  error: IMovieErrorResponse
}

export { IMovieItem, ICurrentMovie, IMovieErrorResponse, IMovieAPIRes }

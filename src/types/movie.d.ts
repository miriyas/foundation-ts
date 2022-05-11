interface IMovieItem {
  poster: string
  title: string
  type: string
  year: string
  imdbID: string
}

interface ICurrentMovie {
  title: string
  page: number
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

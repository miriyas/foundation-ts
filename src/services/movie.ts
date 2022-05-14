import axios from 'axios'
import store from 'store'
import { IMovieAPIRes, IMovieItem } from 'types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'
const isLikedList = store.get('favorite_movies')

interface Params {
  searchText: string
  pageNumber: number
}

const axiosInstance = axios.create({
  baseURL: MOVIE_BASE_URL,
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    apikey: process.env.REACT_APP_MOVIE_API_KEY,
    s: config.params.searchText,
    page: config.params.pageNumber,
  }
  return config
})

interface ISearchResponse {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.data.Response === 'False') {
      res.data.error = {
        isError: true,
        error: res?.data?.Error,
        code: res?.status,
        message: res?.data?.Error,
      }
      return Promise.reject(res)
    }

    res.data.movieList = res.data.Search.map((value: ISearchResponse) => {
      let isLiked = false
      if (isLikedList?.length > 0)
        isLiked = isLikedList.some(
          (favorite: IMovieItem) => favorite.title === value.Title && favorite.imdbID === value.imdbID
        )

      return {
        poster: value.Poster,
        title: value.Title,
        type: value.Type,
        year: value.Year,
        imdbID: value.imdbID,
        isLiked,
      }
    })
    return Promise.resolve(res)
  },
  (error) => {
    error.data = error.data || {}
    error.data.error = error.data.error || {}
    error.data.error = {
      isError: error?.response.data.response !== 'False',
      error: error?.response.data.Error,
      code: error.code,
      message: error.message,
    }
    console.log('error: ', error)
    return Promise.reject(error)
  }
)

const getMoviesList = (params: Params) =>
  axiosInstance('/', {
    params: {
      ...params,
    },
  })

const getMoreMoviesList = (params: Params) =>
  axiosInstance.get(`/`, {
    params: {
      ...params,
    },
  })

export { getMoviesList, getMoreMoviesList }

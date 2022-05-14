import { useRecoil } from 'hooks/state'
import { favoritesState } from 'states/favoriteItem'
import { moviesState } from 'states/movieItem'
import { IMovieItem } from 'types/movie'
import store from 'store'

interface IUseFavoriteUpdateProps {
  selectedMovie: IMovieItem | null
}

const useFavoriteUpdate = ({ selectedMovie }: IUseFavoriteUpdateProps) => {
  const [, setMovies] = useRecoil(moviesState)
  const [, setFavoriteMovies] = useRecoil(favoritesState)
  //   const [selectedMovie, setselectedMovie] = useState(selectedMovie)

  const changeMovieLike = (movieItem: IMovieItem) => {
    setMovies((prev) =>
      prev.map((value) => {
        if (value.imdbID === movieItem.imdbID && value.title === movieItem.title) {
          return { ...value, isLiked: !value.isLiked }
        }
        return value
      })
    )
  }

  // movies search에 안해줘도 반영? 다시 렌더돼서 업데이트 되나?
  const removeFromFavorite = () => {
    if (!selectedMovie) return
    setFavoriteMovies((prev) =>
      prev.filter(
        (prevFavorite) => prevFavorite.title !== selectedMovie.title && prevFavorite.imdbID !== selectedMovie.imdbID
      )
    )

    let localFavorites = store.get('favorite_movies')
    localFavorites = localFavorites.filter(
      (favoriteItem: IMovieItem) =>
        favoriteItem.title !== selectedMovie.title && favoriteItem.imdbID !== selectedMovie.imdbID
    )

    store.remove('favorite_movies')
    store.set('favorite_movies', localFavorites)
    changeMovieLike(selectedMovie)
  }

  const addToFavorite = () => {
    if (!selectedMovie) return
    const likeItem = { ...selectedMovie, isLiked: !selectedMovie.isLiked }
    setFavoriteMovies((prev) => [...prev, { ...likeItem, isLiked: true }])

    const localFavorites = store.get('favorite_movies')
    if (localFavorites) {
      localFavorites.push({ ...selectedMovie, isLiked: true })
      store.set('favorite_movies', localFavorites)
    } else {
      store.set('favorite_movies', [likeItem])
    }
    changeMovieLike(selectedMovie)
  }

  return { removeFromFavorite, addToFavorite }
}

export default useFavoriteUpdate

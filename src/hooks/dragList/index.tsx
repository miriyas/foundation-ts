import { Dispatch, DragEvent, SetStateAction } from 'react'
import { SetterOrUpdater } from 'recoil'
import { IMovieItem } from 'types/movie'
import store from 'store'

interface useDragListProps {
  setDragVisible: Dispatch<SetStateAction<boolean>>
  setGrabbing: Dispatch<SetStateAction<boolean>>
  favoriteMovies: IMovieItem[]
  setFavoriteMovies: SetterOrUpdater<IMovieItem[]>
  grab?: HTMLLIElement | null
  setGrab?: Dispatch<SetStateAction<HTMLLIElement | null>>
}

// TODO: useEffect 사용해야 ?
const useDragList = ({
  setDragVisible,
  setGrab,
  setGrabbing,
  grab,
  favoriteMovies,
  setFavoriteMovies,
}: useDragListProps) => {
  const handleOnDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    setDragVisible(true)
  }

  const handleOnDragStart = (e: DragEvent<HTMLLIElement>) => {
    if (setGrab) setGrab(e.currentTarget)
    setGrabbing(true)
  }

  const handleOnDragEnd = () => {
    setGrabbing(false)
    if (setGrab) setGrab(null)
  }

  const handleOnDrop = (e: DragEvent<HTMLLIElement>) => {
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
    setDragVisible(false)
  }

  const handleOnDragEnter = () => {
    setDragVisible(false)
  }

  const handleOnDragLeave = () => {
    setDragVisible(false)
  }

  return { handleOnDragOver, handleOnDragStart, handleOnDragEnd, handleOnDrop, handleOnDragEnter, handleOnDragLeave }
}

export default useDragList

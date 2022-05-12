import { useRef, useState, SetStateAction, Dispatch, ChangeEvent, MouseEvent, FormEvent } from 'react'
import { useClickOutsideListenerRef } from 'hooks/outsideClick'
import { useRecoil } from 'hooks/state'
import { FaSearch } from 'react-icons/fa'
import { getMoviesList } from 'services/movie'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import { cx } from 'styles'
import styles from './SearchBar.module.scss'
import { useNavigate } from 'react-router-dom'
import { IMovieItem } from 'types/movie'

interface ISearchBarProps {
  toggleSearchBar: boolean
  setToggleSearchBar: Dispatch<SetStateAction<boolean>>
  pathname: string
}

const SearchBar = ({ toggleSearchBar, setToggleSearchBar, pathname }: ISearchBarProps): JSX.Element => {
  const [searchText, setSearchText] = useState('')

  // TODO: set만 쓰게 바꾸기
  const [currentMovie, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
  const [error, setError, resetError] = useRecoil(errorMovieState)
  const navigate = useNavigate()

  const focusRef = useRef<HTMLInputElement>(null)

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleOpenSearchBar = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setToggleSearchBar(true)
    focusRef.current?.focus()
  }

  // Search bar 외부 선택 시 닫기
  const handleCloseSearchBar = () => {
    setToggleSearchBar(false)
  }
  const formRef = useClickOutsideListenerRef(handleCloseSearchBar)

  // React. => 위에서 한번에 갖고 오기, FormEvent
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: ref 보내서 스크롤 탑
    // document.getElementById('main_container').scrollTo(0, 0)
    const target = e.currentTarget as typeof e.currentTarget & {
      searchInputText: { value: string }
    }

    const text = target.searchInputText.value
    if (text.trim().length === 0) {
      handleCloseSearchBar()
      return
    }

    // 다중에 페이지 네이션?
    setTimeout(() => {
      // async - await?
      getMoviesList({ searchText: text, pageNumber: 1 })
        .then((res) => {
          const totalResults = parseInt(res.data.totalResults, 10)
          console.log(totalResults)
          console.log(res.data.totalResults)
          console.log(res.data)
          resetError()
          setMovies(res.data.movieList)
          setCurrentPage({ searchText: text, page: 1, totalResults })
        })
        .catch((err) => {
          setError(err.data.error)
          resetMovies()
          resetCurrentPage()
        })
        .finally(() => {
          setSearchText('')
          handleCloseSearchBar()
          if (pathname !== '/') navigate('/', { replace: true })
        })
    }, 0)
  }

  return (
    <div className={cx(styles.searchBox)} ref={formRef}>
      <button
        type='button'
        onClick={handleOpenSearchBar}
        className={cx(styles.searchToggleButton, { [styles.hideToggleButton]: toggleSearchBar })}
      >
        <FaSearch size='1.1em' />
      </button>

      <form
        onSubmit={handleSubmitSearch}
        className={cx(styles.searchForm, { [styles.searchBarOpen]: toggleSearchBar })}
      >
        <input
          type='text'
          title='Search Bar'
          ref={focusRef}
          name='searchInputText'
          value={searchText}
          onChange={handleChangeSearchText}
          className={cx(styles.searchInput)}
        />
        <button type='submit' className={cx({ [styles.searchButton]: !toggleSearchBar })}>
          <FaSearch size='1.1em' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar

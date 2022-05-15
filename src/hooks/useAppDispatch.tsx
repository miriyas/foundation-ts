import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'states/index'

// instead of plain `useDispatch`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()

import { atom } from 'hooks/state'
import { ITodoItem } from 'types/todo.d'

const INIT_TODO = [
  {
    id: 1,
    title: '계란 2판 사기',
    done: false,
  },
  {
    id: 2,
    title: '맥북 프로 M1 Max CTO 버전 사기',
    done: false,
  },
  {
    id: 3,
    title: '오늘의 TIL 작성하기',
    done: false,
  },
]

export const todoListState = atom<ITodoItem[]>({
  key: '#todoListState',
  default: INIT_TODO,
})

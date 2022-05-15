import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

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

export interface TodoState {
  todoList: ITodoItem[]
}

const INITIAL_STATE: TodoState = {
  todoList: INIT_TODO,
}

const systemSlice = createSlice({
  name: 'system',
  initialState: INITIAL_STATE,
  reducers: {
    setTodoList: (state: TodoState, action: PayloadAction<ITodoItem[]>) => {
      state.todoList = action.payload
    },
  },
})

export const { setTodoList } = systemSlice.actions

export default systemSlice.reducer

// Selector =====================

export const getTodoList = (state: RootState): ITodoItem[] => state.todo.todoList

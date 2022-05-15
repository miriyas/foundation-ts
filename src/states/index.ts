import { configureStore } from '@reduxjs/toolkit'

import system from './system'
import todo from './todo'

export const store = configureStore({
  reducer: {
    system,
    todo,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

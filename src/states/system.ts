import store from 'store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

export interface SystemState {
  theme: string
}

const INITIAL_STATE: SystemState = {
  theme: store.get('foundation.theme') || 'light',
}

const systemSlice = createSlice({
  name: 'system',
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state: SystemState, action: PayloadAction<string>) => {
      const newColorSet = action.payload
      store.set('foundation.theme', newColorSet)
      document.documentElement.setAttribute('color-theme', newColorSet)
      state.theme = newColorSet
    },
    toggleTheme: (state: SystemState) => {
      const newColorSet = state.theme === 'light' ? 'dark' : 'light'
      store.set('foundation.theme', newColorSet)
      document.documentElement.setAttribute('color-theme', newColorSet)
      state.theme = newColorSet
    },
  },
})

export const { setTheme, toggleTheme } = systemSlice.actions

export default systemSlice.reducer

// Selector =====================

export const getTheme = (state: RootState): string => state.system.theme

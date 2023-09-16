import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/index'

export const store = configureStore({
  reducer: userReducer,
  // devTools:false   use it to hide the dev tools property
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

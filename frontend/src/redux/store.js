import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlice.js'
import userReducer from './slice/userSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})
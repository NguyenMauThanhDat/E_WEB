import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/productSlice.js'
import userReducer from './slice/userSlide'
import orderReducer from './slice/orderSlice'


export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order:orderReducer
  },
})
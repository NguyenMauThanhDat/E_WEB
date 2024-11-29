import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1 
    // },
    searchProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlice.actions

export default productSlice.reducer
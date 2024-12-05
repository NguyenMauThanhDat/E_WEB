import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItem: [],
    shippingAddress: {
      
    },
    paymentMethod:'',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',

}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const {orderItem} = action.payload
      const itemOrder=state?.orderItem?.find((item) => item?.product===orderItem.product)
      if(itemOrder){
        itemOrder.amount += orderItem?.amount
      }else{
        state.orderItem.push(orderItem)
      }
    },
    increaseAmount:(state,action) => {
      const {idProduct} = action.payload
      const itemOrder=state?.orderItem?.find((item) => item?.product===idProduct)
      itemOrder.amount ++
    }
    ,
    decreaseAmount:(state,action) => {
      const {idProduct} = action.payload
      const itemOrder=state?.orderItem?.find((item) => item?.product===idProduct)
      itemOrder.amount --
    }
    ,
    removeOrderProduct: (state, action) => {
      const {idProduct} = action.payload
      const itemOrder=state?.orderItem?.filter((item) => item?.product!==idProduct)
      state.orderItem = itemOrder
    },
    removeAllOrderProduct: (state, action) => {
      const {listChecked} = action.payload
      const itemOrder=state?.orderItem?.filter((item) => listChecked.includes(item.product))
      state.orderItem = itemOrder
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct,increaseAmount,decreaseAmount,removeOrderProduct,removeAllOrderProduct } = orderSlice.actions

export default orderSlice.reducer
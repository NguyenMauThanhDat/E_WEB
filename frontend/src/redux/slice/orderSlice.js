import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItem: [],
    orderItemSelected: [],
    shippingAddress: {},
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
      const itemOrderSelected=state?.orderItemSelected?.find((item) => item?.product===idProduct)
      if(itemOrderSelected){
        itemOrderSelected.amount ++
      }
      itemOrder.amount ++
    }
    ,
    decreaseAmount:(state,action) => {
      const {idProduct} = action.payload
      const itemOrder=state?.orderItem?.find((item) => item?.product===idProduct)
      const itemOrderSelected=state?.orderItemSelected?.find((item) => item?.product===idProduct)
      if(itemOrderSelected){
        itemOrderSelected.amount --
      }
      itemOrder.amount --
    }
    ,
    removeOrderProduct: (state, action) => {
      const {idProduct} = action.payload
      const itemOrder=state?.orderItem?.filter((item) => item?.product!==idProduct)
      const itemOrderSelected=state?.orderItemSelected?.filter((item) => item?.product!==idProduct)
      state.orderItem = itemOrder
      state.orderItemSelected=itemOrderSelected

    },
    removeAllOrderProduct: (state, action) => {
      const {listChecked} = action.payload
      const itemOrder=state?.orderItem?.filter((item) => listChecked.includes(item.product))
      const itemOrderSelected=state?.orderItemSelected?.filter((item) => listChecked.includes(item.product))
      state.orderItemSelected = itemOrderSelected
      state.orderItem = itemOrder
    },
    selectedOrder: (state, action) => {
       const {listChecked} = action.payload
       const orderSelected=[]
       state.orderItem.forEach((order)=>{
           if(listChecked.includes(order.product)){
            orderSelected.push(order)
           }
       })
       state.orderItemSelected=orderSelected
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct,increaseAmount,decreaseAmount,removeOrderProduct,removeAllOrderProduct,selectedOrder } = orderSlice.actions

export default orderSlice.reducer
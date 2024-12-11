const Order = require("../model/OrderProduct");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice, fullName,address, city, phone,user } = newOrder;
    try {
     const promise= orderItem.map(async (order)=>{
        const productData =await Order.findOneAndUpdate(
          {
            _id:order.product,
            countInStock: {$gte:order.amount}
          },
          {
            $inc:{
              countInStock:-order.amount,
              selled:+order.amount
            }
          },
          {new:true}
        )
        if(productData){
          const createOrder = await Order.create({
            orderItem,
             shippingAddress:{
                fullName,
                address,
                city,
                phone
             },
             paymentMethod,itemsPrice,shippingPrice, totalPrice,
             user:user
          });
          if (createOrder) {
            return {
              status: "OK",
              message: "Success",
              data: createOrder,
            };
          }
        } else{
          return{
            status: "ERR",
            message: "ERR",
            id: order.product,
          };
        }
       
      })
      //const result =await Promise.all(promise)
      // const newData =result&& result.filter((item)=>item.id)
      // if(newData.length){
      //   resolve({
      //     status:'ERR',
      //     message:`Sản phẩm với id${newData.join(',')} không đủ hàng`
      //   })
      // }

      resolve({
        status:'OK',
        message:'Success'
      })
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const order = await Order.findOne({ user: id });
          if (order === null) {
              return resolve({
                  status: 'OK',
                  message: 'Order is not defined',
              });
          }

          resolve({
              status: 'OK',
              message: 'Success',
              data: order
          });
      } catch (e) {
          reject(e);
      }
  });
};

module.exports = {
  createOrder,
  getOrderDetail
};

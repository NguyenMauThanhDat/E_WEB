const Order = require("../model/OrderProduct");
const Product = require("../model/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice, fullName,address, city, phone,user, isPaid, paidAt } = newOrder;
    try {
     const promise= orderItem.map(async (order)=>{
        const productData =await Product.findOneAndUpdate(
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
             user:user, isPaid, paidAt
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

const getAllOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const order = await Order.find({ user: id });
          if (order === null) {
              return resolve({
                  status: 'ERR',
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

const getOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const order = await Order.findById({ _id: id });
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

const cancelOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
      try {
          const promise= data.map(async (order)=>{
            const productData =await Product.findOneAndUpdate(
              {
                _id:order.product,
              },
              {
                $inc:{
                  countInStock:+order.amount,
                  selled:-order.amount
                }
              },
              {new:true}
            )
            if(productData){
              const order = await Order.findByIdAndDelete(id);
          if (order === null) {
              return resolve({
                  status: 'OK',
                  message: 'Order is not defined',
              });
          }
            } else{
              return{
                status: "ERR",
                message: "ERR",
                id: order.product,
              };
            }
           
          })
          resolve({
            status:'OK',
            message:'Delete Order Success'
          })
      } catch (e) {
          reject(e);
      }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
      try {
          const allOrder = await Order.find();
          resolve({
              status: 'OK',
              message: 'Success',
              data: allOrder
          });
      } catch (e) {
          reject(e);
      }
  });
};

module.exports = {
  createOrder,
  getAllOrderDetail,
  getOrderDetail,
  cancelOrder,
  getAllOrder
};

const Order = require("../model/OrderProduct");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice, fullName,address, city, phone,user } = newOrder;
    try {
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
        resolve({
          status: "OK",
          message: "Success",
          data: createOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder
};

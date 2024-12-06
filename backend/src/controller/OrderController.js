const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const { paymentMethod, itemsPrice, shippingPrice,  totalPrice, fullName,address, city, phone } = req.body;
    const user = req.user;
    if (!paymentMethod || !itemsPrice|| !shippingPrice|| ! totalPrice|| !fullName|| !address|| !city|| !phone ) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
   createOrder,
};

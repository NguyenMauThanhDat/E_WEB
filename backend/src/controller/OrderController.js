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

const getAllOrderDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllOrderDetail(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.getOrderDetail(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
}

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data=req.body
    if (!orderId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.cancelOrder(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
}

const getAllOrder = async (req, res) => {
  try {
    const response = await OrderService.getAllOrder();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
module.exports = {
   createOrder,
   getAllOrderDetail,
   getOrderDetail,
   cancelOrder,
   getAllOrder
};

const express=require('express');
const router=express.Router();
const OrderController=require('../controller/OrderController');
const { authUserMiddleWare, authMiddleWare } = require('../middleware/authMiddleWare');

router.post('/create',authUserMiddleWare, OrderController.createOrder)
router.get('/getAllOrder/:id', OrderController.getAllOrderDetail)
router.get('/getDetailOrder/:id', OrderController.getOrderDetail)
router.delete('/cancelOrder/:id', OrderController.cancelOrder)
router.get('/getAllOrder/',OrderController.getAllOrder)



module.exports = router
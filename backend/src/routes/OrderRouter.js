const express=require('express');
const router=express.Router();
const OrderController=require('../controller/OrderController');
const { authUserMiddleWare } = require('../middleware/authMiddleWare');

router.post('/create',authUserMiddleWare, OrderController.createOrder)
router.get('/getOrderDetail/:id', OrderController.getOrderDetail)


module.exports = router
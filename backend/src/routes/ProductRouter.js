const express=require('express');
const router=express.Router();
const ProductController=require('../controller/ProductController');
const { authMiddleWare } = require('../middleware/authMiddleWare');

router.post('/create', ProductController.createProduct)
router.put('/update/:id',authMiddleWare, ProductController.updateProduct)
router.get('/get-detail/:id', ProductController.getDetailProduct)
router.get('/getAll', ProductController.getAllProduct)
router.delete('/delete/:id',authMiddleWare, ProductController.deleteProduct)
router.post('/delete-many',authMiddleWare, ProductController.deleteMany)
router.get('/get-all-type', ProductController.getAllType)






module.exports = router
const express=require('express');
const router=express.Router();
const userController=require('../controller/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleWare');

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id',authMiddleWare, userController.deleteUser)
//router.get('/getAll',authMiddleWare,userController.getAllUser)
router.get('/getAll',userController.getAllUser)
//router.get('/get-detail/:id',authUserMiddleWare,userController.getDetailUser)
router.get('/get-detail/:id',userController.getDetailUser)
router.post('/refresh-token',userController.refreshToken)
router.post('/delete-many',authMiddleWare, userController.deleteMany)
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);





module.exports = router
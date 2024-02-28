const express = require('express');
const router = express.Router();
const { 
    createUser,
    loginUserCtrl,
    getAllUser,
    getaUser,
    deleteaUser,
    UpdateaUser,
    blockUser, 
    unblockUser, 
    handleRefreshToken, 
    logout, 
    updatePassword, 
    forgotPasswordToken, 
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus
} =  require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');

router.post('/register' , createUser)
router.put('/password',authMiddleware ,updatePassword)
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus)

router.post('/login' , loginUserCtrl)
router.post('/admin-login' , loginAdmin)
router.post('/cart' , authMiddleware,userCart)
router.post('/cart/applycoupon' , authMiddleware, applyCoupon)
router.post('/cart/cash-order' , authMiddleware, createOrder)

router.get('/alluser', getAllUser)
router.get('/get-order', authMiddleware,getOrders )
router.get('/get-allorder', authMiddleware,getAllOrders )


router.get('/refresh',handleRefreshToken)
router.get('/logout', logout)
router.get('/cart', authMiddleware ,getUserCart) 

router.get('/:id', authMiddleware , isAdmin ,getaUser)
router.get('/wishlist', authMiddleware ,getWishlist) 

router.delete('/empty-cart', authMiddleware , emptyCart)
router.delete('/:id', deleteaUser)
router.put('/update-user/:id',authMiddleware , UpdateaUser)
router.put('/save-address/',authMiddleware , saveAddress)

router.put('/block-user/:id',authMiddleware, isAdmin , blockUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin, unblockUser)

module.exports = router;
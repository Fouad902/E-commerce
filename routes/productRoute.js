const express = require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages } = require('../controller/productController');
const router = express.Router();

const {isAdmin , authMiddleware } = require('../middlewares/authMiddlewares');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadMiddlewares');
router.put('/upload/:id',
authMiddleware,isAdmin 
,uploadPhoto.array("images", 10)
,productImgResize,
uploadImages);
router.post('/', authMiddleware,isAdmin ,createProduct)

router.get('/:id', getaProduct)
router.put('/wishlist', authMiddleware ,addToWishlist)
router.put('/rating', authMiddleware ,rating)

router.put('/:id', authMiddleware,isAdmin ,updateProduct)
router.delete('/:id', authMiddleware,isAdmin ,deleteProduct)
router.get('/', getAllProduct) 

module.exports = router
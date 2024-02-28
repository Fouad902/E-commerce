const express = require('express')
const { createBlog, updateBlog, getBlog, getallBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require('../controller/blogController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares')
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadMiddlewares')
const router = express.Router()

router.post('/', authMiddleware, isAdmin,createBlog)
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 2),
    blogImgResize,
    uploadImages
  );
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, dislikeBlog)
router.put('/:id', authMiddleware, isAdmin , updateBlog)
router.get('/:id', getBlog)
router.get('/' , getallBlog)
router.delete('/:id',authMiddleware,isAdmin , deleteBlog )
module.exports = router
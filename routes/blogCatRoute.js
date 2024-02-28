const express = require('express');
const { createCategory, updateCategory, deleteCategory, getaCategory, getallCategory } = require('../controller/blogCatController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();

router.post('/',authMiddleware,isAdmin, createCategory)
router.put('/:id',authMiddleware,isAdmin, updateCategory)
router.delete('/:id',authMiddleware,isAdmin, deleteCategory)
router.get('/:id',getaCategory)
router.get('/', getallCategory)


module.exports= router
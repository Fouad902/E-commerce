const PCategory = require('../models/prodcategoryModel')
const asyncHandler = require('express-async-handler')
const validationMongoDbId = require('../utils/validationMongodb');

const createCategory = asyncHandler(async (req, res) => {
    try{
        const newCategory = await PCategory.create(req.body)
        res.json(newCategory)
    }catch(err){
        throw new Error(err)
    }
})
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    try{
        const updateCategory = await PCategory.findByIdAndUpdate(id, req.body, {new: true})
        res.json(updateCategory)
    }catch(err){
        throw new Error(err)
    }
})
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validationMongoDbId(id)
    try{
        const deleteCategory = await PCategory.findByIdAndDelete(id)
        res.json(deleteCategory)
    }catch(err){
        throw new Error(err)
    }
})
const getaCategory = asyncHandler(async (req, res) => {
    const {id} = req.params
    validationMongoDbId(id)
    try{
        const getaCategory = await PCategory.findById(id)
        res.json(getaCategory)
    }catch(err){
        throw new Error(err)
    }
})
const getallCategory = asyncHandler(async (req, res) => {
    try{
        const getallCategory = await PCategory.find()
        res.json(getallCategory)
    }catch(err){
        throw new Error(err)
    }
})

module.exports= {createCategory , updateCategory, deleteCategory , getaCategory, getallCategory}
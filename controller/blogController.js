const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validationMongoDbId = require('../utils/validationMongodb');
const cloudinaryUploadImg = require('../utils/cloudinary')
const createBlog = asyncHandler(async (req, res) => {
    try{
        const newBlog = await Blog.create(req.body)
        res.json({
            status: 'success',
            newBlog
        })
    }catch(err){
        throw new Error(err)
    }
})
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body.id, {new: true})
        res.json( updateBlog)
    }catch(err){
        throw new Error(err)
    }
})
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validationMongoDbId(id)
    try{
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        const updateViews = await Blog.findByIdAndUpdate(id, { $inc : {numViews : 1}}, {new:true});
        res.json(getBlog)
    }catch(err){
        throw new Error(err)
    }
})
const getallBlog = asyncHandler( async (req, res )=> {
    try{
        const getAllBlog = await Blog.find()
        res.json( getAllBlog)
    }catch(err){
        throw new Error(err)
    }
})
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    try{
        const deleteBlog = await Blog.findByIdAndDelete(id,req.body.id, {new: true})
        res.json( deleteBlog)
    }catch(err){
        throw new Error(err)
    }
})
const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body
    validationMongoDbId(blogId)

    const blog = await Blog.findById(blogId)
    const loginUserId = req?.user?._id
    const isLiked = blog?.isLiked
    const alreadyDisliked = blog?.dislikes?.find((userId )=> userId?.toString() === loginUserId?.toString())
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        },
        {new: true}
        )
        res.json(blog)
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        },
        {new: true}
        )
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true
        },
        {new: true}
        )
        res.json(blog)
    }
})
const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body
    validationMongoDbId(blogId)

    const blog = await Blog.findById(blogId)
    const loginUserId = req?.user?._id
    const isDisLiked = blog?.isDisliked
    const alreadyLiked = blog?.likes?.find((userId )=> userId?.toString() === loginUserId?.toString())
    
    if(alreadyLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        },
        {new: true}
        )
        res.json(blog)
    }
    if(isDisLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        },
        {new: true}
        )
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true
        },
        {new: true}
        )
        res.json(blog)
    }
})
const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validationMongoDbId(id);
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        console.log(newpath);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const findBlog = await Blog.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => {
            return file;
          }),
        },
        {
          new: true,
        }
      );
      res.json(findBlog);
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = { createBlog , updateBlog , getBlog , getallBlog , deleteBlog , likeBlog , dislikeBlog , uploadImages,}
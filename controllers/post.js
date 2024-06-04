const postsModel = require("../models/post");

  // Get list of All the Post
const listPosts = async (req, res) => {
    
  const postList = await postsModel.find();
    // If all checkpoint Pass 
    res.status(200).json({
        success : true,
        message : "Post-List API",
        result : postList,
    });
    
}

// Create New Post
const createPost = async (req, res) => {

    // console.log(req.user._id);
    // Save Post in DB
    const newPost = postsModel({...req.body, userId : req.user._id});
    await newPost.save();

    res.status(200).json({
        success : true,
        message : "Post Created Successfully !",
    })
}

// Get Post by ID
const getPostById = async (req, res) => {
    res.status(200).json({
        success : true,
        message : "Get post by ID API",
        result : postList,
    });
}

// Edit Post by ID
const editPost = async (req, res) => {
    res.status(200).json({
        success : true,
        message : "Edit post by ID API",
    });
}

// Delete Post By ID
const deletePost = async (req, res) => {
    res.status(200).json({
        success : true,
        message : "Delete post by ID API",
    });
}

const postController = {
    listPosts,
    createPost,
    getPostById,
    editPost,
    deletePost,
};

module.exports = postController;
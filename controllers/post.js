const postsModel = require("../models/post");

  // Get list of All the Post
const listPosts = async (req, res) => {
    try {
        // Fetch Data through page no
        let pageNo = req.query.pageNo || 1;     // Number of page displayed in page
        let pageData = req.query.pageData || 10;        // Number of Data to  b fatched
        pageNo = pageNo * 1;
        pageData = pageData * 1;
        // console.log(pageNo);
    
        //   const postList = await postsModel.find().populate("userId");   // To get all data of user
        const postList = await postsModel.find()
        .skip((pageNo - 1) * 10)
        .limit(pageData)      // Limit of Data to display
        // .sort({userId : -1})    // Sort by Views, Date, Likes etc etc. [1:assending & -1:Decending]
        .populate({     // To get a specific Data of user (selected Data)
            path : "userId",
            select : "-_id name email role",
        })
        // If all checkpoint Pass 
        res.status(200).json({
            success : true,
            message : "Post-List API",
            result : postList,
        });   
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "ERROR ! Data Not Found"
        })
    }
    
}

// Create New Post
const createPost = async (req, res) => {
    try {
        // console.log(req.user._id);
        // Save Post in DB
        const newPost = postsModel({...req.body, userId : req.user._id});
        await newPost.save();
    
        res.status(200).json({
            success : true,
            message : "Post Created Successfully !",
        })  
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "ERROR ! Data Not Found"
        })
    }
}

// Get Post by ID
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const postList = await postsModel.findById(postId).populate({
            path : "userId",
            select : "-_id name email role",
        });
    
        res.status(200).json({
            success : true,
            message : "Get post by ID API",
            result : postList,
        });  
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "ERROR ! Data Not Found"
        })
    }
}

// Edit Post by ID
const editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        await postsModel.findByIdAndUpdate(postId, req.body);
    
        res.status(200).json({
            success : true,
            message : "Post Updated Successfully.",
        });  
    } catch (error) {
        res.status(404).json({
            success : false,
            message : "ERROR ! Data Not Found"
        });
    }
}

// Delete Post By ID
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        await postsModel.findByIdAndDelete(postId);

        res.status(200).json({
            success : true,
            message : "Post Delete Successfully",
        });  
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "ERROR ! Data Not Found"
        });
    }
}

// ##------ Comment Section --------##

// Post a Comment
const postComment = async (req, res) => {
    try {
        // console.log(req.params.postId);

        await postsModel.updateOne(
            {
                _id : req.params.postId
            },
            {
                $push : {
                    comments:{
                        userId : req.user._id,
                        comment : req.body.comment,
                    }
                }
            }
        )

        res.status(201).json({
            success : true,
            message : "Comment Posted Successfully",
        }) 
    } 
    catch (error) {
        res.status(500).json({
            success : false,
            message : "An error occurred while creating the comment",
        })
    }
}

// Update a Comment on Post
const updateComment = async (req, res) => {
    try {

        // console.log(req.params.postId);
        // console.log(req.params.commentId);

        await postsModel.updateOne(
            {
                _id : req.params.postId,
                "comments._id" : req.params.commentId,
            },
            {
                $set: {
                    "comments.$.comment": req.body.comment,
                }
            }
        )

        res.status(200).json({
            success : true,
            message : "Comment Updated Successfully.",
        })
    } 
    catch (error) {
        res.status(500).json({
            success : false,
            message : "Error occurred ! While Updating the Comment.",
        })
    }
}

// Delete a Comment on Post
const deleteComment = async (req, res) => {
    try {

        // console.log(req.params.postId);
        // console.log(req.params.commentId);

        await postsModel.updateOne(
            {
                _id : req.params.postId,
            },
            {
                $pull: {
                    comments: { _id : req.params.commentId }
                }
            }
        )

        res.status(200).json({
            success : true,
            message : "Comment Deleted Successfully.",
        })
    } 
    catch (error) {
        res.status(500).json({
            success : false,
            message : "Error Occurred ! While Deleting the Comment.",
        })
    }
}

const postController = {
    listPosts,
    createPost,
    getPostById,
    editPost,
    deletePost,
    postComment,
    updateComment,
    deleteComment,
};

module.exports = postController;
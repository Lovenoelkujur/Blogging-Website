const express = require("express");

const postController = require("../controllers/post");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Retrieve all Posts
router.get("/", postController.listPosts);

// Create a New Post
router.post("/", postController.createPost);

// Retrieve a specific post by ID
router.get("/:id", postController.getPostById);

// Update an existing Post
router.put("/:id", postController.editPost);

// Delete a post by ID
router.delete("/:id", postController.deletePost);

//  ##------ Commenting Route. ------##

// Post Comment by Id
router.post("/comments/:postId", postController.postComment);

// Update Comment by postId & commentId
router.put("/comments/:postId/:commentId", postController.updateComment);

// Delete Comment by postId & commentId
router.delete("/comments/:postId/:commentId", postController.deleteComment);


module.exports = router;
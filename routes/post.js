const express = require("express");

const postController = require("../controllers/post");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", roleMiddleware("admin"), postController.listPosts);

router.post("/", roleMiddleware("content_creator"), postController.createPost);

module.exports = router;
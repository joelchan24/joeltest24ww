const router = require("express").Router();
const { verifyToken } = require("../middlewares/index");
const {
  posting,
  updatePost,
  deletePost,
  allThePosts,
} = require("../controllers/community.controller");

// read all posts
router.get("/allPosts", verifyToken, allThePosts);
// create post
router.post("/communityPost", verifyToken, posting);
// update post
router.patch("/updatePost/:id", verifyToken, updatePost);
// delete post
router.delete("/deletePost/:id", verifyToken, deletePost);

module.exports = router;

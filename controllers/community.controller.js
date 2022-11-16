const mongoose = require("mongoose");
const Community = require("../models/Community.model");
const { clearRes } = require("../utils/utils");

// READ all posts
exports.allThePosts = async (req, res) => {
  try {
    const posts = await Community.find();

    if (!posts)
      return res.status(400).json({ errorMessage: "Posts not found" });

    res.status(200).json({ posts });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });
    return res.status(500).json({ errorMessage: error.message });
  }
};

// CREATE community post
exports.posting = async (req, res) => {
  const { author, comment, created } = req.body;
  const { username } = req.user;
  try {
    if (!comment.length)
      return res.status(400).json({
        errorMessage: "don't send empty fields",
      });

    const post = await Community.create({
      author: username,
      comment,
      created,
    });

    const cleanPost = clearRes(post.toObject());
    res.status(200).json({ post: cleanPost });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });
    return res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE community post
exports.updatePost = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const { username , role } = req.user

  try {
    const post = await Community.findById(id);

    if (!post)
      return res.status(400).json({
        errorMessage: "Community post not found.",
      });
    
    console.log(post.author , username , role)
    if (username != post.author) return res.status(400).json({
      errorMessage: "Only the original author can delete this post"
    })

    const updatePost = await Community.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );

    const cleanPost = clearRes(updatePost.toObject());
    res.status(200).json({ updatePost: cleanPost });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });
    return res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE community post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { username , role } = req.user;

  try {
    const post = await Community.findById(id);
    if (!post) return res.status(400).json({ errorMessage: "Post not found" });

    if (username != post.author && role === 'User' ) return res.status(400).json({ 
      errorMessage: "Only the original author or an administrator can delete this post" 
    })

    await post.remove();
    res.status(200).json({ successMessage: `Hi ${username}, you delete youre post` });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });
    return res.status(500).json({ errorMessage: error.message });
  }
};

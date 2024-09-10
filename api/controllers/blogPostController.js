import Post from "../models/postModel.js";

export const create = async (req, res) => {
  // if not admin:
  if (!req.user.isAdmin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!req.body.title || !req.body.content) {
    return res.status(401).json({
      success: false,
      message: "Unsuffiecient information provided about blog.",
    });
  }

  // if post title exists:
  const postTemp = await Post.findOne({ title: req.body.title });
  if (postTemp) {
    return res.status(500).json({
      success: false,
      message: "Please Change Title. Already Exists!",
    });
  }

  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "Post Successfully created",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getPosts = async (req, res) => {
  // if not admin:
  if (!req.user.isAdmin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const limit = req.body.limit || 10;
  const startIndex = req.body.startIndex * limit || 0;

  try {
    const total = await Post.countDocuments(); // total posts

    const posts = await Post.find()
      .sort({ updatedAt: -1 }) // 1 for ascending, -1 for descending.
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({ success: true, posts, total });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  // if not admin:
  if (!req.user.isAdmin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const post = await Post.findByIdAndDelete(req.body.id);

    res
      .status(200)
      .json({ success: true, message: post.title + " successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

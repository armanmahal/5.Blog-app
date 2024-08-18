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

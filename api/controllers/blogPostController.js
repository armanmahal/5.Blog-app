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

  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(400).json({
      success: true,
      message: "Post Successfully created",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

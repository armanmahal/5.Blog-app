import Comment from '../models/commentModel.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false, message: "Unauthorized"
      });
    }

    const newComment = await Comment.create({
        content,
        postId,
        userId
    });

    res.status(200).json({success: true, message: "comment added"});
  } catch (error) {
    res.status(400).json({
        success: false, message: "Server Error"
      });
  }
};

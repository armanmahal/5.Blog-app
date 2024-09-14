import Comment from "../models/commentModel.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const newComment = await Comment.create({
      content,
      postId,
      userId,
    });

    res
      .status(200)
      .json({ success: true, message: "comment added", newComment });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.body;

    const comments = await Comment.find({ postId }).sort({ likes: -1 });

    const total = comments.length;

    res.status(200).json({ success: true, comments, total });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    const userIndex = comment.likedBy.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.likes += 1;
      comment.likedBy.push(req.user.id);
    } else {
      comment.likes -= 1;
      comment.likedBy.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
};

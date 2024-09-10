import Comment from '../models/commentModel.js';

export const createComment = async (req, res) => {
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

    res.status(200).json({success: true, message: "comment added", newComment});
  } catch (error) {
    res.status(400).json({
        success: false, message: "Server Error"
      });
  }
};

export const getComments = async (req, res) => {
  try {
    const {postId} = req.body;

    const comments = await Comment.find({postId})
                            .sort({"likes": -1});

    const total = comments.length;

    res.status(200).json({success: true, comments, total});

  } catch (error) {
    res.status(400).json({
        success: false, message: "Server Error"
      });
  }
};

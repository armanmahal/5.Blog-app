import User from "../models/userModel.js";

export const test = (req, res) => {
  res.json({ message: "working" });
};

export const updateImage = async (req, res) => {
  if (req.params.userId !== req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        image: req.body.image,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Image Updated successfully",
        newImageUrl: UpdatedUser.image,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

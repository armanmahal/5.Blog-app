import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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

    res.status(200).json({
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

export const updatePassword = async (req, res) => {
  if (req.params.userId !== req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  //if invalid input:
  if (req.body.password === "") {
    return res
      .status(400)
      .json({ success: false, message: "Enter a Valid Password" });
  }

  try {
    const hashedPass = bcryptjs.hashSync(req.body.password, 10);

    const UpdatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: hashedPass,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  //if invalid input:
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All Fields Are Required" });
  }

  //hashing the password:
  const hashedPass = bcryptjs.hashSync(password, 10);

  //creating a new user:
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });

    res.json({
      success: true,
      message: `${newUser.username} successfully created`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  //if invalid input:
  if (!email || !password || email === "" || password === "") {
    return res
      .status(400)
      .json({ success: false, message: "All Fields Are Required" });
  }

  try {
    //finding the user:
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });
    }

    //checking the password:
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    //creating a jwt token:
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    res.cookie("jwt_token", token, { httpOnly: true, secure: true });
    res.status(200).json({
      success: true,
      message: "Login Success",
      user: {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        image: validUser.image,
        isAdmin: validUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

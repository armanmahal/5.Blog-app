import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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
    });

    res.json({
      success: true,
      message: `${newUser.username} successfully created`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

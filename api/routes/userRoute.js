import express from "express";
import {
  test,
  updateImage,
  updatePassword,
} from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/updateImage/:userId", verifyUser, updateImage);
router.put("/updatePassword/:userId", verifyUser, updatePassword);

export default router;

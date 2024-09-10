import express from "express";
import { create, deletePost, getPosts } from "../controllers/blogPostController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.post("/getPosts", verifyUser, getPosts);
router.delete("/deletePost", verifyUser, deletePost)

export default router;

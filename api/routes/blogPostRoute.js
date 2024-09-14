import express from "express";
import { create, deletePost, getPost, getPosts, searchPosts } from "../controllers/blogPostController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.post("/getPost", getPost);
router.post("/getPosts", verifyUser, getPosts);
router.get("/searchPosts", searchPosts); 
router.delete("/deletePost", verifyUser, deletePost)

export default router;

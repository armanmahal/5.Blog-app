import express from "express";
import { create, getPosts } from "../controllers/blogPostController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", verifyUser, getPosts);

export default router;

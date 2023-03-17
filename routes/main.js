import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/auth.js";
import { login } from "../controllers/auth.js";
import {
  followUser,
  getUserDetail,
  unfollowUser,
} from "../controllers/user.js";
import {
  addComment,
  createPost,
  deletePost,
  getAllPost,
  getPost,
  likePost,
  unlikePost,
} from "../controllers/post.js";

//GET routes
router.get("/user", verifyToken, getUserDetail);
router.get("/post/:id", verifyToken, getPost);
router.get("/all_post", verifyToken, getAllPost);

//POST routes
router.post("/authenticate", login);
router.post("/follow/:id", verifyToken, followUser);
router.post("/unfollow/:id", verifyToken, unfollowUser);
router.post("/post", verifyToken, createPost);
router.post("/like/:id", verifyToken, likePost);
router.post("/unlike/:id", verifyToken, unlikePost);
router.post("/comment/:id", verifyToken, addComment);

//DELETE route
router.delete("/post/:id", verifyToken, deletePost);

export default router;

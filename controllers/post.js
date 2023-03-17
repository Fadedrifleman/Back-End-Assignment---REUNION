import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js"

export const createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    ownerId: req.user.id,
  });
  const currentUser = await User.findById(req.user.id);
  try {
    const newPost = await post.save();
    currentUser.post.push(newPost.id);
    await currentUser.save();
    res.status(201).json({
      postId: newPost._id,
      title: newPost.title,
      description: newPost.description,
      createdTime: newPost.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {};

export const likePost = async (req, res) => {};

export const unlikePost = async (req, res) => {};

export const addComment = async (req, res) => {};

export const getPost = async (req, res) => {};

export const getAllPost = async (req, res) => {};




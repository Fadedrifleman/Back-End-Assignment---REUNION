import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    ownerId: req.user.id,
  });
  try {
    const currentUser = await User.findById(req.user.id);
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

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const currentUserId = req.user.id;
  try {
    const currentUser = await User.findById(currentUserId);
    if (!currentUser.post.includes(postId)) {
      res.status(404).json({ error: "post not found" });
    }
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const currentUserId = req.user.id;
  try {
    const post = await Post.findById(postId);
    post.likes.push(currentUserId);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unlikePost = async (req, res) => {
  const postId = req.params.id;
  const currentUserId = req.user.id;
  try {
    const post = await Post.findById(postId);
    post.likes.pull(currentUserId);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  const postId = req.params.id;
  const currentUserId = req.user.id;
  const newComment = new Comment({
    comment: req.body.comment,
    userId: currentUserId,
  });
  try {
    const comment = await newComment.save();
    const post = await Post.findById(postId);
    post.comment.push(comment._id);
    await post.save();
    res.status(200).json({ commentId: comment._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate("comment");
    const likeCount = post.likes.length;
    res.status(200).json({
      _id: post._id,
      title: post.title,
      description: post.description,
      likes: likeCount,
      comment: post.comment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPost = async (req, res) => {
  const currentUserId = req.user.id;
  try {
    const posts = await Post.find({ ownerId: currentUserId })
      .sort({ createdAt: -1 })
      .populate("comment");
    const final = posts.map((post) => {
      return {
        _id: post._id,
        title: post.title,
        desc: post.description,
        created_at: post.createdAt,
        comment: post.comment,
        likes: post.likes.length,
      };
    });
    res.status(200).json({post: final});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

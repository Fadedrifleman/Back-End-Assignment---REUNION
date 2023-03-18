import User from "../models/User.js";

export const getUserDetail = async (req, res) => {
  const currentUserId = req.user.id;
  try {
    const currentUser = await User.findById(currentUserId);
    const user = {
      userName: currentUser.userName,
      followers: currentUser.followers.length,
      following: currentUser.following.length,
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followUser = async (req, res) => {
  const userIdToFollow = req.params.id;
  const currentUserId = req.user.id;
  try {
    const currentUser = await User.findById(currentUserId);
    const userToFollow = await User.findById(userIdToFollow);

    if (!currentUser.following.includes(userIdToFollow)) {
      currentUser.following.push(userIdToFollow);
      userToFollow.followers.push(currentUserId);

      await Promise.all([currentUser.save(), userToFollow.save()]);
    }
    res.status(200).json({ message: "follow sucessfull" });
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  const userIdToUnfollow = req.params.id;
  const currentUserId = req.user.id;
  try {
    const currentUser = await User.findById(currentUserId);
    const userToUnfollow = await User.findById(userIdToUnfollow);

    if (currentUser.following.includes(userIdToUnfollow)) {
      currentUser.following.pull(userIdToUnfollow);
      userToUnfollow.followers.pull(currentUserId);

      await Promise.all([currentUser.save(), userToUnfollow.save()]);
    }
    res.status(200).json({ message: "unfollow sucessfull" });
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};
